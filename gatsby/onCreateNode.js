module.exports = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const { relativePath } = getNode(node.parent);
        const SLUG_REGEX_PROCESSOR = /([0-9]+)\-([0-9]+)\-([0-9]+)\-(.+)\.md$/;
        const processedSlugParts = SLUG_REGEX_PROCESSOR.exec(relativePath);

        const year = processedSlugParts[1];
        const month = processedSlugParts[2];
        const day = processedSlugParts[3];
        const filename = processedSlugParts[4];

        const slug = `/articles/${year}/${month}/${day}/${filename}`;

        createNodeField({
            node,
            name: `slug`,
            value: slug
        });
    }
};
