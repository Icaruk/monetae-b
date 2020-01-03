
const router = require ("express").Router();
const { addPurchase, getPurchase }  = require("../DB/db_purchase");
const hasValidToken = require("../MW/hasValidToken");
const hasAdminLevel = require("../MW/hasAdminLevel");


router.post("/purchase/add", hasValidToken, addPurchase);
router.get("/purchase/get",  getPurchase);


module.exports = router;


