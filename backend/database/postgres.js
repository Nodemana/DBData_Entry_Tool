const { Pool } = require('pg');
var pool;
// DB Connection Middleware
exports.DB_Connection = async (req, res, next) => {
    // Assuming parameters are sent in the body of the request
    console.log(req.body);
    connectionParams = req.body.connectionParams
    console.log(`Connecting to DB ${connectionParams.hostname}`);
    pool = new Pool({
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

// Middleware to query for image polygons containing the given coordinates
exports.queryImagePolygons = async (req, res, next) => {
    const { lat, lng } = req;
    if (!lat || !lng) {
        return res.status(400).send('Latitude and longitude are required');
    }

    // Assuming your table is named 'image_boxes' and the polygon column is 'image_box'
    const query = `
        SELECT * FROM bridge_data_queensland
        WHERE ST_Contains(image_box, ST_SetSRID(ST_Point($1, $2), 4326));
    `;

    try {
        const client = await pool.connect();
        const result = await client.query(query, [lng, lat]);
        client.release();
        console.log(result.rows);

        if (result.rows.length > 0) {
            // Assuming you're interested in the first row of the result
            const firstResult = result.rows[0];

            // Extracting image_box and image_name
            const imageBox = firstResult.image_box;
            const imageName = firstResult.image_name;

            // Store these values in the request object
            res.responseObject.imageBox = imageBox;
            res.responseObject.imageName = imageName;
            console.log(imageBox);
            console.log(imageName);
        }
        res.json(res.responseObject);
    } catch (err) {
        console.error('Database query error', err.stack);
        res.status(500).send('Error querying the database');
    }
};

exports.insertNewRow = async (req, res, next) => {
    console.log(req.body);
    const { roadName, roadType, height, link, bridgeCoordinates, imageBox, imageName, heightImplied } = req.body.entry;

    // Split the coordinates and reverse them
    const coordsArray = bridgeCoordinates.split(',');
    const formattedBridgeCoordinates = `${coordsArray[1]} ${coordsArray[0]}`; // latitude followed by longitude

    const query = `
        INSERT INTO bridge_data_queensland 
        (road_name, road_classification, height, link, bridge_coordinates, image_box, image_name, height_implied)
        VALUES ($1, $2, $3, $4, ST_SetSRID(ST_PointFromText('POINT(' || $5 || ')'), 4326), $6, $7, $8)
        RETURNING *;
    `;

    try {
        const client = await pool.connect();
        const result = await client.query(query, [roadName, roadType, height, link, formattedBridgeCoordinates, imageBox, imageName, heightImplied]);
        client.release();

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Database insertion error', err.stack);
        res.status(500).send('Error inserting data into the database');
    }
};


