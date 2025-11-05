const Task = require('../Model/Task');
const mongoose = require('mongoose');

const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json({
            result: "success",
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            result: "error",
            message: 'Server Error',
            error: error.message
        });
    }
};

const createTask = async (req, res, next) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        console.log("Data sent");
        
        res.status(200).json({
            result: "success",
            data: savedTask
        });
    } catch (error) {
        res.status(500).json({
            result: "error",
            message: 'Server Error',
            error: error.message
        });
    }
};

const updateTask = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                result: "error",
                error: "Invalid Id"
            });
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            result: "success",
            data: updatedTask
        });
    } catch (error) {
        res.status(500).json({
            result: "error",
            message: 'Server Error',
            error: error.message
        });
    }
};

const deleteTask = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                result: "error",
                error: "Invalid Id"
            });
        }
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({
            result: "success",
            message: "Id Deleted"
        });
    } catch (error) {
        res.status(500).json({
            result: "error",
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };