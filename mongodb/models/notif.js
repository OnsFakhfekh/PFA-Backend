import mongoose from "mongoose";

const NotifSchema = new mongoose.Schema({
    type : { type: String, required:true},
    formId : {type: mongoose.Schema.Types.ObjectId,ref: 'Form',required: true},
}, {timestamps: true});

const notification = mongoose.model("notification", NotifSchema);

export default notification;