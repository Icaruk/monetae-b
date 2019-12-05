
const router = require ("express").Router();
const { getAllRatings, addRating, getRatingsByRated, getFeedback }  = require("../DB/db_rating");


router.get("/rating/all", getAllRatings);
router.post("/rating/add", addRating);
router.post("/rating/rated", getRatingsByRated);
router.get("/rating/feedback", getFeedback);
// router.delete("/user/delete/:id", hasValidToken, (req, res, next)=> {hasAdminLevel (4, req, res, next)}, deleteUser);


module.exports = router;


