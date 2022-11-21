var Category = require("../models/Category");
var mongoose = require('mongoose');

const createCategory = async (data) => {
    var category = Category(data);

    try {
        await category.save();
    } catch (err) {
        console.error("CategoryRepository.createCategory err:", err)
        throw err
    }
}

const getCategories = async () => {
    try {
        const categories = await Category.find();
        return categories
    } catch (err) {
        console.error("CategoryRepository.getCategories err:", err)
        throw err
    }
}

const getCategoryByID = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null
        }

        const category = await Category.findOne({ _id: id });
        return category
    } catch (err) {
        console.error("CategoryRepository.getCategoryByID err:", err)
        throw err
    }
}

const getCategoryByName = async (categoryName) => {
    try {
        const category = await Category.findOne({ category_name: categoryName });
        return category
    } catch (err) {
        console.error("CategoryRepository.getCategoryByName err:", err)
        throw err
    }
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryByID,
    getCategoryByName
}