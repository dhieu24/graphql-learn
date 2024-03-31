export const typeDefs = `#graphql
    type Game{
        id: ID!
        title: String!
        platform: [String!]!
    }

    type Review{
        id: ID!
        rating: Int!
        content: String!
    }

    type Author{
        id: ID!
        name: String!
        verified: Boolean!
    }

    type Query{
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }
`

// 5 types: Int Float String Boolean ID
// !: required, otherwise it is allowed to be null
// type Query is not optional