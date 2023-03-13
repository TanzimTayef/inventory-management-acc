const Supplier = require("../model/Supplier");
const Brand = require("../model/Brand");

exports.createSupplierService = async (data) => {
  const supplier = await Supplier.create(data);

  const { _id: supplierId, brand } = supplier;
  const result = await Brand.updateOne(
    { _id: brand.id },
    { $push: { suppliers: supplierId } }
  );

  return supplier;
};

exports.getSuppliersService = async () => {
  const suppliers = await Supplier.find({});
  return suppliers;
};

exports.getSupplierByIdService = async (id) => {
  const supplier = await Supplier.findOne({ _id: id });
  return supplier;
};

exports.updateSupplierService = async (supplierId, data) => {
  const supplier = await Supplier.updateOne(
    { _id: supplierId },
    { $set: data },
    {
      runValidators: true,
    }
  );
  return supplier;
};
