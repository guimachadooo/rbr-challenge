import mongoose, { Schema } from "mongoose";

//cria a tabela de funcionarios com os campos solicitados
const employeeSchema = new Schema(
  {
    name: String,
    role: String,
    department: String,
    admissionDate: Date,
  },
  {
    timestamps: true,
  }
);

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
