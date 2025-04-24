import { getStudents } from "@/app/actions/student"
import { Trash2, Eye, Plus, Users, Search, ArrowUpDown, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AlertDialog from "@/components/custom/Alert-Dialog"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/custom/Navbar"

export default async function ListStudents() {
    const students = await getStudents()

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <div>
                <Navbar />

            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Students</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage and view all students</p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href="/student/create" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Student
                        </Link>
                    </Button>
                </div>

                <Card>
                    <div className="p-6">
                       

                        <div className="overflow-x-auto rounded-lg border">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left py-3.5 px-4 text-sm font-medium text-gray-600">#</th>
                                        <th className="text-left py-3.5 px-4 text-sm font-medium text-gray-600">First Name</th>
                                        <th className="text-left py-3.5 px-4 text-sm font-medium text-gray-600">Last Name</th>
                                        <th className="text-left py-3.5 px-4 text-sm font-medium text-gray-600">Student ID</th>
                                        <th className="text-left py-3.5 px-4 text-sm font-medium text-gray-600">Status</th>
                                        <th className="text-left py-3.5 px-4 text-sm font-medium text-gray-600">Remarks</th>
                                        <th className="text-center py-3.5 px-4 text-sm font-medium text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {students.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="text-center py-10 px-4 text-sm text-gray-500"
                                            >
                                                No students found.
                                            </td>
                                        </tr>
                                    ) : (
                                        students.map((student, index) => (
                                            <tr
                                                key={student.id}
                                                className="hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="py-4 px-4 text-sm text-gray-600">{index + 1}</td>
                                                <td className="py-4 px-4 text-sm font-medium text-gray-900">
                                                    {student.firstname}
                                                </td>
                                                <td className="py-4 px-4 text-sm font-medium text-gray-900">
                                                    {student.lastname}
                                                </td>
                                                <td className="py-4 px-4 text-sm text-gray-600">
                                                    {student.studentid}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.isActive
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                        }`}>
                                                        {student.isActive ? "Active" : "Inactive"}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-sm text-gray-500">
                                                    {student.remarks || "-"}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="rounded-lg"
                                                            asChild
                                                        >
                                                            <Link href={`/student/${student.id}`}>
                                                                <Eye className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <AlertDialog id={student.id} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
