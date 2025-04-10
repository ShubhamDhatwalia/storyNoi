import html2pdf from "html2pdf.js";

export const generatePDF = () => {
    const storyData = JSON.parse(localStorage.getItem("generatedStory"));

    if (!storyData || storyData.length === 0) {
        alert("No story content found!");
        return;
    }

    const contentDiv = document.createElement("div");
    contentDiv.style.padding = "20px";
    contentDiv.style.fontFamily = "Arial, sans-serif";
    contentDiv.style.fontSize = "10px";
    contentDiv.style.color = "#333";
    contentDiv.style.lineHeight = "1.5";
    contentDiv.style.display = "flex";
    contentDiv.style.flexDirection = "column";
    contentDiv.style.minHeight = "100vh";
    


    storyData.forEach((section) => {
        const sectionDiv = document.createElement("div");
        sectionDiv.style.marginBottom = "40px";
        sectionDiv.style.pageBreakInside = "avoid"; // Prevent breaking inside sections

        // Wrap image and text in a container
        const wrapper = document.createElement("div");
        wrapper.style.pageBreakInside = "avoid";
        wrapper.style.display = "inline-block"; // Prevent image from breaking

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
