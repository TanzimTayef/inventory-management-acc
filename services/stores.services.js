const Store = require("../model/Store");

exports.createStoreServices = async (data) => {
    const store = await Store.create(data);
    return store;
  };

exports.getStoresService = async () => {
   const stores = await Store.find({});
   return stores;
};

exports.getStoreByIdService = async (id) => {
    const store = await Store.findOne({_id: id});
    return store;
  };


exports.updateStoreByIdService = async (storeId, data) => {
    const store = await Store.findById(storeId);
    const result = store.set(data).save();
  return result;
};