const { data } = require("../data")
const { userAuthenticationDataBase } = require("../config/db");
const productDatabase = userAuthenticationDataBase.collection("productData");


const readData= async (request,response)=>{
    const result=await productDatabase.find({}).toArray()
    response.send(result)

}

module.exports={readData}