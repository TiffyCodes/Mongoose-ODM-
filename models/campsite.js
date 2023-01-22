//campsite schema models for all docs in db's campsites collection

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//with the above we an use the shorthand

const campsiteSchema = new Schema({
    //an obj that contains info
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//next we will create a model using this schema

const Campsite = mongoose.model('Campsite', campsiteSchema);
//remember Capitalized and Single version- mongoose will loook for lowercase plural version; second argument is the Schema you want to use for this collection

module.exports = Campsite;