import html2pdf from "html2pdf.js";

import watermarkImage from "../assets/waterMark.png";

export const WithWatermark = async () => {
    const storyData = JSON.parse(localStorage.getItem("generatedStory"));

    if (!storyData || storyData.length === 0) {
        alert("No story content found!");
        return;
    }

    // Convert image to Base64
    const convertImageToBase64 = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous"; // Avoid CORS issues
            img.onload = function () {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL("image/png"));
            };
            img.onerror = function (error) {
                console.error("Error loading watermark image", error);
                reject(new Error("Failed to load watermark image: " + url));
            };
            img.src = url;
        });
    };

    // Convert imported image URL to Base64
    const watermarkBase64 = await convertImageToBase64(watermarkImage);

    // Create the container for the content
    const contentDiv = document.createElement("div");
    contentDiv.style.position = "relative";
    contentDiv.style.padding = "20px";
    contentDiv.style.fontFamily = "Arial, sans-serif";
    contentDiv.style.fontSize = "12px";
    contentDiv.style.color = "#333";
    contentDiv.style.lineHeight = "1.5";
    contentDiv.style.display = "flex";
    contentDiv.style.flexDirection = "column";
    contentDiv.style.minHeight = "100vh";

    // Generate story content dynamically
    storyData.forEach((section) => {
        const sectionDiv = document.createElement("div");
        sectionDiv.style.marginBottom = "40px";
        sectionDiv.style.pageBreakInside = "avoid";

        const wrapper = document.createElement("div");
        wrapper.style.pageBreakInside = "avoid";
        wrapper.style.display = "inline-block";

        if (section.imageURL) {
            const img = document.createElement("img");
            img.src = section.imageURL;
            img.style.width = "100%";
            img.style.margin = "20px 0";
            img.style.pageBreakInside = "avoid";
            wrapper.appendChild(img);
        }

        const heading = document.createElement("h2");
        heading.innerHTML = section.heading.replace(/<\/?h2[^>]*>/g, "");
        heading.style.color = "#222";
        heading.style.marginBottom = "15px";
        heading.style.fontSize = "28px";

        wrapper.appendChild(heading);

        section.content.forEach((para) => {
            const p = document.createElement("p");
            p.innerHTML = para.replace(/<\/?p>/g, "");
            p.style.marginBottom = "10px";
            p.style.textAlign = "justify";

            wrapper.appendChild(p);
        });

        sectionDiv.appendChild(wrapper);
        contentDiv.appendChild(sectionDiv);
    });

    document.body.appendChild(contentDiv);

    // Convert HTML to PDF and add watermark image
    html2pdf()
        .set({
            margin: 10,
            filename: "Generated_Story.pdf",
            image: { type: "jpeg", quality: 1.0 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(contentDiv)
        .toPdf()
        .get("pdf")
        .then((pdf) => {
            const totalPages = pdf.internal.getNumberOfPages();
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const watermarkWidth = 50; // Adjust size as needed
            const watermarkHeight = 50;
            const watermarkSpacing = 80; // Spacing between watermarks

            // Apply watermark to each page
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);

                // Set watermark opacity
                pdf.setGState(new pdf.GState({ opacity: 0.2 })); // Adjust opacity (0.1 - 1.0)

                // Tile the watermark
                for (let y = 0; y < pageHeight; y += watermarkSpacing) {
                    for (let x = 0; x < pageWidth; x += watermarkSpacing) {
                        pdf.addImage(
                            watermarkBase64,
                            "PNG",
                            x,
                            y,
                            watermarkWidth,
                            watermarkHeight
                        );
                    }
                }

                // Reset opacity back to normal for text content
                // pdf.setGState(new pdf.GState({ opacity: 0.2 }));
            }

            pdf.save("Generated_Story.pdf");
        })
        .then(() => {
            document.body.removeChild(contentDiv);
        });
};
