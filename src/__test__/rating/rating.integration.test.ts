import supertest from "supertest"
import server from "@/lib/supertestServer"
import { prisma } from "@/lib/dbConnector"

const app = server()

describe("[POST] create rating", () => {
    describe("given rating data is valid", () => {
        it("should return 201", async () => {
            const productId = await prisma.product.findFirst({
                orderBy: {
                    id: "desc"
                }
            }).then((product) => product?.id)

            const rating = {
                productId: productId,
                rating: 5
            }
            await supertest(app)
                .post("/rating")
                .send(rating)
                .expect(201)
        })
    })

    describe("given rating data is invalid", () => {
        it("should return 400", async () => {
            const rating = {
                productId: null,
                rating: 5
            }
            await supertest(app)
                .post("/rating")
                .send(rating)
                .expect(400)
        })
    })

    describe("given productId not found", () => {
        it("should return 404", async () => {
            const rating = {
                productId: 0,
                rating: 5
            }
            await supertest(app)
                .post("/rating")
                .send(rating)
                .expect(404)
        })
    })
})