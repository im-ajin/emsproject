import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    ename: {
      type: String,
      required: true,
    },
    emobile: {
        type: String,
        required: true,
        unique: true,
    },
    eemail: {
        type: String,
        required: true,
        unique: true,
      },
    edesignation: {
        type: String,
        required: true,
      },
      egender: {
        type: String,
        required: true,
      },
      ecourse: {
        type: String,
        required: true,
      },
      eimage: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
