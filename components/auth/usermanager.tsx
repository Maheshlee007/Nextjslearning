// UserManager.jsx - Basic React component
import React, { useState } from 'react';
import axios from 'axios';

function UserManager() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });

    // Basic login
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.post('http://localhost:4000/signin', loginData, {
                withCredentials: true  // ✅ Include cookies
            });
            
            alert('Login successful!');
            console.log('Response:', response.data);
            
        } catch (error: any) {
            alert('Login failed: ' + error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    // Basic get users
    const fetchUsers = async () => {
        setLoading(true);
        
        try {
            const response = await axios.get('http://localhost:4000/users', {
                withCredentials: true  // ✅ Send cookies
            });
            
            setUsers(response.data);
            
        } catch (error: any) {
            if (error.response.status === 401) {
                alert('Please login first!');
            } else {
                alert('Error: ' + error.response.data.error);
            }
        } finally {
            setLoading(false);
        }
    };

    // Basic logout
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:4000/logout', {}, {
                withCredentials: true  // ✅ Send cookies
            });
            
            setUsers([]);
            alert('Logged out successfully!');
            
        } catch (error) {
                // @ts-ignore
                alert('Logout error: ' + error.response.data.error);
            }
        };

        return (
        <div>
            {/* Login Form */}
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Username"
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {/* Actions */}
            <div>
                <button onClick={fetchUsers} disabled={loading}>
                    Get Users
                </button>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Users List */}
            <div>
                {users.map((user:any) => (
                    <div key={user.id}>
                        {user.name} - {user.email}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserManager;