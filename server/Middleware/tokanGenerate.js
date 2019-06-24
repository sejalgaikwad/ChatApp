const jwt = require('jsonwebtoken');
module.exports = 
{
    GenerateToken(payload) 
    {
        const token = jwt.sign({ payload }, 'secretkey', { expiresIn: '1d' }) //expires in one day
        const obj = 
        {
            success: true,
            message: 'Token Generated',
            token: token
        }
        return obj;
    }
}