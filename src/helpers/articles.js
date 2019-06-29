const getSeries = (post, siteMetadata) => {
    return siteMetadata.series_list
        && siteMetadata.series_list.filter(elm =>
        post.frontmatter.series.includes(elm.name)
    );
};

export {
    getSeries
};
