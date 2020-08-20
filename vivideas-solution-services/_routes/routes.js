module.exports = function(app){
    const authentication = require('../_controllers/authentication-ctrl');
    const JWTService = require('../_services/JWT-service')
/* *********************************************** Routes  ************************************************************* */

    app.post('/api/login',authentication.loginUser);
    app.post('/api/register',authentication.registerUser);
    app.get('/api/product-list',JWTService.verifyJWToken,authentication.productList);
    

/* // *********************************************** Routes  ************************************************************* */
}
