const Task = require("../model/task");
const fs = require('fs')
const path = require('path')
const tareasPath = path.join(__dirname,'../tareas.json')

let myTasks = [];
if(fs.existsSync(tareasPath)){
  const data = fs.readFileSync(tareasPath,'utf-8')
  myTasks = JSON.parse(data)
}

const getAllTasks = (req, res) => {
  if (myTasks.length === 0) {
    return res.status(200).json({
      message: "No tasks ",
      tasks: myTasks,
    });
  }
  res.status(200).json({
    message: `Number of tasks ${myTasks.length}`,
    tasks: myTasks,
  });
};

const getTask = (req,res) =>{
  const taskId = parseInt(req.params.id)
  const task = myTasks.find((task) => task.id === taskId);
  if(!task){
    return res.status(404).json({
      message: "Task nor found",
    });
  }
  res.status(200).json({
    message: "Task found",
    task: task,
  });
}

const createTask = (req, res) => {
  const { title, description } = req.body;

  //uso trim para eliminar espacios en blanco
  if (!title || title.trim() === "") { 
    return res.status(400).json({
      message: "Title is required",
    });
  } else if (!description || description.trim() === "") {
    return res.status(400).json({
      message: "Description is required",
    });
  }
  const newTask = new Task(title, description);
  myTasks.push(newTask);
  fs.writeFileSync(tareasPath, JSON.stringify(myTasks, null, 2)); 
  res.status(201).json({
    message: "Task created successfully",
    task: newTask,
  });
};

const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const filter = myTasks.filter((task) => task.id !== taskId);

  if (filter.length === myTasks.length) {
    return res.status(404).json({
      message: "Task not found",
    });
  }
  myTasks = filter;
  fs.writeFileSync(tareasPath, JSON.stringify(myTasks, null, 2)); // ✅ actualizar archivo

  res.status(200).json({
    message: "Task deleted successfully",
    tasks: myTasks,
  });
};

const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, completed } = req.body;
  const task = myTasks.find((task) => task.id === taskId);

  if(!task){
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if(title !== undefined ){
    if(title.trim() === ""){
      return res.status(400).json({
        message: "Title cannot be empty",
      })
    }
      task.title = title;
    }

  if(description !== undefined){
    if(description.trim() === "")
    return res.status(400).json({
      message: "Description cannot be empty",
    });
  
    task.description = description;
  }
  if (completed !== undefined){
    
    task.completed = completed;
  } 
  fs.writeFileSync(tareasPath, JSON.stringify(myTasks, null, 2)); // ✅ guardar cambios

  res.status(200).json({
    message: "Update task successfully",
    task: task,
  });
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getTask
};
