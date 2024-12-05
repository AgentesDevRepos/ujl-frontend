"use client"

import React, { useState } from 'react';
import EyeOpenIcon from '../icons/EyeOpenIcon';
import EyeClosedIcon from '../icons/EyeClosedIcon';
import Notification from '../Notification';
import { signIn } from 'next-auth/react';

interface FormErrors {
    email?: string;
    password?: string;
}

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const validateForm = () => {
        const newErrors: FormErrors = {};
        
        if (!email) {
            newErrors.email = 'O email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email inválido';
        }

        if (!password) {
            newErrors.password = 'A senha é obrigatória';
        } else if (password.length < 6) {
            newErrors.password = 'A senha deve ter no mínimo 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ email: true, password: true });
        
        if (validateForm()) {
            try {
                const result = await signIn('credentials', {
                    email,
                    password,
                });

                if (result?.error) {
                    setNotification({ message: result.error, type: 'error' });
                } else {
                    setNotification({ message: 'Login realizado com sucesso', type: 'success' });
                }
            } catch (error) {
                setNotification({ message: 'Erro na requisição', type: 'error' });
            }
        }
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateForm();
    };

    return (
        <div className="bg-[#1E2328] min-h-screen flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <div className="flex justify-center mb-6">
                    <img src="/images/logo.png" alt="Logo" className="p-3 w-40 h-auto" />
                </div>
                <h2 className="text-center text-black text-xl font-bold mb-4">Bem-vindo de volta</h2>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => handleBlur('email')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.email && errors.email 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.email && errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>
                <div className="mb-6 relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => handleBlur('password')}
                        className={`w-full p-2 border rounded text-black pr-10 ${
                            touched.password && errors.password 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        {showPassword ? (
                            <EyeClosedIcon onClick={() => setShowPassword(false)} />
                        ) : (
                            <EyeOpenIcon onClick={() => setShowPassword(true)} />
                        )}
                    </div>
                    {touched.password && errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-[#FFC700] text-black w-full py-2 rounded font-bold hover:bg-yellow-500 transition-colors duration-200"
                >
                    Entrar
                </button>
                <div className="text-center mt-4">
                    <a href="#" className="text-[#FFC700]">Esqueceu sua senha?</a>
                </div>
                <div className="text-center mt-2">
                    <span className="text-black">Não é cadastrado? </span>
                    <a href="/signup" className="text-[#FFC700]">Crie uma conta</a>
                </div>
            </form>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
}

export default Login;
