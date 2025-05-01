
const express = require('express');
const app = express();
const PORT = 3000;
const HOST = 'localhost'


const taskRoutes = require('./routes/taskRoutes')

app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Bienvenido a la API de tareas',
    })
}
)


app.listen(PORT, HOST, () => {
    console.log(`El servidor esta corriendo en el puerto http://${HOST}:${PORT}`);
})

