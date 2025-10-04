import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Server Component - runs on server side
export default async function UsersPageSSR() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');

        if (!token) {
            redirect('/signin');
        }

        // Make API call from server with the token
        const res = await fetch('http://localhost:4000/users', {
            method: 'GET',
            headers: {
                'Cookie': `token=${token.value}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            if (res.status === 401) {
                redirect('/signin');
            }
            throw new Error('Failed to fetch users');
        }

        const users = await res.json();

        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Users List (Server-Side)</h1>
                <div className="grid gap-4">
                    {users.map((user: any) => (
                        <div key={user.id} className="p-4 border rounded-lg">
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-400">
                                Created: {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
                <p>Failed to load users. Please try again.</p>
                <a href="/signin" className="text-blue-600 underline">Go to Sign In</a>
            </div>
        );
    }
}