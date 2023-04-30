import  express  from 'express';
import notification from '../mongodb/models/notif.js';
import Form from '../mongodb/models/form.js';

const router = express.Router();


router.post('/registerNotifications/:formId', async (req, res) => {
  try {
    const formId = req.params.formId;
    const FRM = await Form.findById(formId);
    const valuesString = FRM.values.get('values');
    const values = JSON.parse(valuesString);
    console.log(values);
    const keys  = Object.keys(valuesString);;
    console.log(keys);
    let notifType = null;
    for (const key in keys) {
      console.log(key);
      const value = Object.values(valuesString);
      console.log(value);
      switch (key) {
        case 'bloodPressure':
          if (value > 140 || value < 90) {
            notifType = 'urgent-notification';
          }
          break;
        case 'glucoseLevel':
          if (value > 180 || value < 70) {
            notifType = 'urgent-notification';
          }
          break;
        case 'oxygenSaturation':
          if (value < 97) {
            notifType = 'urgent-notification';
          }
          break;
        default:
          break;
      }
    }
    if (notifType === null) {
      notifType = 'normal-notification';
    }
    const dataNotif = {
      type: notifType,
      formId: FRM._id,
    };
    const notif = new notification(dataNotif);
    const savedNotif = await notif.save();
    res.status(200).send(savedNotif);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get('/getUrgentNotificationsBydoctor/:doctorId', async(req, res) => {
 
  try {
    const doctorId = req.params.doctorId;
    const FormsOfDoctor = await Form.find({ destination: doctorId }).sort({ timestamp: -1 });
    
    const formIds = FormsOfDoctor.map(form => form._id);
    const notifsofDoctor = await notification.find({formId: { $in: formIds } });
    const notifsUrgent =  notification.find({ _id: { $in: notifsofDoctor }, type: 'normal-notification' });
     res.status(200).send(notifsUrgent);
   } catch (error) {
     res.status(400).send(error);
   }
   });
     



  

router.get('/normalNotifications/:doctorId', (req, res) => {

    const doctorId = req.params.doctorId;
    Form.find({ destination: doctorId })
      .sort({ timestamp: -1 }) //tri decroissante 
      .exec((err, notifications) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.json(notifications);
        }
      });
  });
  
  export default router;
  