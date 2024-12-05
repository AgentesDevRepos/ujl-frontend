"use client"

import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { getUserProfile } from '@/requests/user.requests';

function DashboardPage() {
    const [showModal, setShowModal] = useState(false);
    const { data: session }: any = useSession();
    const [userProfile, setUserProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await getUserProfile(session.data.tokens.access);

                setUserProfile(data.data);
            } catch (error) {
                console.error('Erro ao buscar perfil:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [session]);

    if (loading) {
        return (
            <div className="p-8 text-center h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
                <span className="ml-3 text-yellow-400 text-lg">Carregando...</span>
            </div>
        );
    }

    if (!userProfile) {
        return <div className="p-8 text-center h-screen"></div>;
    }

    console.log(session);

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Seja bem-vindo(a), {userProfile.first_name || 'Usuário'}!</h1>
            <div className="bg-white shadow-md rounded-lg p-8 text-black">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Nome</label>
                        <input type="text" value={`${userProfile.first_name || ''} ${userProfile.last_name || ''}`} disabled className="w-full p-2 border rounded bg-gray-100" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Email</label>
                        <input type="email" value={userProfile.email || ''} disabled className="w-full p-2 border rounded bg-gray-100" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">CPF</label>
                        <input type="text" value={userProfile.cpf || ''} disabled className="w-full p-2 border rounded bg-gray-100" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Telefone</label>
                        <input type="text" value={userProfile.telefone || ''} disabled className="w-full p-2 border rounded bg-gray-100" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Data de Nascimento</label>
                        <input type="text" value={userProfile.data_nascimento || ''} disabled className="w-full p-2 border rounded bg-gray-100" />
                    </div>
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Educação</h2>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Instituição de Ensino</label>
                        <input type="text" value={userProfile.instituicao_ensino || ''} disabled className="w-full p-2 border rounded bg-gray-100" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Estado</label>
                        <input type="text" value={userProfile.estado || ''} disabled className="w-full p-2 border rounded bg-gray-100" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Cidade</label>
                        <input type="text" value={userProfile.cidade || ''} disabled className="w-full p-2 border rounded bg-gray-100" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Nível de Ensino</label>
                        <input type="text" value={userProfile.nivel_ensino || ''} disabled className="w-full p-2 border rounded bg-gray-100" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Curso</label>
                        <input type="text" value={userProfile.curso || ''} disabled className="w-full p-2 border rounded bg-gray-100" />
                    </div>
                </div>
                {userProfile.atributos && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Atributos</h2>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Como Conheceu</label>
                            <input type="text" value={userProfile.atributos.como_conheceu || ''} disabled className="w-full p-2 border rounded bg-gray-100" />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Definição Ideológica</label>
                            <input type="text" value={userProfile.atributos.definicao_ideologica || ''} disabled className="w-full p-2 border rounded bg-gray-100" />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">Outros Movimentos</label>
                            <input type="text" value={userProfile.atributos.outros_movimentos || ''} disabled className="w-full p-2 border rounded bg-gray-100" />
                        </div>
                    </div>
                )}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Seu grupo estadual</h2>
                    <a href="#" className="text-blue-500 underline hover:no-underline">Link do grupo</a>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#FFC700] text-black font-bold px-4 py-2 rounded hover:bg-yellow-500 transition-colors duration-200"
                >
                    Desfiliar-se
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg text-black flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-4 text-center">Aviso</h2>
                        <p>Para desfiliação, fale com o seu líder estadual.</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 bg-[#FFC700] text-black font-bold px-4 py-2 rounded hover:bg-yellow-500 transition-colors duration-200"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardPage; 