const express = require('express');
const cors = require('cors');
const db = require('./src/config/db.js'); // Ensure this path matches your actual config file
const app = express();
require('dotenv').config();
const path = require('path');
// Middleware
app.use(express.json());
app.use(cors());

// app.use('/uploads', express.static('public/uploads'));

app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
const authRoutes = require('./src/routes/authRoutes');
const vichelRoutes = require('./src/routes/vehicleRoutes');
const driverRoute = require('./src/routes/driverRoutes');
const fuelRoute = require('./src/routes/fuelRoutes');
const taskRoute = require('./src/routes/taskRoutes');
const planRoute = require('./src/routes/planRoutes');
const trailerRoute = require('./src/routes/trailerRoutes');
const terminalRoutes = require('./src/routes/terminalRoutes.js')
const commonRoutes = require('./src/routes/commonRoutes.js')
const voilation = require('./src/routes/voilationRoutes.js');
const driveractivity = require('./src/routes/driveractivityRoutes.js')
const { limiter } = require('./src/middlewares/apiLimit');
// app.use(limiter)

// Define API routes
app.use('/api/', authRoutes);  // Using /api/auth for authRoutes
app.use('/api/', vichelRoutes); // Using /api/vichels for vichelRoutes
app.use('/api/', driverRoute); // Using /api/drivers for driverRoutes
app.use('/api/', fuelRoute); // Using /api/drivers for driverRoutes
app.use('/api/', taskRoute); // Using /api/drivers for driverRoutes
app.use('/api', planRoute); // using /api/plans for planRoutes
app.use('/api', trailerRoute); // using /api/trailers for trailerRoutes
app.use('/api', terminalRoutes); // using /api/trailers for terminalRoutes
app.use('/api', commonRoutes); // using /api/trailers for terminalRoutes
app.use('/api', voilation); // using /api/trailers for terminalRoutes
app.use('/api', driveractivity); // using /api/trailers for terminalRoutes

// Connect to the database
db.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
