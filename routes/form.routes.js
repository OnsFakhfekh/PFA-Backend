import  express  from 'express';
import Form from '../mongodb/models/form.js';
import patient from '../mongodb/models/patient.js';
import doctor from '../mongodb/models/doctor.js';

const router = express.Router();

/*ces références seront automatiquement remplacées par les documents réels correspondants lors de l'exécution
 de la méthode populate()
Form.findById(formId).populate('autor destination').exec((err, form) => {
    if (err) {
      console.error(err);
    } else {
      console.log(form);
    }
  });*/

  router.post('/submit-form/:idPat/:idDoc', async (req, res) => {
    try {
      const { idPat, idDoc } = req.params; // destructuring des paramètres
      const patientData = await patient.findById(idPat); // Récupération du patient correspondant à l'ID
      const doctorData = await doctor.findById(idDoc); // Récupération du médecin correspondant à l'ID
      const values = req.body;
      const data = {
        values: values,
        author: patientData, // utilisation des données récupérées pour les champs author et destination
        destination: doctorData,
      };
  
      console.log(values);
      console.log(patientData);
      console.log(doctorData);
      console.log(data);
  
      const form = new Form(data);
      const savedForm = await form.save();
      res.status(200).send(savedForm);
      console.log('form saved with success!');

    } catch (error) {
      console.error(error); // affichage de l'erreur dans la console
      res.status(400).send(error);
    }
  });
  
  
  export default router;

