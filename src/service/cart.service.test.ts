import { CartRepositoryType } from "../types/repository.type"
import * as Repository from '../repository/cart.repository'
import { CreateCart } from "./cart.service"

describe('cartService',()=>{
    let repo:CartRepositoryType

    beforeEach(()=>{
        repo=Repository.CartRepositor
    })

    afterEach(()=>{
        repo={} as CartRepositoryType
    })

    it("should return correct data while creating cart",async()=>{
        const mockCart={
            title:"smartPhone",
            amount:1200
        }

        jest.spyOn(Repository.CartRepositor,'create').mockImplementationOnce(()=>Promise.resolve({
            message:'Fake response from cart repository',
            input:mockCart
        }))
        const res=await CreateCart(mockCart,repo)
        expect(res).toEqual({
            message:'Fake response from cart repository',
            input:mockCart
        })
    })
})