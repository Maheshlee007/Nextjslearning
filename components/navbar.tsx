"use client"
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-800">
                            Your Logo
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            Home
                        </Link>
                        <Link href="/about" className="text-gray-600 hover:text-gray-900">
                            About
                        </Link>
                        <Link href="/services" className="text-gray-600 hover:text-gray-900">
                            Services
                        </Link>
                        <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                            Contact
                        </Link>
                    </div>

                    {/* Mobile Navigation Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            className="outline-none mobile-menu-button"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg
                                className="w-6 h-6 text-gray-500"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link
                                href="/"
                                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                            >
                                About
                            </Link>
                            <Link
                                href="/services"
                                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                            >
                                Services
                            </Link>
                            <Link
                                href="/contact"
                                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar