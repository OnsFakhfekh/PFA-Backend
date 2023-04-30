import  express  from 'express';
import patient from '../mongodb/models/patient.js';
import multer from 'multer';
import bcrypt from 'bcrypt';
/*import {
   
    createPatient,   getAllPatients , getPatientInfoByID , deletePatient , updatePatient,
} from '../controllers/patient.controller.js';*/

let filename = '';
const router = express.Router();
const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file , redirect)=>{
        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1];
        redirect(null, fl );
        filename = fl;
    }
})
const upload = multer({storage: mystorage})
// Patient CRUD 

router.post('/registerPatient', async(req,res)=>{
  const data = req.body;
  const pat = new patient(data);
  const salt = bcrypt.genSaltSync(10);
  const cryptedPass = await bcrypt.hashSync(data.password , salt);
  pat.password = cryptedPass;
  pat.save()
  .then(
    (saved)=>{
      res.status(200).send(saved)
    }
  )
  res.redirect("/loginpatient")
  .catch(
    (err)=>{
      res.status(400).send(err);
      res.redirect("/registerPatient")
    }
  )
})

router.post('/createPatient', upload.any('image'),async(req,res)=>{
    try {
    const data = req.body;
    const pat = new patient(data);
    pat.image = filename;
    const savedpatient = await pat.save();
    filename = '';
    res.status(200).send(savedpatient)
    } catch (error) {
      res.status(400).send(error)
    }
   } )
  
router.post('/loginpatient', async(req,res)=> {
  const data = req.body;
  const pat = await patient.findOne({ email : data.email })
  if(!pat){
    res.status(404).send(' email or password invalid !')
  }else{
    const validPass = bcrypt.compareSync(data.password , pat.password )
    if(!validPass){
      res.status(401).send(' email or password invalid ! ')
    }else{
      payload = {
        _id: pat._id,
        email: pat.email,
        name: pat.name
      }
      const token = jwt.sign(payload , '1234567')
      res.status(200).send({ mytoken : token })
    }
  }
})

  router.get('/getallpatients', async(req,res)=> {
  try {
   const patients = await patient.find();
    res.status(200).send(patients);
  } catch (error) {
    res.status(400).send(error);
  }
  })
  
  router.get('/getpatientsByCondition', async(req,res)=> {
    try {
     const patients = await patient.find({name:'Ons Fakhfekh'});
      res.status(200).send(patients);
    } catch (error) {
      res.status(400).send(error);
    }
    })
  
    router.get('/patientbyid/:id', async(req,res)=>{
      try {
        const id = req.params.id;
        const patientUser = await patient.findById({_id: id});
       res.status(200).send(patientUser);
      } catch (error) {
        res.status(400).send(error);
      }
    })
  router.put('/updatePatient/:id', async(req,res)=> {
    try {
      const id = req.params.id;
      const newPat = req.body;
      const patUpdated = await patient.findByIdAndUpdate({ _id: id}, newPat);
      res.status(200).send(patUpdated);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  
  router.delete('/deletePatient/:id', async(req,res)=>{
   try {
    const id = req.params.id;
    const deletedPatient = await patient.findByIdAndDelete({_id:id});
    res.status(200).send(deletedPatient);
   } catch (error) {
    res.status(400).send(error);
   }
  })

/*router.route('/').post(createPatient);
router.route('/').get(getAllPatients);
router.route('/:id').get(getPatientInfoByID);
router.route('/:id').delete(deletePatient);
router.route('/:id').put(updatePatient);*/

export default router;