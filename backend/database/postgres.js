const { Pool } = require('pg');
// DB Connection Middleware
exports.DB_Connection = async (req, res, next) => {
    // Assuming parameters are sent in the body of the request
    console.log(req.body);
    connectionParams = req.body.connectionParams
    console.log(`Connecting to DB ${connectionParams.hostname}`);
    const pool = new Pool({
        host: connectionParams.hostname,
        user: connectionParams.user,
        port: connectionParams.port,
        password: connectionParams.password,
        database: connectionParams.database,
    });

    const isConnected = await testConnection(pool);
    if (isConnected) {
        res.send('Connected to database successfully!');
    } else {
        res.status(500).send('Failed to connect to database.');
    }
}

async function testConnection(pool) {
    try {
        const client = await pool.connect();
        console.log('Connected to database successfully!');
        const { rows } = await client.query('SELECT NOW()');
        console.log('Server time is:', rows[0].now);
        client.release();
        return true;
    } catch (err) {
        console.error('Database connection error', err.stack);
        return false;
    }
}
