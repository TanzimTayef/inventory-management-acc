const {
  getSupplierByIdService,
  createSupplierService,
  updateSupplierService,
  getSuppliersService,
} = require("../services/supplier.services");

exports.createSupplier = async (req, res, next) => {
  try {

    const result = await createSupplierService(req.body);

    res.status(200).json({
      status: "success",
      message: "Supplier created successful.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create supplier!",
      error: error.message,
    });
  }
};

exports.getSuppliers = async (req, res, next) => {
  try {
    const {id} = req.params;
    const suppliers = await getSuppliersService(id);
    
    if(!suppliers){
        return res.status(400).json({
            status: "fail",
            message: "Couldn't find suppliers"
        })
    }

    res.status(200).json({
      status: "success",
      message: "Suppliers got successful.",
      data: suppliers,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get suppliers!",
      error: error.message,
    });
  }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const supplier = await getSupplierByIdService(id);
    
    if(!supplier){
        return res.status(400).json({
            status: "fail",
            message: "Couldn't find supplier with this id"
        })
    }

    res.status(200).json({
      status: "success",
      message: "Supplier got successful.",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get supplier!",
      error: error.message,
    });
  }
};

exports.updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateSupplierService(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Supplier updated successful.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update supplier!",
      error: error.message,
    });
  }
};
