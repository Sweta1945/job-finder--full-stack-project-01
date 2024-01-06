const mongoose =require('mongoose');

const jobPostSchema = new mongoose.Schema({
_id:{ type:mongoose.Schema.Types.ObjectId, auto:true },
companyName:{ type:String, required:true},
jobPlace:{ type:String, required:true},
skillsRequired:{type:[String], required:true}, 
recruiterName:{type:String, required:true}, 
createdAt:{type:Date, default:Date.now}, 
logoUrl:{type:String, required:true}, 
position:{type:String, required:true}, 
salary:{type:String, required:true}, 
jobType:{type:String, required:true}, 
location:{type:String, required:true}, 
description:{type:String, required:true},
about:{type:String, required:true},


})
const Job = mongoose.model('Job', jobPostSchema);

module.exports = Job;