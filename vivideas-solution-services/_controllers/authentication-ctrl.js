const passwordService = require('../_services/encrypt-decript-service');
const authentication = require('../_models/authentication-mdl');
const JWTService = require('../_services/JWT-service');
module.exports = {
    registerUser:function(request,response){
        try {
            var auth = new authentication({
                userName:request.body.userName,
                password:passwordService.encrypt(request.body.password),
                userType:1,
            });
            return new Promise((resolve,reject)=>{
                auth.save((error,data)=>{
                    if(!error){
                        resolve(data);
                    }else{
                        reject(error);
                    }
                });
            }).then((data)=>{
                response.status(200).send({result:'success',data:data});
            }).catch((error)=>{
                response.status(500).send({result:'fail',error:error});
            })
        } catch (error) {
            response.status(500).send({result:'fail',error:error});
        }
    },

    loginUser:function (request,response){
        try {
            return new Promise((resolve,reject)=>{
                authentication.findOne({email:request.body.email}).exec((error,data)=>{
                    if(!error){
                        resolve(data);
                    }else{
                        reject(error);
                    }
                });
                }).then((data)=>{
                    if(data!=null){
                        if(passwordService.decryptAndCompare(request.body.password,data.password)){
                            response.status(200).send({token:JWTService.createJWToken(data._id),userDetails:data})
                        }else{
                            response.status(403).send({result:'Invalid Password'});
                        }
                    }else{
                        response.status(403).send({result:'Invalid Email-ID'});
                    }
                }).catch((error)=>{
                    response.status(500).send({result:'fail',error:error});
            })
        } catch (error) {
            response.status(500).send({result:'fail',error:error});
        }
    },

    productList:function(request,response){
        try {
            return new Promise((resolve,reject)=>{
                
            }).then((data)=>{
                
            }).catch((error)=>{
                response.status(500).send({result:'fail',error:error});
            })
        } catch (error) {
            response.status(500).send({result:'fail',error:error});
        }
    }

}