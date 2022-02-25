import mongoose from 'mongoose';

const { Schema } = mongoose;


const songSchema = new Schema({
    title: {type: String, required: [true, "can't be blank"]},
    duration: int,
    content: String,
    genre: [String],
    artists: [Schema.Types.ObjectId],
    image: String,
    nbrListens: int,
    nbrLikes: int
        
});


  module.exports = mongoose.model("Song", songSchema);