import supertest from "supertest"
import server from "@/lib/supertestServer"
import { prisma } from "@/lib/dbConnector"

const app = server()

describe("[POST] create review", () => {
    describe("given review data is valid", () => {
        it("should return 201", async () => {
            const review = {
                name: "Test User",
                email: "test@mail.com",
                rating: Math.random() * 5,
                review: "This is a test review."
            }
            await supertest(app)
                .post("/review")
                .send(review)
                .expect(201)
        })
    })

    describe("given review data is invalid", () => {
        it("should return 400", async () => {
            const review = {
                name: "Test User",
                email: "test@mail.com",
                // missing rating
                review: "This is a test review."
            }
            await supertest(app)
                .post("/review")
                .send(review)
                .expect(400)
        })
    })
})

describe("[GET] get all reviews", () => {
    describe("given there are reviews", () => {
        it("should return 200", async () => {
            await supertest(app)
                .get("/review")
                .expect(200)
        })
    })
})

describe("[GET] get review by ID", () => {
    describe("given review exists", () => {
        it("should return 200", async () => {
            const productId = await prisma.review.findFirst({
                orderBy: {
                    id: "desc"
                }
            }).then((review) => review?.id)
            await supertest(app)
                .get(`/review/${productId}`)
                .expect(200)
        })
    })

    describe("given review does not exist", () => {
        it("should return 404", async () => {
            const productId = 0
            await supertest(app)
                .get(`/review/${productId}`)
                .expect(404)
        })
    })
})
