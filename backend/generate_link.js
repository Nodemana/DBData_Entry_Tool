exports.generateStreetViewUrl = async (req, res, next) => {
    const coordinates = req.body.coordinates;
    console.log(coordinates)
    res.responseObject = {};
    if (!coordinates) {
        return res.status(400).send('Coordinates are required');
    }

    // Splitting the coordinates string into latitude and longitude
    const [lat, lng] = coordinates.split(',').map(coord => coord.trim());

    if (!lat || !lng) {
        return res.status(400).send('Invalid coordinates format');
    }

    const streetViewUrl = `https://www.google.com/maps?layer=c&cbll=${lat},${lng}`;

    // Add the URL to the request object for downstream use
    res.responseObject.streetViewUrl = streetViewUrl;
    req.lat = lat;
    req.lng = lng;
    console.log(streetViewUrl);
    next();
};