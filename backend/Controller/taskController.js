const Task = require('../Model/Task');
const mongoose = require('mongoose');

const getTasks = async (req, res, next) => 
    { try { const tasks = await Task.find().sort({ createdAt: -1 }); 
    res.status(200).json({ result: "success", data: tasks }); 
    } catch (error) 
    { res.status(500).json({ result: "error", message: 'Server Error', error: error.message }); } };



const createTask = async (req, res, next) => {
    try {
        const { title, description, dueDate, priority, completed, reminder } = req.body;

        // 🧠 Get user ID from login (if available)
        // req.user is usually set by your authentication middleware after verifying JWT
        const userId = req.user ? req.user.id : null;

        // 🆕 Create task with userId
        const task = new Task({
            title,
            description,
            dueDate,
            priority,
            completed: completed || false,
            reminder: reminder || { enabled: false, time: null },
            userId   // save which user created it (or null if guest)
        });

        const savedTask = await task.save();
        console.log("✅ Task created:", savedTask.title, "by user:", userId || "Guest");

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

        const { reminder } = req.body;

        // Optional check: make sure reminder format is valid
        if (reminder && typeof reminder !== "object") {
            return res.status(400).json({
                result: "error",
                message: "Invalid reminder format"
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
