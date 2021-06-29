const jwt = require('jsonwebtoken');
// module.exports.jwt = jwt;

const verification = (token) => {
    return jwt.verify(token,process.env.SECRET, function(err, decoded) {
        // console.log(err);
        if (err)  {
            return({auth:false,message:err})
        }
        return({auth:true,message:decoded}); 
})};


module.exports = {
    jwt,
    verification
}