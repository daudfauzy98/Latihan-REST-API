import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import router from './router.js'

// Membuat objek app dari kelas Express
const app = express()

// Konksikan program dengan MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI,
    {useNewUrlParser: true, useUnifiedTopology: true,}
).then(() => {
    console.log('Connect to MongoDB database success!')
}).catch(err => {
    console.log('Connect to failed ' + err)
})

/*mongoose.connect('mongodb+srv://admin:admin@rest-api.p3kvu.mongodb.net/jadwalin?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log('Connect to MongoDB database success!')
})*/

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res, next) => {
    res.json({ message: "Success!" })
})

app.use('/api', router)

const PORT = process.env.PORT || '4000'
app.listen(PORT, () => {
    console.log(`App listens on port ${PORT}`)
})