import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

//db
import db from './_db.js'

//types
import {typeDefs} from './schema.js'

const resolvers = {
    Query: {
        games(){
            return db.games
        },
        reviews(){
            return db.reviews
        },
        authors(){
            return db.authors
        },
        game(_, args){
            return db.games.find((game) => game.id === args.id)
        },
        review(_, args){
            return db.reviews.find((review) => review.id === args.id)
        },
        author(_, args){
            return db.authors.find((author) => author.id === args.id)
        }
    },
    Game: {
        reviews(parent){
            return db.reviews.filter((review) => review.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent){
            return db.reviews.filter((review) => review.author_id === parent.id)
        }
    },
    Review: {
        author(parent){
            return db.authors.find((author) => author.id === parent.author_id)
        },
        game(parent){
            return db.games.find((game) => game.id === parent.game_id)
        }
    },
    Mutation: {
        deleteGame(_, args){
            db.games = db.games.filter((game) => game.id !== args.id)

            return db.games;
        },

        addGame(_, args){
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()
            }

            db.games.push(game)

            return game
        }
    }
}

/*
    games {
        title
    }

*/

// server setup
const server = new ApolloServer({
    // typeDefs - definitions of types of data
    typeDefs,

    // resolvers - functions for how to respond to query
    resolvers
})

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
})

console.log(`Server ready at port `, 4000)