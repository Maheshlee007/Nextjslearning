"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

export default function UsersPageClient() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            
            const res = await fetch('http://localhost:4000/users', {
                method: 'GET',
                credentials: 'include', // This includes cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });

            if (!res.ok) {
                if (res.status === 401) {
                    router.push('/signin');
                    return;
                }
                throw new Error('Failed to fetch users');
            }

            const data = await res.json();
            setUsers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse">
                    <h1 className="text-2xl font-bold mb-4">Loading Users...</h1>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 border rounded-lg bg-gray-100 h-20"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
                <p className="mb-4">{error}</p>
                <button 
                    onClick={fetchUsers}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Users List (Client-Side)</h1>
                <button 
                    onClick={fetchUsers}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Refresh
                </button>
            </div>
            
            <div className="grid gap-4">
                {users.map((user) => (
                    <div key={user.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-400">
                            Created: {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
            
            {users.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-600">No users found</p>
                </div>
            )}
        </div>
    );
}