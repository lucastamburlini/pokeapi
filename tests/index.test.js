const server = require('../src/app')
const session = require('supertest')
const agent = session(app)

describe("Route test", () => {
    describe("https://pokeapi.co/api/v2/pokemon/", () => {
        it('Responds with status: 200', async ()=>{
            await agent.get("pokemons/").expect(200)
        })
    })
})