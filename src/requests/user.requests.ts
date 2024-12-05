import { post, get } from "./request.config";

export async function login(body: any) {
    const data = await post('/api/auth/login/', body);

    return data;
}

export async function signUp(body: any) {
    const data = await post('/api/auth/signup/', body);

    return data;
};

export async function getUserProfile(token: string) {
    const data = await get('/api/users/profile/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
}

export async function listPendingRequests(token: string) {
    const data = await get('/api/admin/solicitacoes_pendentes/', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
}

export async function approveMember(id: string, token: string) {
    const data = await post(`/api/admin/${id}/aprovar_membro/`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
}

export async function rejectMember(id: string, token: string) {
    const data = await post(`/api/admin/${id}/rejeitar_membro/`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data;
}