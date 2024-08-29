const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://192.168.1.111:27017/habibi_intern', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB at 192.168.1.111');
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Define Schemas and Models
const flowtrackSchema = new mongoose.Schema({
  id: Number,
  flowrate: Number,
  volume: Number,
  timestamp: { type: Date, default: Date.now }
});
const Flowtrack = mongoose.model('Flowtrack', flowtrackSchema);

const soilGuardianSchema = new mongoose.Schema({
  id: Number,
  nitrogen: { type: Number, required: true },
  phosphorus: { type: Number, required: true },
  potassium: { type: Number, required: true },
  ec: { type: Number, required: true },
  ph: { type: Number, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});
const SoilGuardian = mongoose.model('SoilGuardian', soilGuardianSchema);

const hydrotechAbSchema = new mongoose.Schema({
  id: Number,
  ec: { type: Number, required: true },
  ph: { type: Number, required: true },
  do: { type: Number, required: true },
  temperature: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});
const HydrotechAb = mongoose.model('HydrotechAb', hydrotechAbSchema);

// Middleware
app.use(express.json());

// Routes for Fetching Data
app.get('/api/flowtracks', async (req, res) => {
  try {
    const data = await Flowtrack.find();
    console.log('Flowtrack Data:', data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching flowtrack data:', error);
    res.status(500).send(error.message);
  }
});

app.get('/api/soilguardians', async (req, res) => {
  try {
    const data = await SoilGuardian.find();
    console.log('Soil Guardian Data:', data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching soil guardian data:', error);
    res.status(500).send(error.message);
  }
});

app.get('/api/hydrotechabs', async (req, res) => {
  try {
    const data = await HydrotechAb.find();
    console.log('Hydrotech AB Data:', data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching hydrotech data:', error);
    res.status(500).send(error.message);
  }
});

// Routes for Adding Data
app.post('/api/flowtracks/add', async (req, res) => {
  try {
    const newFlowtrack = new Flowtrack(req.body);
    await newFlowtrack.save();
    console.log('Added Flowtrack:', newFlowtrack);
    res.status(201).json(newFlowtrack);
  } catch (error) {
    console.error('Error adding flowtrack data:', error);
    res.status(500).send(error.message);
  }
});

app.post('/api/soilguardians/add', async (req, res) => {
  try {
    const newSoilGuardian = new SoilGuardian(req.body);
    await newSoilGuardian.save();
    console.log('Added Soil Guardian:', newSoilGuardian);
    res.status(201).json(newSoilGuardian);
  } catch (error) {
    console.error('Error adding soil guardian data:', error);
    res.status(500).send(error.message);
  }
});

app.post('/api/hydrotechabs/add', async (req, res) => {
  try {
    const newHydrotechAb = new HydrotechAb(req.body);
    await newHydrotechAb.save();
    console.log('Added Hydrotech AB:', newHydrotechAb);
    res.status(201).json(newHydrotechAb);
  } catch (error) {
    console.error('Error adding hydrotech data:', error);
    res.status(500).send(error.message);
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://192.168.1.111:${port}`);
});
