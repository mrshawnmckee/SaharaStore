import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect Routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read the JWT form the cookie
    token = req.cookies.jwt;        //It is .jwt because that is what is called for in the  userController file
    if (token) {
        try {
            // Decoding the token to get the user ID; it was passed in  as the payload in user cont(const token = jwt.sign({userId}))
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Adding the user onject to the request object(req.user) on all the routes
            // ex, const getUserProfile = asyncHandler(async (req, res), the req will be the user object
            req.user = await User.findById(decoded.userId).select('-password')     //Dont need the password for this
            next();     //Move on to the next piece of middleware
        } catch (error){
            console.log(error)
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as Admin');
    }
};

export { protect, admin };

// Then must apply to routes in the userRoutes file, and add protect middelware before
// ex router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
