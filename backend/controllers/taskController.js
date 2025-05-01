const Task = require("../model/task");
let myTasks = [];

const getAllTasks = (req, res) => {
  if (myTasks.length === 0) {
    return res.status(404).json({
      message: "No hay tareas ",
    });
  }
  res.status(200).json({
    message: `cantidad de tareas ${myTasks.length}`,
    tasks: myTasks,
  });
};

const createTask = (req, res) => {
  const { title, description } = req.body;

  //uso trim para eliminar espacios en blanco
  if (!title || title.trim() === "") { 
    return res.status(400).json({
      message: "titulo es requerido",
    });
  } else if (!description || description.trim() === "") {
    return res.status(400).json({
      message: "descripcion es requerido",
    });
  }
  const newTask = new Task(title, description);
  myTasks.push(newTask);
  res.status(201).json({
    message: "Tarea creada",
    task: newTask,
  });
};

const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const filter = myTasks.filter((task) => task.id !== taskId);

  if (filter.length === myTasks.length) {
    return res.status(404).json({
      message: "Tarea no encontrada",
    });
  }
  myTasks = filter;
  res.status(200).json({
    message: "Tarea eliminada",
    tasks: myTasks,
  });
};

const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, completed } = req.body;
  const task = myTasks.find((task) => task.id === taskId);

  if(!task){
    return res.status(404).json({
      message: "Tarea no encontrada",
    });
  }

  if(title === undefined || title.trim() === ""){
    return res.status(400).json({
      message: "El titulo no puede ser vacio",
    });
  }else {
    task.title = title;
  }
  if(description === undefined || description.trim() === ""){
    return res.status(400).json({
      message: "La descripcion no puede ser vacio",
    });
  }else {
    task.description = description;
  }
  if (completed !== undefined) task.completed = completed;

  res.status(200).json({
    message: "La tarea fue actualizada",
    task: task,
  });
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
};
