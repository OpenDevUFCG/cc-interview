const path = require('path');
exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;
    const template = path.resolve('src/components/SitePageTemplate.js');
    const result = await graphql(`
        {
            allMarkdownRemark(limit: 1000) {
                edges {
                    node {
                        frontmatter {
                            path
                            title
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild('Error while running GraphQL query.');
        return;
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.path,
            component: template,
            context: {},
        });
    });
};
