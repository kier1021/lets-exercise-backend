const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category_name: { type: String, required: true },
}, {
    collection: 'category'
}
);

module.exports = mongoose.model("Category", CategorySchema);