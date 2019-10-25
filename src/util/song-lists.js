import { groupBy, sortBy } from "lodash";

const RE_PREFIX = /^(A |The )/;
const stripPrefix = (phrase) => phrase.replace(RE_PREFIX, "");

// given array of { all_titles, ...remaining }
// flattens all_titles into array of { ...remaining, title, sort_title }
export const flattenByTitles = (songs) => removeEmpties(songs)
    .filter(song => !!song.title).reduce((flattened, song) => {
        const { all_titles, ...remaining } = song;
        all_titles.forEach((title) => {
            flattened.push({
                ...remaining,
                title: title,
                sort_title: stripPrefix(title)
            });
        })

        // We'll typically want these sorted by sort titles afterwards
        return sortBy(flattened, "sort_title");
    },
        []
    );

export const groupByInitial = (songs) => groupBy(songs, s => s.sort_title.slice(0, 1));

//TODO: Fix this
// Not clear why - but current config is creating 2 notes for each song, one of which is empty
// for now - just strip them out.  (try this query in graphiql to see)
// query MyQuery {
//     allMarkdownRemark(filter: {fields: {slug: {eq: "white-squall"}}}) {
//       edges {
//         node {
//           frontmatter {
//             title
//           }
//           fields {
//             all_titles
//             slug
//           }
//         }
//       }
//     }
//   }
const removeEmpties = (songs) => songs.filter(s => !!s.title);