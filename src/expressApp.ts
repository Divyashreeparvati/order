import express from 'express'
import path from 'path'
import cors from 'cors'
import cartRoutes from './routes/cart.routes'
import orderRoutes from './routes/order.route'
import { httpLogger, HandleErrorWithLogger, MessageBroker } from "./utils";
import { Consumer, Producer } from 'kafkajs'


export const ExpressApp=async()=>{
    const app=express()

    app.set('view engine','ejs')
    app.set('views',path.join(__dirname,'views'))
    
    app.use(express.urlencoded({extended:true}))
    app.use(express.json())
    
    app.use(cors())
    
    app.use(cartRoutes)
    app.use(orderRoutes)
    
    app.use(httpLogger);
    app.use(HandleErrorWithLogger);

    const producer=await MessageBroker.connectionProducer<Producer>()

    //1st step: connect to producer and consumer

    producer.on("producer.connect",()=>{
        console.log("producer connected")
    })

    const consumer=await MessageBroker.connectConsumer<Consumer>()

    consumer.on('consumer.connect',()=>{
        console.log("consumer connected")
    })

    //2nd step: subscribe to topic or publish the message

    await MessageBroker.subscribe((message)=>{
        console.log("consumer recieved message")
        console.log("Message recieved",message)
    },"OrderEvents")

    return app
}