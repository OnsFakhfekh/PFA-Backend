import  express  from 'express';
import doctor from '../mongodb/models/doctor.js';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
/*import {
    createDoctor,   getAllDoctors , getDoctorInfoByID , deleteDoctor , updateDoctor,
} from '../controllers/doctor.controller.js';*/

const router = express.Router();
let filename = '';

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
// Doctor CRUD

router.post('/registerDoctor', async(req,res)=>{
  const data = req.body;
  const doc = new doctor(data);
  const salt = bcrypt.genSaltSync(10);
  const cryptedPass = await bcrypt.hashSync(data.password , salt);
  doc.password = cryptedPass;
  doc.save()
  .then(
    (saved)=>{
      res.status(200).send(saved)
    }
  )
  .catch(
    (err)=>{
      res.status(400).send(err);
    }
  )
})

router.post('/createDoctor', async(req,res)=>{
    try {
    const data = req.body;
    const doc = new doctor(data);
    doc.image = filename;
    const savedDoctor = await doc.save();
    filename = '';
    res.status(200).send(savedDoctor)
    } catch (error) {
      res.status(400).send(error)
    }
   } )

   router.post('/logindoctor', async(req,res)=> {
    const data = req.body;
    const doc = await doctor.findOne({ email : data.email })
    if(!doc){
      res.status(404).send(' email or password invalid !')
    }else{
      const  validPass = bcrypt.compareSync(data.password , doc.password )
      if(!validPass){
        res.status(401).send(' email or password invalid ! ')
      }else{
        const payload = {
          _id: doc._id,
          email: doc.email,
          name: doc.name
        }
         const token = jwt.sign(payload , '1234567')
        res.status(200).send({ mytoken : token })
      }
    }
  })

  router.get('/getalldoctors', async(req,res)=> {
  try {
   const doctors = await doctor.find();
    res.status(200).send(doctors);
  } catch (error) {
    res.status(400).send(error);
  }
  })

  router.get('/getdoctorsByCondition', async(req,res)=> {
    try {
     const doctors = await doctor.find({name:'Ons Fakhfekh'});
      res.status(200).send(doctors);
    } catch (error) {
      res.status(400).send(error);
    }
    })

    router.get('/doctorbyid/:id', async(req,res)=>{
      try {
        const id = req.params.id;
        const doctorUser = await doctor.findById({_id: id});
       res.status(200).send(doctorUser);
      } catch (error) {
        res.status(400).send(error);
      }
    })
  router.put('/updateDoctor/:id', async(req,res)=> {
    try {
      const id = req.params.id;
      const newDoc = req.body;
      const docUpdated = await doctor.findByIdAndUpdate({ _id: id}, newDoc);
      res.status(200).send(docUpdated);
    } catch (error) {
      res.status(400).send(error);
    }
  })

  router.delete('/deleteDoctor/:id', async(req,res)=>{
   try {
    const id = req.params.id;
    const deletedDoctor = await doctor.findByIdAndDelete({_id:id});
    res.status(200).send(deletedDoctor);
   } catch (error) {
    res.status(400).send(error);
   }
  })

/*router.route('/').post(createDoctor);
router.route('/').get(getAllDoctors);
router.route('/:id').get(getDoctorInfoByID);
router.route('/:id').delete(deleteDoctor);
router.route('/:id').put(updateDoctor);*/

export default router;