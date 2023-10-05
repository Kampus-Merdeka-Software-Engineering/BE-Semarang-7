import supertest from "supertest"
import server from "@/lib/supertestServer"

const app = server()

describe("[POST] create message", () => {
    describe("given message data is valid", () => {
        it("should return 201", async () => {
            const message = {
                name: "Test User",
                email: "test@example.com",
                message: "This is a test message."
            }
            await supertest(app)
                .post("/message")
                .send(message)
                .expect(201)
        })
    })

    describe("given message data is invalid", () => {
        it("should return 201", async () => {
            const message = {
                name: "Test User",
                email: null,
                message: "This is a test message."
            }
            await supertest(app)
                .post("/message")
                .send(message)
                .expect(400)
        })
    })
})