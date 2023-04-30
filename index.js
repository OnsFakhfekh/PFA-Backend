import express from 'express' ;//create routes for our application
//import * as dotenv from 'dotenv' ;//to use environment variables
import cors from 'cors' ;//for cross origin requests 
import bodyParser from 'body-parser';
import connection from './mongodb/connect.js'
import connectDB from './mongodb/connect.js';
//import doctorRouter from './routes/doctor.routes.js'
//import patientRouter from './routes/patient.routes.js'
//dotenv.config();
import doctorRoute from './routes/doctor.routes.js';
import patientRoute from './routes/patient.routes.js';
import notifRoute from './routes/notif.routes.js';
import formRoute from './routes/form.routes.js';


const app = express(); //initialize our app
app.use(cors());//adding middleware to our app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

app.use('/doctor',doctorRoute );
app.use('/patient',patientRoute );
app.use('/notifications',notifRoute );
app.use('/forms',formRoute );
 //exporter l'image
 app.use('/getimage', express.static('./uploads')); 
 
//app.use('api/v1/doctors',doctorRouter);
//app.use('api/v1/patients',patientRouter);


const startServer = async ()  => {   
    try {
         connectDB('mongodb://127.0.0.1:27017/medical');
         
          
           
         app.listen(4000, () => console.log('server started on port http://localhost:4000'));

    } catch (error) {
       console .log(error); 
    }
}

startServer();