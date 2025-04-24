"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { ArrowLeft, UserPlus, Home } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createStudent } from "@/app/actions/student"
import { Student } from "@/app/generated/prisma"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/custom/Navbar"

const formSchema = z.object({
    firstname: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastname: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    studentid: z.string().min(1, { message: "Student ID is required." }),
    isActive: z.boolean().optional(),
    remarks: z.string().optional(),
})

export default function CreateStudent() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            studentid: "",
            isActive: true,
            remarks: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        await createStudent(values as Student)
        form.reset()
        toast.success("Student added successfully!")
        router.push("/student/list")

    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-3 mb-8 justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <UserPlus className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Add New Student</h1>
                            <p className="text-sm text-gray-500 mt-1">Create a new student record in the system</p>
                        </div>
                    </div>

                    <div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/student/list" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to List
                            </Link>
                        </Button>
                    </div>
                </div>

                <Card className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter first name"
                                                    className="rounded-lg"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter last name"
                                                    className="rounded-lg"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="studentid"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Student ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter student ID"
                                                className="rounded-lg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="remarks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Remarks</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter any remarks (optional)"
                                                className="rounded-lg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Add Student
                                </Button>

                            </div>
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    )
}
