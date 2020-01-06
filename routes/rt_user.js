
const router = require ("express").Router();
const { registerUser, loginUser, logoutUser, getAllUsers, getUser, deleteUser, userPassReset1, userPassReset2 }  = require("../DB/db_user");
const hasValidToken = require("../MW/hasValidToken");
const hasAdminLevel = require("../MW/hasAdminLevel");


router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", hasValidToken, logoutUser);
router.post("/user/forgotPassword1", userPassReset1);
router.post("/user/forgotPassword2", userPassReset2);


router.get("/user/all", hasValidToken, getAllUsers);
router.get("/user/:id", hasValidToken, getUser);

router.delete("/user/delete/:id", hasValidToken, (req, res, next)=> {hasAdminLevel (4, req, res, next)}, deleteUser);

module.exports = router;


