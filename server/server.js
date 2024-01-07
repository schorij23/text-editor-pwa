const express = require('express');
// Create an Express application
const app = express();
// Define the port to listen on, using an environment variable or default to 3000
const PORT = process.env.PORT || 3000;
// Serve static files from the 'dist' directory (assumes your client-side code is in there)
app.use(express.static('../client/dist'));
// Parse incoming requests with JSON and URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);
// Start the Express server and listen on the defined port
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
