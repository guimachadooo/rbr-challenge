import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";

export async function GET(){
    await connectMongoDB();

    const employees = await Employee.find();

    return NextResponse.json({ employees });
}

export async function POST(request){
    const { name, role, department, admissionDate } = await request.json();

    await connectMongoDB();

    await Employee.create({ 
        name, 
        role, 
        department, 
        admissionDate 
    });
    
    return NextResponse.json({ 
        message: "Funcionário adicionado com sucesso!",
        description: "Bom trabalho." 
    }, { status: 201 });
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");

    await connectMongoDB();
    await Employee.findByIdAndDelete(id);

    return NextResponse.json({ message: "Employee removed successfully"}, { status: 200 });
}