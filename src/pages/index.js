import React from 'react';
import { graphql, Link } from 'gatsby';

const IndexPage = ({
    data: {
        allMarkdownRemark: { edges },
    },
}) => {
    const posts = edges.map(edge => (
        <li>
            <Link to={edge.node.frontmatter.path}>
                {edge.node.frontmatter.title}
            </Link>
        </li>
    ));
    return (
        <div>
            <h1>Links</h1>
            <ul>{posts}</ul>
        </div>
    );
};

export const pageQuery = graphql`
    query {
        allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___title] }) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 250)
                    frontmatter {
                        path
                        title
                    }
                }
            }
        }
    }
`;

export default IndexPage;
