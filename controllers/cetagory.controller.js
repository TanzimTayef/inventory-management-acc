const { createCategoryServices, getCategoryService } = require("../services/category.services");


exports.getCategory = async (req, res) => {
    try{
    const category = await getCategoryService();
    res.status(200).json({
        status: "success",
        data: category
    });
    }catch(error){
        res.status(400).json({
            status: "fail",
            message: "Can't get the category.",
            error: error.message
        });
    }
}

exports.createCategroy = async (req, res, next) => {
    try {
      const result = await createCategoryServices(req.body);
      res.status(200).json({
        status: "success",
        message: "Category create successful"
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Couldn't crate category!",
        error: error.message,
      });
    }
  };


  
     
