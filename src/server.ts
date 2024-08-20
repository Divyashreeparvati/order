import app from "./expressApp";
import dotenv from 'dotenv'
import path from "path";
import {config} from "./config/index"


const PORT=config.PORT||8001


export const StartServer=async()=>{

    app.listen(PORT,()=>{
        console.log('app is listening to PORT ',PORT)
    })

    process.on('uncaughtException',async(err)=>{
        console.log(err)
        process.exit(1)
    })
}

StartServer().then(()=>{
    console.log("server is up")
})