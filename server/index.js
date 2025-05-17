const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://jeetendra01:crud54321@clustercrud.oeq1fmu.mongodb.net/?retryWrites=true&w=majority&appName=Clustercrud';


const allowedOrigins = [
  'https://users-crud-jeetendra-kumars-projects.vercel.app/'
];

app.use(cors({
  origin: true
}));
app.use(express.json());


app.use('/users', usersRouter);


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});
