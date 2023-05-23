const Task = require('../models/Task');
const { validationResult } = require('express-validator');
const TaskDTO = require('../dto/taskDTO');

/* obtener todos */
exports.getAllTasks = (req, res) => {
    Task.find()
        .then( (tasks) => {
            const transformedTasks = tasks.map((task) => new TaskDTO(task._id, task.name, task.completed));
            
            res.json(transformedTasks);
        })
        .catch( (error) => {
            res.status(500).json({error: 'Error al obtener los tasks'});
        });
};

/* crear un task */
exports.createTask = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const { name, completed } = req.body;

    const newTask = new Task({
        name,
        completed
    });

    console.log(newTask);
    newTask.save().then( (task) => {
        res.json(task);
    })
    .catch( (error) => {
        console.log(error)
        res.status(500).json({error: 'Error al crear el task'});
    });
};

/* actualizar task */
exports.updateTask = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { name, completed } = req.body;

    Task.findByIdAndUpdate( req.params.id, {name, completed }, { new: true } )
        .then( (task) => {
            if(!task){
                return res.status(404).json({error: 'Task no encontrado'});
            }
            res.json(task);
        })
        .catch( (error) => {
            
            res.status(500).json({ error: 'Error al actualizar el task'});
        });
};

/* Eliminar un task */
exports.deleteTask = (req, res) => {
    Task.findByIdAndDelete(req.params.id).then( (task) => {
        if(!task){
            return res.status(404).json({ error: 'Task no encontrado'});
        }
        res.json({ message: 'Task eliminado correctamente '});
    })
    .catch((error) => {
        res.status(500).json({ error: 'Error al eliminar el task'});
    })
}

