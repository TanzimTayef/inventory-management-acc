const { getStoresService, createStoreServices, getStoreByIdService, updateStoreByIdService } = require("../services/stores.services");

exports.getStores = async (req, res) => {
    try{
    const stores = await getStoresService();
    res.status(200).json({
        status: "success",
        data: stores
    });
    }catch(error){
        res.status(400).json({
            status: "fail",
            message: "Can't get the stores.",
            error: error.message
        });
    }
}

exports.createStore = async (req, res, next) => {
    try {
      const result = await createStoreServices(req.body);
      res.status(200).json({
        status: "success",
        message: "Store create successful"
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Couldn't crate store!",
        error: error.message,
      });
    }
  };


  exports.getStoreById = async (req, res, next) => {
    try {
      const {id} = req.params;
  
      const store = await getStoreByIdService(id);
       
      if(!store){
        return  res.status(400).json({
              status: "fail",
              message: "Couldn't store found."
          })
      }
  
      res.status(200).json({
        status: "success",
        message: "Get store successful",
        data: store,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Couldn't get store!",
        error: error.message,
      });
    }
  };


  exports.updateStoreById = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await updateStoreByIdService(id, req.body);
       
      if(!result.modifiedCount){
        return  res.status(400).json({
              status: "fail",
              message: "Couldn't update the store with this id."
          })
      }
  
      res.status(200).json({
        status: "success",
        message: "Get store successful",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Couldn't get store!",
        error: error.message,
      });
    }
  };
  