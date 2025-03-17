import html2pdf from "html2pdf.js";

export const WithWatermark = () => {
    const storyData = JSON.parse(localStorage.getItem("generatedStory"));

    if (!storyData || storyData.length === 0) {
        alert("No story content found!");
        return;
    }

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

    // Function to add watermark as repeated text
    const addWatermark = () => {
        const watermarkDiv = document.createElement("div");
        watermarkDiv.style.position = "absolute";
        watermarkDiv.style.top = "0";
        watermarkDiv.style.left = "0";
        watermarkDiv.style.width = "100%";
        watermarkDiv.style.height = "100%";
        watermarkDiv.style.pointerEvents = "none"; // Ensure it's not interactive
        watermarkDiv.style.zIndex = "-1"; // Send behind content
        watermarkDiv.style.display = "grid";
        watermarkDiv.style.gridTemplateRows = "repeat(8, 1fr)";
        watermarkDiv.style.gridTemplateColumns = "repeat(3, 1fr)";
        watermarkDiv.style.opacity = "0.15"; // Adjust transparency

        for (let i = 0; i < 15; i++) {
            const watermarkText = document.createElement("div");
            watermarkText.innerHTML = "Confidential"; // Change to your watermark text
            watermarkText.style.fontSize = "32px";
            watermarkText.style.color = "black";
            watermarkText.style.transform = "rotate(-30deg)";
            watermarkText.style.whiteSpace = "nowrap";
            watermarkText.style.textAlign = "center";
            watermarkText.style.margin = "auto";

            watermarkDiv.appendChild(watermarkText);
        }

        contentDiv.appendChild(watermarkDiv);
    };

    // Add watermark
    addWatermark();

    // Generate story content dynamically
    storyData.forEach((section) => {
        const sectionDiv = document.createElement("div");
        sectionDiv.style.marginBottom = "40px";
        sectionDiv.style.pageBreakInside = "avoid"; // Prevent breaking inside sections

        const wrapper = document.createElement("div");
        wrapper.style.pageBreakInside = "avoid";
        wrapper.style.display = "inline-block"; // Prevent image breaking

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

    // Convert HTML to PDF
    html2pdf()
        .set({
            margin: 10,
            filename: "Generated_Story.pdf",
            image: { type: "jpeg", quality: 1.0 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(contentDiv)
        .save()
        .then(() => {
            document.body.removeChild(contentDiv);
        });
};
