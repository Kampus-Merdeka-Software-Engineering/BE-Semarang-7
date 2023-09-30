import {productController} from "@/controllers/product"

describe("getProducts", () => {
    it("should return an array of products", async () => {
        const req = {
            query: {
                search: ""
            }
        } as any
        const res = {
            json: jest.fn()
        } as any
        const next = jest.fn()
        await productController.getProducts(req, res, next)
        expect(res.json).toHaveBeenCalledWith(expect.any(Array))
    })
})

describe("getProductById", () => {
    it("should return a product", async () => {
        const req = {
            params: {
                id: "1"
            }
        } as any
        const res = {
            json: jest.fn()
        } as any
        const next = jest.fn()
        await productController.getProductById(req, res, next)
        expect(res.json).toHaveBeenCalledWith(expect.any(Object))
    })
})
