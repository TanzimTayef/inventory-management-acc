const Product = require("../model/Products");
const {
  getProductService,
  createPorductServices,
  updateProdcutByIdService,
  bulkUpdateProductServices,
  deleteProductByIdService,
  bulkDeleteProductSerivces,
} = require("../services/product.services");

exports.getProdcut = async (req, res, next) => {
  try {
    let filters = { ...req.query };

    // page, limit, sort -> exclude:
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => {
      delete filters[field];
    });

    // gt, lt, gte, lte:
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersString);


    // sorting
    const queries = {};
    
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    // show product detalis:
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    // limit product:
    if (req.query.limit) {
      const limit = req.query.limit.split(",").join(" ");
      queries.limit = limit;
    }

    // pagination:
    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const products = await getProductService(filters, queries);

    res.status(200).json({
      status: "success",
      message: "Data got successfully",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "falied",
      message: "can't get data",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    // create
    const result = await createPorductServices(req.body);

    result.logger();

    //   save
    // const product = new Product(req.body);
    // const result = await product.save();

    

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fali",
      message: "Data not inserted",
      error: error.message,
    });
  }
};

// one porduct update:
exports.upadatePorductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProdcutByIdService(id, req.body);

    res.status(200).json({
      status: "success",
      message: "product updated successful",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't upadated produt.",
      error: error.message,
    });
  }
};

// bulk-update multiple product update:
exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductServices(req.body);
    res.status(200).json({
      status: "success",
      message: "bulk update successful.",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "sorry! bulk update unsuccessful",
      error: error.message,
    });
  }
};

// Delete product By Id:
exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);

    if (!result.deletedCount) {
      res.status(400).json({
        status: "fail",
        error: "Couldn't delete product",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Product delete successful",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "sorry! did't deleted porduct",
      error: error.message,
    });
  }
};

// Bulk_delete product:
exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = bulkDeleteProductSerivces(req.body.ids);

    res.status(200).json({
      status: "success",
      message: "Bulk delete successful",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry! Bulk Delete unsuccessful",
      messsage: error.message,
    });
  }
};


// file upload": 
exports.fileUpload = async (req, res) => {
  try{

    res.status(200).json(req.files)
  }catch(error){
    res.status(400).json({
      status: "fail",
      message: "couldn't file upload!",
      error: error.message
    })
  }
}

