
import ValidateDoctor from '../validation/Doctor.Validation.js'
const Doctor = require('./mongodb/models/doctor');
const createDoctor = async (req, res) => {
    const { errors, isValid } = ValidateDoctor(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        }
        else {
            Doctor.findOne({ email: req.body.email })
                .then(async(exist) => {
                    if (exist) {
                        errors.Email = "Doctor already Exist"
                        res.status(404).json(errors)
                    } else {
                        await Doctor.create(req.body)
                        res.status(201).json({ message: 'doctor added with success' });
                    }
                });
            }
        } catch (error) {
            console.log(message.error);
        }
    };

    const getAllDoctors = async (req, res) => {
        try {
            const data = await Doctor.find()
            res.status(201).json(data)
        } catch (error) {
            consol.log(error.message)
        }
    };

    const getDoctorInfoByID = async (req, res) => {
        try {
            const data = await Doctor.findOne({ _id: req.params.id })
            res.status(201).json(data)
        } catch (error) {
            console.log(error.message)
        }
    };

    const updateDoctor = async (req, res) => {
        const { errors, isValid } = ValidateDoctor(req.body)
        try {
            if (!isValid) {
                res.status(404).json(errors)
            }else{
                const data = await Doctor.findOneAndUpdate(
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

    const deleteDoctor = async (req, res) => {
        try {
            await Doctor.deleteOne({ _id: req.params.id })
            res.status(201).json({ message: "doctor deleted with success" })
        } catch (error) {
            consol.log(error.message)
        }
    };

    export {
        getAllDoctors,
        createDoctor,
        getDoctorInfoByID,
        updateDoctor,
        deleteDoctor,
    }