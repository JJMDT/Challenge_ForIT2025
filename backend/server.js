
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const taskRoutes = require('./routes/taskRoutes')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000 ;
const HOST = process.env.HOST || 'localhost' ;


app.use(express.json());

app.use(cors({
    origin:'*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false
}))


app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Task Manager API',
    })
}
)


app.listen(PORT, HOST, () => {
    console.log(`Server running http://${HOST}:${PORT}`);
})

