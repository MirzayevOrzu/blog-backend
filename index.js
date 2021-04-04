const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/user')
require('dotenv').config();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
// app.use(express)

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => {
        console.log("Connected to mongo database");
    })
    .catch((err) => {
        console.log("Error connecting mongo database", err);
    });

const { getPosts, getPostById, deletePost, makePost } = require('./handlers/post')
const { register, login } = require('./handlers/auth')
const { isAuthenticated } = require('./middleware/isAuthenticated')

app.post('/api/makePost', makePost)
app.get('/api/getPosts', getPosts)
app.get('/api/getPosts/:id', getPostById)
app.post('/api/deletePost', deletePost)

app.post('/api/register', register)
app.post('/api/login', login)

app.get('/api/protected', isAuthenticated, (req, res) => {
    console.log(req.user)
    res.send('got to the protected route')
})

app.post('/api/isValidToken', async (req, res) => {
    try {
        const token = req.header('jwt-token');
        if (!token) return res.json({ success: false })

        const verified = jwt.verify(token, process.env.JWT_PASSWORD);
        if (!verified) return res.json({ success: false });

        const user = await User.findById(verified.id);
        if (!user) return res.json({ success: false });

        res
            .status(200)
            .json({
                success: true,
                user: {
                    displayName: user.displayName,
                    id: user._id
                }
            })
    } catch (err) {
        res
            .status(500)
            .json({
                success: false,
                message: err.message
            })
    }
})


app.listen(5500, (err) => {
    if (err) console.log(err);
    console.log('connected to port 5500')
})