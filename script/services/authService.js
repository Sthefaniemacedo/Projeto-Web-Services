import {apiPost} from "../api.js"

const prefix = '/usuario';

export const login = (email, senha) => {
    console.log('Dados enviados para login:', { email, senha });
    return apiPost(`${prefix}/login`, {email, senha});
};

export const createUser = (
    nome, email, senha, endereco
) =>{
    return apiPost(`${prefix}/criar_usuario`, {
        nome, email, senha, endereco
    });
}