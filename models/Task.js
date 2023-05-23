const { Schema, model } = require('mongoose');


const TaskSchema = Schema({
    name:  {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = model('Task', TaskSchema);