import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import { Button, Input } from '@nextui-org/react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password });
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <Input isClearable variant="underlined" label="Username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <Input isClearable variant="underlined" label="Password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" className="mt-4">Login</Button>
      </form>
    </div>
  );
};

export default Login;
