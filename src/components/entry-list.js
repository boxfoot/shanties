import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import { flattenByTitles, groupByInitial } from "../util/song-lists"

import "./entry-list.css";

const makeSongInfos = (nodes) => nodes.map((node) => ({
    title: node.frontmatter.title,
    slug: node.fields.slug,
    all_titles: node.fields.all_titles,
}));

const songListQuery = graphql`
query {
    allMarkdownRemark {
        nodes {
            frontmatter {
                title
                tags
            }
            fields {
                slug,
                all_titles
            }
        }
    }
}
`

const EntryList = () => {
    const data = useStaticQuery(songListQuery);
    const songs = makeSongInfos(data.allMarkdownRemark.nodes);
    const byLetter = groupByInitial(flattenByTitles(songs));

    return (
        <div className="all-posts">
            {Object.entries(byLetter).map(([letter, items]) => (
                <div className="letter" key={letter}>
                    <h3>{letter}</h3>
                    <ul className="posts">
                        {items.map(song => (
                            <li key={song.sort_title}><Link to={"/shanties/" + song.slug}>{song.title}</Link></li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default EntryList