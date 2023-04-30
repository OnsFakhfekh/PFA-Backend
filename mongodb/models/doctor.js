import mongoose from "mongoose";
//Le schéma définit les propriétés que chaque objet Doctor doit avoir
const DoctorSchema = new mongoose.Schema({
    name: { type: String, required:true},
    email: { type: String, required:true,unique:true},
    password:{type: String, required:true },
    //age : { type: String, required:true},
    dateDeNaissance : {type: String, required:true},
    numTel : {type: String, required:true},
    Genre : {type: String, required:true},
   // type : {type: String, required:true},
    adresse :{type: String, required:true},
    specialite :{type: String, required:true},
    code :{type: String, required:true},
    //avatar: {type: String , required:true},
    allPatients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Patients'}],
}, {timestamps: true});
//Le modèle permet d'effectuer des opérations CRUD (Create, Read, Update, Delete) 
//sur la collection Doctor dans la base de données MongoDB. 

const doctor = mongoose.model("doctors", DoctorSchema);

export default doctor;