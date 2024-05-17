import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";

export async function PUT(request, { params }){
    const { id } = params;

    const { 
        newName: name, 
        newRole: role, 
        newDepartment: department, 
        newAdmissionDate: admissionDate 
    } = await request.json();

    await connectMongoDB();

    await Employee.findByIdAndUpdate( id, { 
        name, 
        role, 
        department, 
        admissionDate 
    });
    
    return NextResponse.json({ 
        message: "Funcionário editado com sucesso!",
        description: "Bom trabalho." 
    }, { status: 200 });
}

export async function GET(request, { params }){
    const { id } = params;

    await connectMongoDB();

    const employee = await Employee.findOne({ _id: id });

    return NextResponse.json({ employee }, { status: 200 });
}