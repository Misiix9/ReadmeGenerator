export const generateMarkdown = (sections) => {
    if (!sections || sections.length === 0) return '';

    return sections
        .map((section) => {
            const { type, content } = section;

            switch (type) {
                case 'header':
                    return `# ${content.title || 'Untitled'}\n\n${content.description || ''}\n`;

                case 'text':
                    return `${content.text || ''}\n`;

                case 'image':
                    if (!content.url) return '';
                    return `![${content.alt || 'Image'}](${content.url})\n`;

                case 'code':
                    if (!content.code) return '';
                    return `\`\`\`${content.language || ''}\n${content.code}\n\`\`\`\n`;

                case 'badge':
                    if (!content.url) return '';
                    return `![${content.label || 'Badge'}](${content.url})\n`;

                case 'table':
                    if (!content.rows || content.rows.length === 0) return '';
                    const [header, ...rows] = content.rows;
                    const headerRow = `| ${header.join(' | ')} |`;
                    const separatorRow = `| ${header.map(() => '---').join(' | ')} |`;
                    const bodyRows = rows.map((row) => `| ${row.join(' | ')} |`).join('\n');
                    return `${headerRow}\n${separatorRow}\n${bodyRows}\n`;

                default:
                    return '';
            }
        })
        .join('\n');
};
