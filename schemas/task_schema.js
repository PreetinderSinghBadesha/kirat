const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['on-going', 'in-progress', 'completed', 'urgent'],
        default: 'in-progress'
    },
    dueDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    microTask: {
        type: [microTaskSchema],
        default: [],
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const  microTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

module.exports = Task;