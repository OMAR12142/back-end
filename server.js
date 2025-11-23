import path from 'path'
import express from 'express'
import connectDb from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './midd/errorMiddleware.js'
import dotenv from 'dotenv'
import uploadRoutes from './routes/uploadRoutes.js'
import cookieParser from 'cookie-parser'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

connectDb()
const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)

// ---------- PRODUCTION -----------
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'front-end', 'dist')))

  // THIS IS IMPORTANT
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end', 'dist', 'index.html'))
  })

} else {
  app.get('/', (req, res) => {
    res.send('api is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`server running in port ${port}`))
