const Product = require("../model/Products");
const Brand = require("../model/Brand");

exports.getProductService = async (filters, queries) => {
  const prodcuts = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const total = await Product.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, page, prodcuts };
};

exports.createPorductServices = async (data) => {
  const product = await Product.create(data);
 
  // id -> brand -> update the brand:
  const {_id:productId, brand} = product;

 const result = await Brand.updateOne(
    {_id:brand.id},
    {$push: {products: productId}}
  )

  console.log(result.nModified);


  return product;
};

// one product udate:
exports.updateProdcutByIdService = async (productId, data) => {
  //  updata product method: 1
  // const product = await  Product.updateOne({_id: productId}, {$set: data}, {
  //   runValidators: true
  // })

  // update product method: 2
  const product = await Product.findById(productId);
  const result = await product.set(data).save();

  return result;
};

// bulk-update product:
exports.bulkUpdateProductServices = async (data) => {
  // if we want update same data for all product. for expample same prize same name for all:
  // const result = await Product.updateMany({_id: data.ids}, data.data, {
  //   runValidators: true
  // });

  const prodcuts = [];
  data.ids.forEach((product) => {
    prodcuts.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(prodcuts);
  console.log(result);

  return result;
};

// delete product by id:
exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

// Bulk delete Product:
exports.bulkDeleteProductSerivces = async (ids) => {
  // const result = await Product.deleteMany({_id: ids});
  const result = await Product.deleteMany({});
  return result;
};
