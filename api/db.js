const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'pg.cse.taylor.edu',
        user: 'catherine_bell',
        password: 'luqecomi',
        database: 'catherine_bell'
    }
});