const server = require('../src/app')
const session = require('supertest')
const agent = session(server)

describe("Route test", () => {
    describe("http://localhost:3001", () => {
        it('All pokemons: Responds with status: 200', async () => {
            await agent.get("/pokemons").expect(200)
        }, 10000)

        it('ID (Number) pokemon: Responds with status: 200', async () => {
            await agent.get("/pokemons/1").expect(200)
        }, 10000)

        it('ID (UUID) pokemon: Responds with status: 200', async () => {
            await agent.get("/pokemons/b5a1dbb9-60ac-49cf-b754-00f2cd12a9a1").expect(200)
        }, 10000)

        it('Name pokemon: Responds with status: 200 and contains a Pokemon name', async () => {
            const response = await agent.get("/pokemons/?name=pikachu").expect(200);
            expect(response.request.url).toMatch(/name=pikachu/);
        }, 10000)

        it('Created pokemons: Responds with status: 200', async () => {
            await agent.post("/pokemons/pokemons").expect(200)
        }, 10000)

        it('Types pokemons: Responds with status: 200', async () => {
            await agent.get("/types").expect(200)
        }, 10000)
    })

})