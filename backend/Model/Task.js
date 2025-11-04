const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim:true
    },
    description:{
        type:String,
        trim: true
    },
    completed:{
        type:Boolean,
        default:false
    },
    dueDate:{
        type:String
    },
    priority:{
        type:String,
        enum:['Low','Medium','High'],
        default:'Medium'
    },
    reminder: {
        time: { type: Date },       // When to remind
        enabled: { type: Boolean, default: false }  // Whether reminder is active
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default: null
    }
  
},{timestamps:true}) 


module.exports = mongoose.model('Task',taskSchema);