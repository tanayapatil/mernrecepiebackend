const mongoose = require('mongoose')

const recipiesSchema = new mongoose.Schema({
    name: {
        type: String,

    },

    catagory: {
        type: String
    },
    description: {
        type: String
    }, 
    image: {
        type: String
    },
    youTube:{
        type:String
    }

})

module.exports = mongoose.model('recipies', recipiesSchema)