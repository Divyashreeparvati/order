import dotenv from 'dotenv'
import path from 'path'

const env=process.env.NODE_ENV

dotenv.config({path:path.resolve(__dirname,`.env.${env}`)})

export const config={
    DB_URL:process.env.DB_URL,
    PORT:process.env.PORT
}