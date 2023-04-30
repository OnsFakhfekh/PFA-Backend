import isEmpty from './isEmpty.js';
import validator from 'validator';

export default function ValidatePatient(Data){
    let errors = {};
  Data.Email = !isEmpty(data.Email) ? data.Email : ""
  Data.name = !isEmpty(data.name) ? data.name : ""
  Data.password = !isEmpty(data.password) ? data.password : ""
  Data.numTel = !isEmpty(data.numTel) ? data.numTel : ""
  Data.genre = !isEmpty(data.genre) ? data.genre : ""
  Data.naissance = !isEmpty(data.naissance) ? data.naissance : ""
  Data.code = !isEmpty(data.code) ? data.code : ""

  if(!validator.isEmail(data.Email)){
    errors.Email   = "Format Email Required "
  }  
  if(validator.isEmpty(data.Email)){
    errors.Email   = "Required Email"
  }
  if(validator.isEmpty(data.name)){
    errors.name   = "Required Name"
  }
  if(validator.isEmpty(data.password)){
    errors.password   = "Required Password"
  }
  if(validator.isEmpty(data.numTel)){
    errors.numTel   = "Required Numero de telephone"
  }
  if(validator.isEmpty(data.genre)){
    errors.genre   = "Required Gender"
  }
  if(validator.isEmpty(data.naissance)){
    errors.naissance   = "Required Date de Naissance"
  }
  if(validator.isEmpty(data.code)){
    errors.code   = "Required Code du patient"
  }
  return {
    errors ,
    isValid: isEmpty(errors)
  }
}