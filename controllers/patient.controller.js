import Patient from '../mongodb/models/patient.js';
import ValidatePatient from '../validation/Patient.Validation.js'
const createPatient = async (req, res) => {
    const { errors, isValid } = ValidatePatient(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        }
        else {
            Patient.findOne({ email: req.body.email })
                .then(async(exist) => {
                    if (exist) {
                        errors.Email = "Patient already Exist"
                        res.status(404).json(errors)
                    } else {
                        await Patient.create(req.body)
                        res.status(201).json({ message: 'Patient added with success' });
                    }
                });
            }
        } catch (error) {
            console.log(message.error);
        }
    };

    const getAllPatients = async (req, res) => {
        try {
            const data = await Patient.find()
            res.status(201).json(data)
        } catch (error) {
            consol.log(error.message)
        }
    };

    const getPatientInfoByID = async (req, res) => {
        try {
            const data = await Patient.findOne({ _id: req.params.id })
            res.status(201).json(data)
        } catch (error) {
            console.log(error.message)
        }
    };

    const updatePatient = async (req, res) => {
        const { errors, isValid } = ValidatePatient(req.body)
        try {
            if (!isValid) {
                res.status(404).json(errors)
            }else{
                const data = await Patient.findOneAndUpdate(
                    { _id: req.params.id },
                    req.body,
                    { new: true }
                )
                res.status(201).json(data)
            }
            
        } catch (error) {
            console.log(error.message)
        }
    };

    const deletePatient = async (req, res) => {
        try {
            await Patient.deleteOne({ _id: req.params.id })
            res.status(201).json({ message: "Patient deleted with success" })
        } catch (error) {
            consol.log(error.message)
        }
    };

    export {
        getAllPatients,
        createPatient,
        getPatientInfoByID,
        updatePatient,
        deletePatient,
    }