
const router = require ("express").Router();
const { addProduct, deleteProduct, editProduct }  = require("../DB/db_product");
const hasValidToken = require("../MW/hasValidToken");
// const hasAdminLevel = require("../MW/hasAdminLevel");


router.post("/product/add", hasValidToken, addProduct);
router.post("/product/edit", hasValidToken, editProduct);
// router.get("/user/logout", hasValidToken, logoutUser);

// router.get("/user/all", hasValidToken, getAllUsers);
// router.get("/user/:id", hasValidToken, getUser);

router.delete("/product/delete/:id", hasValidToken, deleteProduct);

module.exports = router;