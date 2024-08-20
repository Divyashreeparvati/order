import { CartRepositoryType } from "../types/repository.type";

const creatCart=async (input:any):Promise<{}> =>{
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