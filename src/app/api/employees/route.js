import Employee from "@/models/employee";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

//lista todos os funcionarios
export async function GET() {
  await connectMongoDB();

  const employees = await Employee.find();

  return NextResponse.json({ employees });
}

//cria um novo funcionario
export async function POST(request) {
  const { name, role, department, admissionDate } = await request.json();

  await connectMongoDB();

  await Employee.create({
    name,
    role,
    department,
    admissionDate,
  });

  return NextResponse.json(
    {
      message: "Funcionário adicionado com sucesso!",
      description: "Bom trabalho.",
    },
    { status: 201 }
  );
}

//remove um funcionario
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB();
  await Employee.findByIdAndDelete(id);

  return NextResponse.json(
    {
      message: "Funcionário removido com sucesso!",
      description: "When I see you again... 🎶",
    },
    { status: 200 }
  );
}
