import supertest from "supertest"
import server from "@/lib/supertestServer"
import path from "path"
import { prisma } from "@/lib/dbConnector"

const app = server()

describe("[POST] create product", () => {
    describe("given product data is valid", () => {
        it("should return 201", async () => {
            const product = {
                name: "Test Product",
                price: 100,
            }
            await supertest(app)
                .post("/product")
                .field('name', product.name)
                .field('price', product.price)
                .attach('image', path.resolve(__dirname, '../asset/test.png'))
                .expect(201)
        })
    })

    describe("given product data is invalid", () => {
        it("should return 400", async () => {
            const product = {
                name: "Test Product",
                price: 100
            }
            await supertest(app)
                .post("/product")
                .send(product)
                .expect(400)
        })
    })
})

describe("[GET] get all products", () => {
    describe("given there are products", () => {
        it("should return 200", async () => {
            await supertest(app)
                .get("/product")
                .expect(200)
        })
    })
})

describe("[GET] get product by ID", () => {
    describe("given product exists", () => {
        it("should return 200", async () => {
            const productId = await prisma.product.findFirst({
                orderBy: {
                    id: "desc"
                }
            }).then((product) => product?.id)
            await supertest(app)
                .get(`/product/${productId}`)
                .expect(200)
        })
    })

    describe("given product doesn't exist", () => {
        it("should return 404", async () => {
            const productId = 0
            await supertest(app)
                .get(`/product/${productId}`)
                .expect(404)
        })
    })
})

describe("[PUT] update product", () => {
    describe("given product exists", () => {
        it("should return 200", async () => {
            const productId = await prisma.product.findFirst({
                orderBy: {
                    id: "desc"
                }
            }).then((product) => product?.id)
            const product = {
                name: "Test Product",
                price: 100
            }
            await supertest(app)
                .put(`/product/${productId}`)
                .send(product)
                .expect(200)
        })
    })

    describe("given product doesn't exist", () => {
        it("should return 404", async () => {
            const productId = 0
            const product = {
                name: "Test Product",
                price: 100
            }
            await supertest(app)
                .put(`/product/${productId}`)
                .send(product).expect(404)
        })
    })
})

describe("[DELETE] delete product", () => {
    describe("given product exists", () => {
        it("should return 200", async () => {
            const productId = await prisma.product.findFirst({
                orderBy: {
                    id: "desc"
                }
            }).then((product) => product?.id)
            await supertest(app)
                .delete(`/product/${productId}`)
                .expect(200)
        })
    })

    describe("given product doesn't exist", () => {
        it("should return 404", async () => {
            const productId = 0
            await supertest(app)
                .delete(`/product/${productId}`)
                .expect(404)
        })
    })
})
