export function handleSuccess(response){
    console.log('Resposta do servidor: ', response.data);
}

export function handleError(error){
    console.error('Erro: ', error);
}