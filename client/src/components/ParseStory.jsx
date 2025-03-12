export const ParseStory = (storyText) => {
    if (!storyText) return [];

    const lines = storyText.split(/\n+/); // Split by new lines
    const sections = [];
    let currentSection = null;

    lines.forEach((line) => {
        if (line.match(/^<h[1-6]>.*<\/h[1-6]>$/)) {
            // If the line is a heading, start a new section
            if (currentSection) sections.push(currentSection);
            currentSection = { heading: line, content: [] };
        } else if (currentSection) {
            // If it's content, add it to the current section
            currentSection.content.push(line);
        }
    });

    if (currentSection) sections.push(currentSection); // Push last section

    return sections;
};
