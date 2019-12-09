
const router = require ("express").Router();
const { addProduct, deleteProduct, editProduct, getAllProduct, getProductId }  = require("../DB/db_product");
const hasValidToken = require("../MW/hasValidToken");
// const hasAdminLevel = require("../MW/hasAdminLevel");


router.post("/product/add", hasValidToken, addProduct);
router.post("/product/edit", hasValidToken, editProduct);
router.delete("/product/delete", hasValidToken, deleteProduct);

router.get("/product/all", hasValidToken, getAllProduct);
router.get("/product/get", hasValidToken, getProductId);


module.exports = router;