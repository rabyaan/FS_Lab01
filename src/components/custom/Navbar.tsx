import { Home, School } from 'lucide-react'
import React from 'react'
import Link from 'next/link'  // Assuming you're using Next.js for routing
import { Button } from '../ui/button'

export default function Navbar() {
    return (
        <div className="bg-white border-b">
            <div className="max-w-7xl flex justify-center mx-auto px-4 ">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/" passHref>
                                <span className="flex items-center gap-2">
                                    <School className="h-4 w-4" />
                                    Student Management System
                                </span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
