const categoryService = require('../services/CategoryService')

const createCategory = async (req, res, next) => {
    try {
        const data = req.body;
        await categoryService.createCategory(data);

        res.json({ message: 'Category successfully created!' });
    } catch (err) {
        console.error(`Error while creating category`, err);
        next(err);
    }
}

const getCategories = async (req, res, next) => {
    try {
        data = await categoryService.getCategories();
        res.json({ data: data });
    } catch (err) {
        console.error(`Error while creating category`, err.message);
        next(err);
    }
}

module.exports = {
    createCategory,
    getCategories
}
