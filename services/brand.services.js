const Brand = require("../model/Brand");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};

exports.getBrandService = async () => {
  const brands = await Brand.find({});
  return brands;
};
exports.getBrandByIdService = async (id) => {
  const brand = await Brand.findOne({_id: id});
  return brand;
};

exports.updateBrandByIdService = async (brandId, data) => {
    const brand = await Brand.findById(brandId);
    const result = brand.set(data).save();
  return result;
};

