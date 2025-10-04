"use client";

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:4000/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                router.push('/signin');
                router.refresh(); // Refresh to clear any cached data
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
            Logout
        </button>
    );
}