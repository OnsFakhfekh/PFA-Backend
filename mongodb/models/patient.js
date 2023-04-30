import mongoose from "mongoose";
//Le schéma définit les propriétés que chaque objet Doctor doit avoir
const patientSchema = new mongoose.Schema({
    name: { type: String, required:true},
    email: { type: String, required:true,unique:true},
    password:{type: String, required:true },
    //age : { type: String, required:true},
    dateDeNaissance : {type: String, required:true},
    numTel : {type: String, required:true},
    Genre : {type: String, required:true},
   // type : {type: String, required:true},
    code :{type: String, required:true},
    //image: {type: String , required:true},
   // allDoctors: [{type: mongoose.Schema.Types.ObjectId, ref: 'doctors'}],
}, {timestamps: true});
//Le modèle permet d'effectuer des opérations CRUD (Create, Read, Update, Delete) 
//sur la collection Doctor dans la base de données MongoDB.
const patient = mongoose.model("Patients", patientSchema);

export default patient;