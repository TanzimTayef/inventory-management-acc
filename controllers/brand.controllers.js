const { createBrandService, getBrandService, updateBrandByIdService } = require("../services/brand.services");

exports.createBrand = async (req, res, next) => {
  try {
    
    const result = await createBrandService(req.body);

    res.status(200).json({
      status: "success",
      message: "Brand create successful"
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't crate brand!",
      error: error.message,
    });
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandService();
    res.status(200).json({
      status: "success",
      message: "Get brand successful",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get brand sorry!",
      error: error.message,
    });
  }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const {id} = req.params;

    const brand = await getBrandByIdService(id);
     
    if(!brand){
      return  res.status(400).json({
            status: "fail",
            message: "Couldn't brand found."
        })
    }

    res.status(200).json({
      status: "success",
      message: "Get brand successful",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get brand!",
      error: error.message,
    });
  }
};

exports.updateBrandById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await updateBrandByIdService(id, req.body);
     
    if(!result.modifiedCount){
      return  res.status(400).json({
            status: "fail",
            message: "Couldn't update the brand with this id."
        })
    }

    res.status(200).json({
      status: "success",
      message: "Get brand successful",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get brand!",
      error: error.message,
    });
  }
};
