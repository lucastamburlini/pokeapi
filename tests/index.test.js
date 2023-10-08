const server = require('../src/app')
const session = require('supertest')
const agent = session(server)

describe("Route test", () => {
    describe("http://localhost:3001", () => {
        it('Responds with status: 200', async () => {
            await agent.get("/pokemons").expect(200)
        }, 10000)
    })
})