const categoryRepo = require('../repositories/CategoryRepository')

const createCategory = async (data) => {
    categoryRepo.createCategory({
        category_name: data.category_name
    })
}

const getCategories = async () => {
    let categories = await categoryRepo.getCategories();
    return categories;
}


module.exports = {
    createCategory,
    getCategories
}