// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const Bed = require('./models/BedAssignment'); // Adjust the path based on your project structure

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Get all wards
app.get('/wards', (req, res) => {
    db.query('SELECT * FROM WARDS', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get all rooms
app.get('/rooms', (req, res) => {
    db.query('SELECT * FROM ROOMS', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get all beds
app.get('/beds', (req, res) => {
    db.query('SELECT * FROM BEDS', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Add a new ward
app.post('/wards', (req, res) => {
    const { ward_name, ward_description, ward_floor_no, no_of_rooms } = req.body;
    db.query('INSERT INTO WARDS (ward_name, ward_description, ward_floor_no, no_of_rooms) VALUES (?, ?, ?, ?)', [ward_name, ward_description, ward_floor_no, no_of_rooms], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, ward_name });
    });
});

// Add a new room
app.post('/rooms', (req, res) => {
    const { room_floor_no, no_of_beds, room_type, occupancy_status, rate_per_day, ward_id } = req.body;
    db.query('INSERT INTO ROOMS (room_floor_no, no_of_beds, room_type, occupancy_status, rate_per_day, ward_id) VALUES (?, ?, ?, ?, ?, ?)', [room_floor_no, no_of_beds, room_type, occupancy_status, rate_per_day, ward_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, room_floor_no });
    });
});

// Add a new bed
app.post('/beds', (req, res) => {
    const { occupancy_status, bed_type, rate_per_day, room_no } = req.body;
    db.query('INSERT INTO BEDS (occupancy_status, bed_type, rate_per_day, room_no) VALUES (?, ?, ?, ?)', [occupancy_status, bed_type, rate_per_day, room_no], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, bed_type });
    });
});

// New Routes for Bed Assignment

app.get('/beds-all', async (req, res) => {
    console.log('Received request to /beds-all');
    try {
        const [results] = await db.query('SELECT * FROM BEDS');
        if (!results.length) {
            console.log('No beds found');
            return res.status(404).json({ message: 'No beds found.' });
        }
        
        console.log('Beds fetched successfully:', results);
        const bedsData = results.reduce(
            (acc, bed) => {
                if (bed.occupancy_status.toLowerCase() === 'vacant') {
                    acc.available.push(bed);
                } else {
                    acc.occupied.push(bed);
                }
                return acc;
            },
            { available: [], occupied: [] }
        );

        res.json(bedsData);
    } catch (err) {
        console.error('Error fetching beds:', err);
        res.status(500).json({ error: 'An error occurred while fetching beds.', details: err.message });
    }
});

// Update the occupancy status of a bed
app.put('/beds/update/:id', async (req, res) => {
    const bedId = req.params.id;
    const { occupancy_status } = req.body;

    console.log(`Updating bed ID: ${bedId} with status: ${occupancy_status}`); // Debug log

    if (!occupancy_status) {
        return res.status(400).json({ error: 'Occupancy status is required.' });
    }

    try {
        // Attempt to update the occupancy status
        const [updated] = await Bed.update({ occupancy_status }, {
            where: { bed_no: bedId },
        });

        if (!updated) {
            return res.status(404).json({ error: 'Bed assignment not found.' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'Bed assignment updated successfully.' });
    } catch (error) {
        console.error('Error updating bed assignment:', error); // Log full error for debugging
        res.status(500).json({ error: 'An error occurred while updating the bed assignment.', details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});