"use client"

import React, { useState } from 'react';
import EyeOpenIcon from '../icons/EyeOpenIcon';
import EyeClosedIcon from '../icons/EyeClosedIcon';
import Notification from '../Notification';

interface FormErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    cpf?: string;
    firstName?: string;
    lastName?: string;
    telefone?: string;
    dataNascimento?: string;
    instituicaoEnsino?: string;
    estado?: string;
    cidade?: string;
    nivelEnsino?: string;
    curso?: string;
    comoConheceu?: string;
    definicaoIdeologica?: string;
    outrosMovimentos?: string;
}

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        cpf: '',
        firstName: '',
        lastName: '',
        telefone: '',
        dataNascimento: '',
        instituicaoEnsino: '',
        estado: '',
        cidade: '',
        nivelEnsino: '',
        curso: '',
        comoConheceu: '',
        definicaoIdeologica: '',
        outrosMovimentos: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const validateForm = () => {
        const newErrors: FormErrors = {};
        if (!formData.username) newErrors.username = 'O nome de usuário é obrigatório';
        if (!formData.email) newErrors.email = 'O email é obrigatório';
        if (!formData.password) newErrors.password = 'A senha é obrigatória';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'A confirmação de senha é obrigatória';
        if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'As senhas não coincidem';
        if (!formData.cpf) {
            newErrors.cpf = 'O CPF é obrigatório';
        } else if (!/^\d{11}$/.test(formData.cpf)) {
            newErrors.cpf = 'O CPF deve conter 11 dígitos numéricos';
        }
        if (!formData.firstName) newErrors.firstName = 'O primeiro nome é obrigatório';
        if (!formData.lastName) newErrors.lastName = 'O sobrenome é obrigatório';
        if (!formData.telefone) newErrors.telefone = 'O telefone é obrigatório';
        if (!formData.dataNascimento) newErrors.dataNascimento = 'A data de nascimento é obrigatória';
        if (!formData.instituicaoEnsino) newErrors.instituicaoEnsino = 'A instituição de ensino é obrigatória';
        if (!formData.estado) newErrors.estado = 'O estado é obrigatório';
        if (!formData.cidade) newErrors.cidade = 'A cidade é obrigatória';
        if (!formData.nivelEnsino) newErrors.nivelEnsino = 'O nível de ensino é obrigatório';
        if (!formData.curso) newErrors.curso = 'O curso é obrigatório';
        if (!formData.comoConheceu) newErrors.comoConheceu = 'Este campo é obrigatório';
        if (!formData.definicaoIdeologica) newErrors.definicaoIdeologica = 'Este campo é obrigatório';
        if (!formData.outrosMovimentos) newErrors.outrosMovimentos = 'Este campo é obrigatório';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateForm();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({
            username: true,
            email: true,
            password: true,
            confirmPassword: true,
            cpf: true,
            firstName: true,
            lastName: true,
            telefone: true,
            dataNascimento: true,
            instituicaoEnsino: true,
            estado: true,
            cidade: true,
            nivelEnsino: true,
            curso: true,
            comoConheceu: true,
            definicaoIdeologica: true,
            outrosMovimentos: true
        });
        
        if (validateForm()) {
            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setNotification({ message: 'Cadastro realizado com sucesso', type: 'success' });
                } else {
                    setNotification({ message: 'Erro ao cadastrar', type: 'error' });
                }
            } catch (error) {
                setNotification({ message: 'Erro na requisição', type: 'error' });
            }
        }
    };

    return (
        <div className="bg-[#1E2328] min-h-screen flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <div className="flex justify-center mb-6">
                    <img src="/images/logo.png" alt="Logo" className="p-3 w-40 h-auto" />
                </div>
                <h2 className="text-center text-black text-xl font-bold mb-4">Crie sua conta</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Nome de Usuário"
                        value={formData.username}
                        onChange={handleChange}
                        onBlur={() => handleBlur('username')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.username && errors.username 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.username && errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
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
                <div className="mb-4">
                    <input
                        type="text"
                        name="cpf"
                        placeholder="CPF"
                        value={formData.cpf}
                        onChange={handleChange}
                        onBlur={() => handleBlur('cpf')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.cpf && errors.cpf 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.cpf && errors.cpf && (
                        <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Primeiro Nome"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={() => handleBlur('firstName')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.firstName && errors.firstName 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.firstName && errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Sobrenome"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={() => handleBlur('lastName')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.lastName && errors.lastName 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.lastName && errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="telefone"
                        placeholder="Telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        onBlur={() => handleBlur('telefone')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.telefone && errors.telefone 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.telefone && errors.telefone && (
                        <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="date"
                        name="dataNascimento"
                        placeholder="Data de Nascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        onBlur={() => handleBlur('dataNascimento')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.dataNascimento && errors.dataNascimento 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.dataNascimento && errors.dataNascimento && (
                        <p className="text-red-500 text-sm mt-1">{errors.dataNascimento}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="instituicaoEnsino"
                        placeholder="Instituição de Ensino"
                        value={formData.instituicaoEnsino}
                        onChange={handleChange}
                        onBlur={() => handleBlur('instituicaoEnsino')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.instituicaoEnsino && errors.instituicaoEnsino 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.instituicaoEnsino && errors.instituicaoEnsino && (
                        <p className="text-red-500 text-sm mt-1">{errors.instituicaoEnsino}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="estado"
                        placeholder="Estado"
                        value={formData.estado}
                        onChange={handleChange}
                        onBlur={() => handleBlur('estado')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.estado && errors.estado 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.estado && errors.estado && (
                        <p className="text-red-500 text-sm mt-1">{errors.estado}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="cidade"
                        placeholder="Cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                        onBlur={() => handleBlur('cidade')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.cidade && errors.cidade 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.cidade && errors.cidade && (
                        <p className="text-red-500 text-sm mt-1">{errors.cidade}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="nivelEnsino"
                        placeholder="Nível de Ensino"
                        value={formData.nivelEnsino}
                        onChange={handleChange}
                        onBlur={() => handleBlur('nivelEnsino')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.nivelEnsino && errors.nivelEnsino 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.nivelEnsino && errors.nivelEnsino && (
                        <p className="text-red-500 text-sm mt-1">{errors.nivelEnsino}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="curso"
                        placeholder="Curso"
                        value={formData.curso}
                        onChange={handleChange}
                        onBlur={() => handleBlur('curso')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.curso && errors.curso 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.curso && errors.curso && (
                        <p className="text-red-500 text-sm mt-1">{errors.curso}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="comoConheceu"
                        placeholder="Como Conheceu"
                        value={formData.comoConheceu}
                        onChange={handleChange}
                        onBlur={() => handleBlur('comoConheceu')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.comoConheceu && errors.comoConheceu 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.comoConheceu && errors.comoConheceu && (
                        <p className="text-red-500 text-sm mt-1">{errors.comoConheceu}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="definicaoIdeologica"
                        placeholder="Definição Ideológica"
                        value={formData.definicaoIdeologica}
                        onChange={handleChange}
                        onBlur={() => handleBlur('definicaoIdeologica')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.definicaoIdeologica && errors.definicaoIdeologica 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.definicaoIdeologica && errors.definicaoIdeologica && (
                        <p className="text-red-500 text-sm mt-1">{errors.definicaoIdeologica}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="outrosMovimentos"
                        placeholder="Outros Movimentos"
                        value={formData.outrosMovimentos}
                        onChange={handleChange}
                        onBlur={() => handleBlur('outrosMovimentos')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.outrosMovimentos && errors.outrosMovimentos 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.outrosMovimentos && errors.outrosMovimentos && (
                        <p className="text-red-500 text-sm mt-1">{errors.outrosMovimentos}</p>
                    )}
                </div>
                <div className="mb-4 relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleChange}
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
                <div className="mb-4 relative">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirmar Senha"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={() => handleBlur('confirmPassword')}
                        className={`w-full p-2 border rounded text-black pr-10 ${
                            touched.confirmPassword && errors.confirmPassword 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        {showConfirmPassword ? (
                            <EyeClosedIcon onClick={() => setShowConfirmPassword(false)} />
                        ) : (
                            <EyeOpenIcon onClick={() => setShowConfirmPassword(true)} />
                        )}
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-[#FFC700] text-black w-full py-2 rounded font-bold hover:bg-yellow-500 transition-colors duration-200"
                >
                    Cadastrar
                </button>
                <div className="text-center mt-4">
                    <span className="text-black">Já tem cadastro? </span>
                    <a href="/login" className="text-[#FFC700]">Entre aqui</a>
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

export default SignUp;
