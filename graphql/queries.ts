import {gql} from "@apollo/client";

export const GET_ALL_POSTS = gql`
    query MyQuery {
        getPostList {
            id
            body
            created_at
            image
            subreddit_id
            title
            username
            comments {
                created_at
                id
                post_id
                username
                text
            }
            subreddit {
                created_at
                id
                topic
            }
            votes {
                created_at
                id
                post_id
                upvote
                username
            }
        }
    }
`

export const GET_ALL_POSTS_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getPostListByTopic(topic: $topic) {
            id
            created_at
            body
            comments {
                created_at
                id
                post_id
                username
                text
            }
            image
            subreddit_id
            title
            username
            subreddit {
                created_at
                id
                topic
            }
            votes {
                created_at
                id
                post_id
                upvote
                username
            }
        }
    }
`

export const GET_SUBREDDIT_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getSubredditListByTopic(topic: $topic) {
            id
            topic
            created_at
        }
    }
`