/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // Add slug and sortable title for shanties
  if (node.internal.type === `MarkdownRemark`) {
    const filename = createFilePath({ node, getNode, basePath: `shanties`, trailingSlash: false })
    createNodeField({ node, name: "slug", value: filename.slice(1) });

    // Create an array of title names for this shanty, just for convenience
    const { title, aka = [] } = node.frontmatter;
    createNodeField({ node, name: "all_titles", value: Array.prototype.concat(title, aka) });
  }
}

// Create a page for each shanty
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/shantyTemplate.js`)
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for shanty pages.`)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: "shanties/" + node.fields.slug,
      component: blogPostTemplate,
      context: { slug: node.fields.slug }, // additional data can be passed via context
    })
  })
}