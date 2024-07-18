const databaseAdapter = require( './databaseAdapter');

async function test(query) {
    const adapter = new databaseAdapter();

    const result = await adapter.query(query);
    console.log(result.rows);
}


test('select * from events');