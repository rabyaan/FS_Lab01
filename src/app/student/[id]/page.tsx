import { notFound } from "next/navigation"
import { getStudentById } from "@/app/actions/student"
import { ArrowLeft, BadgeCheck, Ban, StickyNote, User, Calendar, Mail, Phone, Home } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/custom/Navbar"
import { Student } from "@/app/generated/prisma"

interface StudentPageProps {
    params: {
        id: string
    }
}

export default async function StudentPage({ params }: StudentPageProps) {
    if (!params?.id) return notFound()

    const student = await getStudentById(Number(params.id))

    if (!student) return notFound()

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
                        <p className="text-sm text-gray-500 mt-1">View and manage student information</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Summary Card */}
                    <Card className="p-6 lg:col-span-1 flex justify-center items-center">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                                <span className="text-3xl font-bold text-white">
                                    {student.firstname[0]}{student.lastname[0]}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">
                                {student.firstname} {student.lastname}
                            </h2>
                            <p className="text-sm text-gray-500 mb-4">Student ID: {student.studentid}</p>
                            <div className={`px-4 py-1 rounded-full text-sm font-medium ${student.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}>
                                {student.isActive ? "Active" : "Inactive"}
                            </div>
                        </div>
                    </Card>

                    {/* Details Card */}
                    <Card className="p-6 lg:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem
                                icon={User}
                                label="First Name"
                                value={student.firstname}
                            />
                            <DetailItem
                                icon={User}
                                label="Last Name"
                                value={student.lastname}
                            />
                            <DetailItem
                                icon={Calendar}
                                label="Student ID"
                                value={student.studentid}
                            />
                            <DetailItem
                                icon={BadgeCheck}
                                label="Status"
                                value={student.isActive ? "Active" : "Inactive"}
                                valueClassName={student.isActive ? "text-green-600" : "text-red-600"}
                            />
                            <DetailItem
                                icon={StickyNote}
                                label="Remarks"
                                value={student.remarks || "No remarks"}
                                className="md:col-span-2"
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function DetailItem({
    icon: Icon,
    label,
    value,
    className = "",
    valueClassName = "text-gray-900"
}: {
    icon: any;
    label: string;
    value: string;
    className?: string;
    valueClassName?: string;
}) {
    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex items-center gap-2 text-gray-600">
                <Icon className="h-4 w-4" />
                <span className="text-md font-medium">{label}</span>
            </div>
            <p className={`text-sm font-semibold bg-gray-100 px-3 py-2 rounded-md ${valueClassName}`}>{value}</p>
        </div>
    )
}
