const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const gitSchema = new Schema({
    userID: {type:String,required:true},
    gitURL: {type:String,required:true}
})

module.exports = mongoose.model('git',gitSchema,'userGit')