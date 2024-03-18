import Employee from '../models/employee.model.js';

export const createemployee = async (req, res, next) => {
    console.log(req.body);
    const {ename, eemail, emobile, edesignation, egender, ecourse, eimage} = req.body;
    if(!ename || !eemail || !emobile || !edesignation || !egender || !ecourse || !eimage){
        return res.status(400).json({"message" : "All fiels required"});
    }
    const validateEmail = (eemail) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(eemail);
    };
    if(!validateEmail(eemail)){
        return res.status(400).json({"message" : "Enter a valid email"});
    }
    const regex = /[a-zA-Z]/;
    const containsAlphabet = regex.test(emobile);
    if(containsAlphabet || emobile.length < 10 || emobile.length > 10){
        return res.status(400).json({"message" : "Enter a valid mobile number"});
    }
    const newEmployee = new Employee({ename, eemail, emobile, edesignation, egender, ecourse, eimage});
        try {
            await newEmployee.save();
            res.status(201).json({ message: 'Employee created successfully' });
          } catch (error) {
            res.status(400).json({"message" : 'error occured'})
          }
}

export const getEmployees = async (req, res, next) => {
    try {
        const data = await Employee.find();
        res.status(200).json(data);
      } catch (error) {
        res.status(400).json({"message" : 'error occured'})
      }
}

export const getEmployee= async(req, res, next) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findById(employeeId);
        if (!employee) {
          return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }
        res.json({employee});
      } catch (error) {
        next(error)
      }
}

export const editEmployee = async (req, res, next) => {
  const {ename, eemail, emobile, edesignation, egender, ecourse, eimage} = req.body;
  if(!ename || !eemail || !emobile || !edesignation || !egender || !ecourse || !eimage){
    return res.status(400).json({"message" : "All fiels required"});
}
const validateEmail = (eemail) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(eemail);
};
if(!validateEmail(eemail)){
  return res.status(400).json({"message" : "Enter a valid email"});
}
const regex = /[a-zA-Z]/;
const containsAlphabet = regex.test(emobile);
if(containsAlphabet || emobile.length < 10 || emobile.length > 10){
  return res.status(400).json({"message" : "Enter a valid mobile number"});
}
    try{
      const editedEmployee = await Employee.findByIdAndUpdate(req.params.id,{
        $set: {
            ename: req.body.ename,
            eemail: req.body.eemail,
            emobile: req.body.emobile,
            edesignation: req.body.edesignation,
            egender: req.body.egender,
            ecourse: req.body.ecourse,
            eimage: req.body.eimage,
           },
      }, { new: true})
    
      res.status(200).json(editedEmployee)
    }catch(error){
      console.log(error.message);
        res.status(400).json({"message" : "error occured"})
    }
  }


  export const deleteEmployee = async (req, res, next) => {
    try{
      await Employee.findByIdAndDelete(req.params.id);
      res.status(200).json('Vehicle has been deleted');
    }catch(error){
        return res.status(404).json({ success: false, message: 'error occured' });
  }
  }