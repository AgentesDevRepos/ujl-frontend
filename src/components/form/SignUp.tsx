"use client"

import React, { useState } from 'react';
import EyeOpenIcon from '../icons/EyeOpenIcon';
import EyeClosedIcon from '../icons/EyeClosedIcon';
import Notification from '../Notification';
import { signUp } from '../../requests/user.requests';

interface FormErrors {
    email?: string;
    password?: string;
    confirm_password?: string;
    cpf?: string;
    first_name?: string;
    last_name?: string;
    telefone?: string;
    data_nascimento?: string;
    instituicao_ensino?: string;
    estado?: string;
    cidade?: string;
    nivel_ensino?: string;
    curso?: string;
    como_conheceu?: string;
    definicao_ideologica?: string;
    outros_movimentos?: string;
}

function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        cpf: '',
        first_name: '',
        last_name: '',
        telefone: '',
        data_nascimento: '',
        instituicao_ensino: '',
        estado: '',
        cidade: '',
        nivel_ensino: '',
        curso: '',
        como_conheceu: '',
        definicao_ideologica: '',
        outros_movimentos: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const NIVEL_CHOICES = [
        { value: "SECUNDARISTA", label: "Secundarista" },
        { value: "TECNICO", label: "Técnico" },
        { value: "SUPERIOR", label: "Superior" },
    ];

    const ESTADO_CHOICES = [
        { value: "AC", label: "Acre" },
        { value: "AL", label: "Alagoas" },
        { value: "AP", label: "Amapá" },
        { value: "AM", label: "Amazonas" },
        { value: "BA", label: "Bahia" },
        { value: "CE", label: "Ceará" },
        { value: "DF", label: "Distrito Federal" },
        { value: "ES", label: "Espírito Santo" },
        { value: "GO", label: "Goiás" },
        { value: "MA", label: "Maranhão" },
        { value: "MT", label: "Mato Grosso" },
        { value: "MS", label: "Mato Grosso do Sul" },
        { value: "MG", label: "Minas Gerais" },
        { value: "PA", label: "Pará" },
        { value: "PB", label: "Paraíba" },
        { value: "PR", label: "Paraná" },
        { value: "PE", label: "Pernambuco" },
        { value: "PI", label: "Piauí" },
        { value: "RJ", label: "Rio de Janeiro" },
        { value: "RN", label: "Rio Grande do Norte" },
        { value: "RS", label: "Rio Grande do Sul" },
        { value: "RO", label: "Rondônia" },
        { value: "RR", label: "Roraima" },
        { value: "SC", label: "Santa Catarina" },
        { value: "SP", label: "São Paulo" },
        { value: "SE", label: "Sergipe" },
        { value: "TO", label: "Tocantins" },
    ];

    const validateForm = () => {
        const newErrors: FormErrors = {};
        if (!formData.email) newErrors.email = 'O email é obrigatório';
        if (!formData.password) newErrors.password = 'A senha é obrigatória';
        if (!formData.confirm_password) newErrors.confirm_password = 'A confirmação de senha é obrigatória';
        if (formData.confirm_password !== formData.password) newErrors.confirm_password = 'As senhas não coincidem';
        if (!formData.cpf) {
            newErrors.cpf = 'O CPF é obrigatório';
        } else if (!/^\d{11}$/.test(formData.cpf)) {
            newErrors.cpf = 'O CPF deve conter 11 dígitos numéricos';
        }
        if (!formData.first_name) newErrors.first_name = 'O primeiro nome é obrigatório';
        if (!formData.last_name) newErrors.last_name = 'O sobrenome é obrigatório';
        if (!formData.telefone) newErrors.telefone = 'O telefone é obrigatório';
        if (!formData.data_nascimento) newErrors.data_nascimento = 'A data de nascimento é obrigatória';
        if (!formData.instituicao_ensino) newErrors.instituicao_ensino = 'A instituição de ensino é obrigatória';
        if (!formData.estado) newErrors.estado = 'O estado é obrigatório';
        if (!formData.cidade) newErrors.cidade = 'A cidade é obrigatória';
        if (!formData.nivel_ensino) newErrors.nivel_ensino = 'O nível de ensino é obrigatório';
        if (!formData.curso) newErrors.curso = 'O curso é obrigatório';
        if (!formData.como_conheceu) newErrors.como_conheceu = 'Este campo é obrigatório';
        if (!formData.definicao_ideologica) newErrors.definicao_ideologica = 'Este campo é obrigatório';
        if (!formData.outros_movimentos) newErrors.outros_movimentos = 'Este campo é obrigatório';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            email: true,
            password: true,
            confirm_password: true,
            cpf: true,
            first_name: true,
            last_name: true,
            telefone: true,
            data_nascimento: true,
            instituicao_ensino: true,
            estado: true,
            cidade: true,
            nivel_ensino: true,
            curso: true,
            como_conheceu: true,
            definicao_ideologica: true,
            outros_movimentos: true
        });
        
        if (validateForm()) {
            try {
                const data = await signUp(formData);

                if (data) {
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
                        name="first_name"
                        placeholder="Primeiro Nome"
                        value={formData.first_name}
                        onChange={handleChange}
                        onBlur={() => handleBlur('first_name')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.first_name && errors.first_name 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.first_name && errors.first_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Sobrenome"
                        value={formData.last_name}
                        onChange={handleChange}
                        onBlur={() => handleBlur('last_name')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.last_name && errors.last_name 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.last_name && errors.last_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
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
                        name="data_nascimento"
                        placeholder="Data de Nascimento"
                        value={formData.data_nascimento}
                        onChange={handleChange}
                        onBlur={() => handleBlur('data_nascimento')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.data_nascimento && errors.data_nascimento 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.data_nascimento && errors.data_nascimento && (
                        <p className="text-red-500 text-sm mt-1">{errors.data_nascimento}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="instituicao_ensino"
                        placeholder="Instituição de Ensino"
                        value={formData.instituicao_ensino}
                        onChange={handleChange}
                        onBlur={() => handleBlur('instituicao_ensino')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.instituicao_ensino && errors.instituicao_ensino 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.instituicao_ensino && errors.instituicao_ensino && (
                        <p className="text-red-500 text-sm mt-1">{errors.instituicao_ensino}</p>
                    )}
                </div>
                <div className="mb-4">
                    <select
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        onBlur={() => handleBlur('estado')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.estado && errors.estado 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    >
                        <option value="">Selecione o Estado</option>
                        {ESTADO_CHOICES.map((estado) => (
                            <option key={estado.value} value={estado.value}>
                                {estado.label}
                            </option>
                        ))}
                    </select>
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
                    <select
                        name="nivel_ensino"
                        value={formData.nivel_ensino}
                        onChange={handleChange}
                        onBlur={() => handleBlur('nivel_ensino')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.nivel_ensino && errors.nivel_ensino 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    >
                        <option value="">Selecione o Nível de Ensino</option>
                        {NIVEL_CHOICES.map((nivel) => (
                            <option key={nivel.value} value={nivel.value}>
                                {nivel.label}
                            </option>
                        ))}
                    </select>
                    {touched.nivel_ensino && errors.nivel_ensino && (
                        <p className="text-red-500 text-sm mt-1">{errors.nivel_ensino}</p>
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
                        name="como_conheceu"
                        placeholder="Como Conheceu"
                        value={formData.como_conheceu}
                        onChange={handleChange}
                        onBlur={() => handleBlur('como_conheceu')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.como_conheceu && errors.como_conheceu 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.como_conheceu && errors.como_conheceu && (
                        <p className="text-red-500 text-sm mt-1">{errors.como_conheceu}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="definicao_ideologica"
                        placeholder="Definição Ideológica"
                        value={formData.definicao_ideologica}
                        onChange={handleChange}
                        onBlur={() => handleBlur('definicao_ideologica')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.definicao_ideologica && errors.definicao_ideologica 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.definicao_ideologica && errors.definicao_ideologica && (
                        <p className="text-red-500 text-sm mt-1">{errors.definicao_ideologica}</p>
                    )}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="outros_movimentos"
                        placeholder="Outros Movimentos"
                        value={formData.outros_movimentos}
                        onChange={handleChange}
                        onBlur={() => handleBlur('outros_movimentos')}
                        className={`w-full p-2 border rounded text-black ${
                            touched.outros_movimentos && errors.outros_movimentos 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                    />
                    {touched.outros_movimentos && errors.outros_movimentos && (
                        <p className="text-red-500 text-sm mt-1">{errors.outros_movimentos}</p>
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
                        name="confirm_password"
                        placeholder="Confirmar Senha"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        onBlur={() => handleBlur('confirm_password')}
                        className={`w-full p-2 border rounded text-black pr-10 ${
                            touched.confirm_password && errors.confirm_password 
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
                    {touched.confirm_password && errors.confirm_password && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
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
