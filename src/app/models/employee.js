import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
    {
        name: String,
        role: String,
        department: String,
        admissionDate: Date
    },
    {
        timestamps: true,
    }
);

const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;