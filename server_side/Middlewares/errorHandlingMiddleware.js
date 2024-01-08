const errorHandler=(err, req, res, next)=>{
console.error(err);
res.status(500).send("something went wrong please try again!!");

};
module.exports=errorHandler;