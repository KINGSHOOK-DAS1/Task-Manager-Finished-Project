const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const taskRoutes = require('./Routes/taskRoutes');
const {errorHandler} = require('./middleware/errorHandler')

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json())


mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDb connected"))
.catch((err) => console.error("MongoDb Not Connected"))

app.use((req, res, next) => {
  console.log("👉 Request:", req.method, req.url);
  next();
});

app.use('/api/tasks', taskRoutes)

app.get('/', (req,res) => {
    res.send("Task manager api is working")
})


app.use(errorHandler);

app.listen(PORT, () => console.log("Server running"))