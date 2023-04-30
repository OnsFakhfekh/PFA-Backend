import mongoose from "mongoose";

const connectDB = (url) => {//la fonction connectDB est définie avec un seul paramètre url
// la méthode mongoose.set() est appelée pour définir la valeur de l'option 'strictQuery' sur true
   mongoose.set('strictQuery', true);//Cela force Mongoose à appliquer des règles de validation strictes lors de l'utilisation de certaines méthodes de requête, telles que find() et update().
   //verifier si la cnx à la BD est etablie ou nn
   mongoose.connect(url) 
     .then(() => console.log('MongoDB connected'))
     .catch((error) => console.log(error)); 
}

export default connectDB; 