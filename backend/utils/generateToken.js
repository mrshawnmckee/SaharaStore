import jwt from 'jsonwebtoken';
// This is used in user controller for reguster user and auth user

const generateToken = (res, userId) => {
    // json web token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'        //This is 30 days, since it is for the course, leaving it longer. 1d might be better for production
    });
    
    // set JWT as HHTP-Only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        // This is set for only true in production, because https is needed, which is not on the dev environment
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        // max age is when it will expire, setting it to the same as 30 days; this is in ms, so multiplying to make it 30d
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
}

export default generateToken;