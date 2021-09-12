import React from "react"

import Bio from "../components/bio"
import Layout from "../components/layout"

const Tags = ({ pageContext, data }) => {
  return (
    <Layout>
    
        <Bio />
     
      <h1>
        {pageContext.tag} ({data.allMarkdownRemark.totalCount}件)
      </h1>
      {data.allMarkdownRemark.edges.map(({ node }) => {
        return (
          <Post
            slug={node.fields.slug}
            title={node.frontmatter.title}
            date={node.frontmatter.date}
            tags={node.frontmatter.tags}
          />
        )
      })}
    </Layout>
  )
}

export default Tags
export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(truncate: true)
          fields {
            slug
          }
          frontmatter {
            title
            date
            tags
          }
        }
      }
    }
  }
  `