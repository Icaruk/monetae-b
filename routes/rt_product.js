
const router = require ("express").Router();
const { addProduct, deleteProduct, editProduct, getAllProduct, getProduct, 
getBestSellingProduct, getBestVotedProduct, getProductCategory }  = require("../DB/db_product");
const hasValidToken = require("../MW/hasValidToken");
// const hasAdminLevel = require("../MW/hasAdminLevel");


router.post("/product/add", hasValidToken, addProduct);
router.post("/product/edit", hasValidToken, editProduct);
router.delete("/product/delete", hasValidToken, deleteProduct);

router.get("/product/all", getAllProduct);
router.get("/product/best", getBestSellingProduct);
router.get("/product/voted", getBestVotedProduct);
router.get("/product/category", getProductCategory);
router.get("/product/get", getProduct);


module.exports = router;