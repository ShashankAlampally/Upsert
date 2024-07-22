const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    imageUrl :{type: 'string', required: true},
    link : {type: 'string', required: true}
})

module.exports = mongoose.model("bannerSchema",bannerSchema)