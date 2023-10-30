import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & Get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    // Destructuring object with email and password for use by the app
    const { email, password } = req.body;

    const user = await User.findOne( {email} )    //This is confirming that the email matches the one in the record/DB; email is shorthand of email: email

    if (user && await user.matchPassword(password)) {                         //If there is a user that matches, and the passwords match, respond with this data/info
        generateToken(res, user._id)

        res.status(200).json({
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
    // destructuring name, email and password from the req.body
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({        //passing in the info if the user does not exist already, which will come from UI form
        name, 
        email,
        password
    });

    if (user) {
        generateToken(res, user._id)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
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
    const user = await User.findById(req.user._id)

    if(user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
      res.status(404);
      throw new Error('User not found')   
    }
    
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        // Using or so that only the things that were updated will be sent
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
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