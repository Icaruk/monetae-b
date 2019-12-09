
const router = require ("express").Router();
const { addProduct, deleteProduct, editProduct, getAllProduct, getOwnerIdProduct, getIdProduct, getTitleProduct }  = require("../DB/db_product");
const hasValidToken = require("../MW/hasValidToken");
// const hasAdminLevel = require("../MW/hasAdminLevel");


router.post("/product/add", hasValidToken, addProduct);
router.post("/product/edit", hasValidToken, editProduct);
router.delete("/product/delete/:id", hasValidToken, deleteProduct);

router.get("/product/all", hasValidToken, getAllProduct);
router.get("/product/:ownerId", hasValidToken, getOwnerIdProduct);
router.get("/product/:productId", hasValidToken, getIdProduct);
router.get("/product/:productTitle", hasValidToken, getTitleProduct);


module.exports = router;