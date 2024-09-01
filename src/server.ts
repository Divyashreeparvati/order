import {ExpressApp} from "./expressApp";
import dotenv from 'dotenv'
import path from "path";
import {config} from "./config/index"
import { logger } from "./utils";


const PORT=config.PORT||8001


export const StartServer=async()=>{
    const app=await ExpressApp()

    app.listen(PORT,()=>{
        console.log('app is listening to PORT ',PORT)
    })

    process.on('uncaughtException',async(err)=>{
        console.log(err)
        logger.error(err)
        process.exit(1)
    })
}

StartServer().then(()=>{
    console.log("server is up")
})