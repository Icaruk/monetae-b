
const router = require ("express").Router();
const { addProduct, deleteProduct }  = require("../DB/db_user");
const hasValidToken = require("../MW/hasValidToken");
// const hasAdminLevel = require("../MW/hasAdminLevel");


router.post("/user/register", hasValidToken, addProduct);
// router.post("/user/login", loginUser);
// router.get("/user/logout", hasValidToken, logoutUser);

// router.get("/user/all", hasValidToken, getAllUsers);
// router.get("/user/:id", hasValidToken, getUser);

router.delete("/product/delete/:id", hasValidToken, deleteProduct);

module.exports = router;