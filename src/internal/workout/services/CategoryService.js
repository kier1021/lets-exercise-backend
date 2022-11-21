const categoryRepo = require('../repositories/CategoryRepository')
let Validator = require('validatorjs');

const createCategory = async (data) => {
    let rules = {
        category_name: 'required|max:50',
    };

    let validation = new Validator(data, rules);
    if (validation.fails() === true) {
        throw { message: { validation_error: validation.errors.all() }, status_code: 400 }
    }

    // Find category by name
    category = await categoryRepo.getCategoryByName(data.category_name);
    if (category !== null && category !== undefined) {
        throw { message: { error: "The category name already exists" }, status_code: 400 }
    }

    // Save the category
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