
const router = require ("express").Router();
const { addPurchase }  = require("../DB/db_user");
const hasValidToken = require("../MW/hasValidToken");
const hasAdminLevel = require("../MW/hasAdminLevel");


router.post("/purchase/add", hasValidToken, addPurchase);
router.get("/purchase/get", hasValidToken, getPurchase);


module.exports = router;


