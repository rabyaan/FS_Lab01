"use server";

import prisma from "@/lib/prisma";
import { Student } from "../generated/prisma"

export async function createStudent(data: Student) {
    await prisma.student.create({
        data: { 
            firstname: data.firstname,
            lastname: data.lastname,
            studentid: data.studentid,
            isActive: data.isActive,
            remarks: data.remarks,
        },
    }); 
}

export async function getStudents() {
    const students = await prisma.student.findMany({
        where: {
            isActive: true,
        }
    });
    return students;
  }


export async function getStudentById(_id: number) {
    const student = await prisma.student.findUnique({
        where: {
            id: _id,
        },
    });
    return student;
}


export async function deleteStudent(_id: number) {
    await prisma.student.delete({
        where: {
            id: _id,
        },
    });
}