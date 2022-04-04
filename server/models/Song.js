const mongoose = require('mongoose')

const { Schema } = mongoose;


const songSchema = new Schema({
    title: {type: String, required: [true, "can't be blank"]},
    release:{type: String},
    duration: Number,
    content: String,
    genre: [String],
    artist_name: {type: String},
    image: String,
    nbrListens: Number,
    nbrLikes: Number    
});


module.exports = mongoose.model("Song", songSchema);