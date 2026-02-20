const { Pool } = require('pg')

const pool = new Pool({
    user: 'IN6AV',
    host: 'localhost',
    password: 'GestorIn6av!',
    database: 'gestor_opiniones',
    port: 5436
})

module.exports = pool