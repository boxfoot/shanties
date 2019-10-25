import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import EntryList from "../components/entry-list"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>All the shanties...</h1>
    <EntryList />
  </Layout>
)

export default IndexPage
