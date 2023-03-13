const express = require("express");
const productController = require("../controllers/prodcut.controller");
const router = express.Router();

const uploader = require("../middleware/uploader");
const varifyToken = require("../middleware/varifyToken");
const authorization = require("../middleware/authorization");


router.post("/file_upload",uploader.array("image"), productController.fileUpload)

router.route("/bulk_update").patch(productController.bulkUpdateProduct);
router.route("/bulk_delete").delete(productController.bulkDeleteProduct);

router
  .route("/")
  .get(productController.getProdcut)
  .post(varifyToken, authorization("admin", "store-manager") , productController.createProduct);

router
  .route("/:id")
  .patch(productController.upadatePorductById)
  .delete(authorization("admin") , productController.deleteProductById);

module.exports = router;




