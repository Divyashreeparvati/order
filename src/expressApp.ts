import express from 'express'
import path from 'path'
import cors from 'cors'
import cartRoutes from './routes/cart.routes'
import orderRoutes from './routes/order.route'


const app=express()

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cors())

app.use(cartRoutes)
app.use(orderRoutes)

export default app