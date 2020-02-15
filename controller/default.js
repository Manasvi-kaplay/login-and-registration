var express=require("express");
var router=express.Router();
//router.use("/",require("./home"))
router.use("/", require("./login"));
router.use("/registration",require("./registration"))
router.use("/contactus",require("./contactus"))
router.use("/info",backdoor,require("./info"))
function backdoor(req, res, next)
{
	if(! req.session.is_user_logged_in)
	{
		res.redirect("/");
	}
	next();
}
module.exports=router;