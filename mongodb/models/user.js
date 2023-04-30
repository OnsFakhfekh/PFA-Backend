import mongoose from "mongoose";
//Le schéma définit les propriétés que chaque objet Doctor doit avoir
const userSchema = new mongoose.Schema({
    name: { type: String, required:true},
    email: { type: String, required:true,unique:true},
    password:{type: String, required:true },
    type : {type: String, required:true},
 
}, {timestamps: true});
//Le modèle permet d'effectuer des opérations CRUD (Create, Read, Update, Delete) 
//sur la collection Doctor dans la base de données MongoDB.
const user = mongoose.model("Users", userSchema);

export default user;