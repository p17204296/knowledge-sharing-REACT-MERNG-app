const { model, Schema } = require('mongoose')

const categorySchema = new Schema({
    catID: String,
    category: String,
    description: String,
});

module.exports = model('Category', categorySchema);



