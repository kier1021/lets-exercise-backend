var Category = require("../models/Category");

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
        const category = await Category.findOne({ _id: id });
        return category
    } catch (err) {
        console.error("CategoryRepository.getCategoryByID err:", err)
        throw err
    }
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryByID
}