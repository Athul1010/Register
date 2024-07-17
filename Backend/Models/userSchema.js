const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/basic')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // email unique aayathkond aan ee "unique" enna key use cheythath
    },
    password: { 
        type: String,
        required: true
    }
    

});

//models defining

const peoples = new mongoose.model("peoples",userSchema); // "users" is collection name 2um same peru thanne kodukkanam
                                                      // userSchema mukalil ulla userSchema aan  

//models defining

module.exports = peoples;