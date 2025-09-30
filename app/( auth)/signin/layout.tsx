import React from 'react';

export default function SignInLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full">
            {/* Extra promotional banner - only for signin */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 mb-2 rounded-lg">
                <p className="text-xs font-medium animate-pulse">
                    🎉 Limited Time: Sign in now and unlock exclusive features!
                </p>
            </div>
            
            {/* Discount banner - only for signin */}
            <div className="bg-blue-600 text-white text-center py-2 mb-4 rounded-lg">
                <p className="text-xs font-medium">
                    Join today and get 20% off with code{' '}
                    <span className="font-bold">NEW20</span>
                </p>
            </div>
            
            {/* Signin content */}
            {children}
        </div>
    );
}