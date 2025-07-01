const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://mekalabhavana029:SmartBridge1234@cluster0.rkgo1gq.mongodb.net/compliants-register-system?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
   console.log("connected to mongodb")
})