const graphql = require('graphql')
const Word = require('../models/Word')
const getWordDetail = require('../utils/helper')

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
} = graphql

const WordType = new GraphQLObjectType({
    name: 'Word',
    fields: () => ({
        id: { type: GraphQLID },
        word: { type: GraphQLString },
        entries: {
            type: new GraphQLList(new GraphQLObjectType({
                name: 'Entry',
                fields: () => ({
                    partOfSpeech: { type: GraphQLString },
                    origin: { type: new GraphQLList(GraphQLString) },
                    definitions: { type: new GraphQLList(GraphQLString) },
                    examples: { type: new GraphQLList(GraphQLString) }
                })
            }))
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        word: {
            type: WordType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Word.findById(args.id)
            }
        },
        words: {
            type: new GraphQLList(WordType),
            resolve(parent, args) {
                return Word.find()
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addWord: {
            type: WordType,
            args: {
                word: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                const word = await getWordDetail(args.word)
                console.log("what is the problem here>-=-=-=", word)
                if (!word) return null
                const newWord = new Word({
                    word: word.word,
                    entries: word.entries
                })
                const result = await newWord.save()
                console.log("it it reaching result? ", result)
                return result
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})