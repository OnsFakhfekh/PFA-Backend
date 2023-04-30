import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
    //formId: { type: String, required:true},
   //formSubmissionId: { type: String, required:true},
    values :{type: Map, required:true ,},
    author : {type: mongoose.Schema.Types.ObjectId, ref: 'patients'},
    destination : {type: mongoose.Schema.Types.ObjectId, ref: 'doctors'},
}, {timestamps: true});

const Form = mongoose.model("Form", FormSchema);

export default Form;