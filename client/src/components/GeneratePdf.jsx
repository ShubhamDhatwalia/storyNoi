import html2pdf from "html2pdf.js";

export const generatePDF = () => {
    const storyData = JSON.parse(localStorage.getItem("generatedStory"));

    if (!storyData || storyData.length === 0) {
        alert("No story content found!");
        return;
    }

    // Create a container div for PDF content
    const contentDiv = document.createElement("div");
    contentDiv.style.padding = "20px 20px 40px 20px"; // Adds bottom padding
    contentDiv.style.margin = "10px 0"; // Adds margin to prevent content from sticking to edges
    contentDiv.style.fontFamily = "Arial, sans-serif";
    contentDiv.style.fontSize = "9px"; // Slightly smaller for better PDF fitting
    contentDiv.style.color = "#333";
    contentDiv.style.lineHeight = "1.4"; // Better readability
    contentDiv.style.pageBreakInside = "avoid"; // Prevents breaking content inside a section

    storyData.forEach((section) => {
        const sectionDiv = document.createElement("div");
        sectionDiv.style.marginBottom = "30px";
        sectionDiv.style.pageBreakInside = "avoid"; // Ensures sections stay together
        sectionDiv.style.breakInside = "avoid"; // Prevents breaking inside section

        const heading = document.createElement("h2");
        heading.innerHTML = section.heading.replace(/<\/?h2>/g, "");
        heading.style.color = "#333";
        heading.style.marginBottom = "15px";
        heading.style.pageBreakBefore = "auto"; // Prevents unnecessary page breaks before headings
        sectionDiv.appendChild(heading);

        section.content.forEach((para) => {
            const p = document.createElement("p");
            p.innerHTML = para.replace(/<\/?p>/g, "");
            p.style.marginBottom = "5px"; // Less space between paragraphs
            sectionDiv.appendChild(p);
        });

        if (section.imageURL) {
            const img = document.createElement("img");
            img.src = section.imageURL;
            img.style.width = "100%";
            img.style.marginBottom = "20px";
            img.style.display = "block"; // Ensures proper positioning
            img.style.pageBreakBefore = "auto"; // Avoids forced page breaks before images
            img.style.pageBreakInside = "avoid"; // Ensures images are not split across pages
            sectionDiv.appendChild(img);
        }

        contentDiv.appendChild(sectionDiv);
    });

    document.body.appendChild(contentDiv);

    // ✅ Generate PDF with proper formatting
    html2pdf()
        .set({
            margin: [15, 10, 15, 10], // Adds extra top and bottom margin
            filename: "Generated_Story.pdf",
            image: { type: "jpeg", quality: 1.0 }, // Better image quality
            html2canvas: { scale: 3, useCORS: true }, // Increases sharpness
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(contentDiv)
        .save()
        .then(() => {
            document.body.removeChild(contentDiv); // Cleanup after saving
        });
};
