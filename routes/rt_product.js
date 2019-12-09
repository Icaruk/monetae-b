
const router = require ("express").Router();
const { addProduct, deleteProduct, editProduct, getAllProduct, getProductByOwner, getIdProduct, getProductByTitle }  = require("../DB/db_product");
const hasValidToken = require("../MW/hasValidToken");
// const hasAdminLevel = require("../MW/hasAdminLevel");


router.post("/product/add", hasValidToken, addProduct);
router.post("/product/edit", hasValidToken, editProduct);
router.delete("/product/delete", hasValidToken, deleteProduct);

router.get("/product/all", hasValidToken, getAllProduct);
router.get("/product/s", hasValidToken, getProductByTitle);
router.get("/product/get", hasValidToken, getIdProduct);
router.get("/product/getByOwner", hasValidToken, getProductByOwner);


module.exports = router;