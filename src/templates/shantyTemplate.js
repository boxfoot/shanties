import React from "react"
import { graphql } from "gatsby"
import { get } from "lodash";

import Layout from "../components/layout"
import SEO from "../components/seo"


const makeDataUseful = ({ markdownRemark: md }) => ({
  title: md.frontmatter.title,
  html: md.html,
  aka: md.frontmatter.aka,
  source_html: get(md, 'fields.frontmattermd.source.html', ""),
});

export default function Template({
  data, ...props
}) {
  const { title, source_html, html, aka } = makeDataUseful(data);

  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      <div className="blog-post-container">
        <div className="blog-post">
          {aka && (
            <p>
              <i>Also known as</i>
              {' '}
              {aka.join(', ')}
            </p>
          )}
          {source_html && (
            <p><i>Source:</i> <span dangerouslySetInnerHTML={{ __html: source_html }} /></p>
          )}
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>

  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        aka
      }
      fields {
          frontmattermd {
            source {
                html
            }
        }
      }
    }
  }
`