require('dotenv').config();
const Express = require('express');
const Mongoose = require('mongoose');

const cors = require('cors');
const morgan = require('morgan');

const userRoute = require('./Router/UserRoute');
const auth = require('./middleware/tokenAuthenication');
const { default: mongoose } = require('mongoose');

const app = Express();

app.use(cors());
app.use(Express.json());
app.use(morgan('dev'))


mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('db connected successfully')
})
app.use('/user', userRoute)
app.post ('/protected', auth, (req, res) => {
res.status(200).json({success: true, message: "Authentication success"})
})

app.listen( 3500, () => {
console.log(`server listening on the ${3500}`);
} )




