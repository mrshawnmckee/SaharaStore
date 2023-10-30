import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'

// @desc    Auth user & Get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    // Destructuring object with email and password for use by the app
    const { email, password } = req.body;

    const user = await User.findOne( {email} )    //This is confirming that the email matches the one in the record/DB; email is shorthand of email: email

    if (user && await user.matchPassword(password)) {                         //If there is a user that matches, and the passwords match, respond with this data/info
        // json web token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
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

        res.json({
            _id: user._id,
            name: user.name, 
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);        //if this user does not exist, status not authorized
        throw new Error("Invalid email or password");   //From our custom error handler
    }
});

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.send('register user')
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    //This is just clearing the jwt cookie, so equivelant of logged out; sets jwt cookie to nothing ('')
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile')
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile')
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users')
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
    res.send('get user by id')
});

// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user')
});

// @desc    Update users
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user')
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser
}