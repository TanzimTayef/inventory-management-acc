const Category = require("../model/Category");

exports.createCategoryServices = async (data) => {
    const category = await Category.create(data);
    return category;
  };

exports.getCategoryService = async () => {
   const category = await Category.find({});
   return category;
};
