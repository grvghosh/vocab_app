const axios = require('axios')
require('dotenv').config()
const app_id = process.env.oxfordAppId
const app_key = process.env.oxfordAppKey
oxfordBaseUrl = 'https://od-api-sandbox.oxforddictionaries.com/api/v2/'


async function getWordDetail(word) {
    const options = {
        method: 'GET',
        url: oxfordBaseUrl + 'entries/en-us/' + word ,
        headers: {
            'app_id': app_id,
            'app_key': app_key
        }
    };
    console.log("what is option here?", options)
    let wordObj = {}
    try {
        let { data } = await axios(options)
        wordObj.word = data.results[0].word
        wordObj.entries = [];
        data.results[0].lexicalEntries.forEach(lexicalEntry => {
            wordObj.entries.push({
                partOfSpeech: lexicalEntry.lexicalCategory.text,
                origin: lexicalEntry.entries[0].etymologies,
                definitions: lexicalEntry.entries[0].senses[0].definitions,
                examples: lexicalEntry.entries[0].senses[0].examples && lexicalEntry.entries[0].senses[0].examples.map(example => example.text)
            })

        })
        //console.log(wordObj)
        console.log("wordObj - ", wordObj)
        return wordObj
    } catch (error) {
        console.log("errro block")
        return false
    }
}

module.exports = getWordDetail;