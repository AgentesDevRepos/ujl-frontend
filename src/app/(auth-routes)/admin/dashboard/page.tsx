"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { listPendingRequests, approveMember, rejectMember } from '../../../../requests/user.requests';

interface User {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    data_nascimento: string;
}

function AdminDashboard() {
    const { data: session }: any = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPendingRequests = async () => {
        if (session) {
            setIsLoading(true);
            try {
                const token = session.data.tokens.access;
                const data = await listPendingRequests(token);
                setUsers(data.data);
            } catch (error) {
                console.error('Erro ao buscar solicitações pendentes:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchPendingRequests();
    }, [session]);

    const handleAccept = async (id: string) => {
        if (session) {
            setIsLoading(true);
            try {
                const token = session.data.tokens.access;
                await approveMember(id, token);
                await fetchPendingRequests(); // Recarrega os dados após aprovar
            } catch (error) {
                console.error('Erro ao aprovar membro:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleReject = async (id: string) => {
        if (session) {
            setIsLoading(true);
            try {
                const token = session.data.tokens.access;
                await rejectMember(id, token);
                await fetchPendingRequests(); // Recarrega os dados após rejeitar
            } catch (error) {
                console.error('Erro ao rejeitar membro:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Admin Dashboard</h1>
            <div className="bg-white shadow-md rounded-lg p-4 md:p-8 text-black overflow-x-auto">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Usuários Pendentes</h2>
                {isLoading ? (
                    <div className="text-center py-4">Carregando...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-3 text-sm md:text-base">Nome de Usuário</th>
                                    <th className="py-2 px-3 text-sm md:text-base">Email</th>
                                    <th className="py-2 px-3 text-sm md:text-base">Nome Completo</th>
                                    <th className="py-2 px-3 text-sm md:text-base">Data de Nascimento</th>
                                    <th className="py-2 px-3 text-sm md:text-base">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4">
                                            Nenhum usuário pendente
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user, index) => (
                                        <tr key={index} className="text-center border-b">
                                            <td className="py-2 px-3 text-sm md:text-base">{user.username}</td>
                                            <td className="py-2 px-3 text-sm md:text-base">{user.email}</td>
                                            <td className="py-2 px-3 text-sm md:text-base">{`${user.first_name} ${user.last_name}`}</td>
                                            <td className="py-2 px-3 text-sm md:text-base">{user.data_nascimento}</td>
                                            <td className="py-2 px-3">
                                                <div className="flex flex-col md:flex-row gap-2 justify-center">
                                                    <button
                                                        onClick={() => handleAccept(user.id)}
                                                        disabled={isLoading}
                                                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 disabled:opacity-50 text-sm md:text-base"
                                                    >
                                                        Aceitar
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(user.id)}
                                                        disabled={isLoading}
                                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 disabled:opacity-50 text-sm md:text-base"
                                                    >
                                                        Recusar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard; 