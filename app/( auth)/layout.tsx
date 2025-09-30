import React from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100">
            {/* Fixed banner at top - no scrolling */}
            <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4">
                <div className="text-center">
                    <p className="text-sm font-medium">
                        🚀 Welcome to our platform • Secure Authentication • Join us today! 🔒
                    </p>
                </div>
            </div>

            {/* Content area */}
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-2xl">
                    {children}
                </div>
            </div>
        </div>
    );
}