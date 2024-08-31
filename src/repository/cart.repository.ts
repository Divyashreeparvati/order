import { CartRepositoryType } from "../types/repository.type";
import {DB} from '../db/db.connection'
import { carts } from "../db/schema"

const creatCart=async (input:any):Promise<{}> =>{

    const result=await DB.insert(carts).values({
        customerId:123
    }).returning({cartId:carts.id})
    console.log(result)
    return Promise.resolve({
        message:'Fake response from cart repository',
        input
    })
}

const updateCart=async (input:any):Promise<{}> =>{
    return Promise.resolve({})
}

const findCart=async (input:any):Promise<{}> =>{
    return Promise.resolve({})
}

const delteCart=async (input:any):Promise<{}> =>{
    return Promise.resolve({})
}


export const CartRepositor:CartRepositoryType={
    create: creatCart,
    find:findCart,
    update: updateCart,
    delete:delteCart
}