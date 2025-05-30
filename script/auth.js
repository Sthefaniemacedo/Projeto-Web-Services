import {login, createUser} from './services/authService.js'
import { handleError, handleSuccess } from './services/responseHandlers.js';

/*
document.querySelector('login-section')
.addEventListener('submit', function(event){
    event.preventDefault();

    const email = document.getElementById('email').ariaValueMax;
    const senha = document.getElementById('senha').ariaValueMax;

    login(email, senha)
    .then(response => {
        console.log('Resposta do servidor: ', response.data);
    })
    .catch(error =>{
        console.error('Erro: ', error);
    });

});
*/

handleFormSubmit(
    '.signup-section', function(event){
        const email = document.getElementById('email-signup').value;
        const nome = document.getElementById('nome').value;
        const senha = document.getElementById('senha-signup').value;
        const confirmaSenha = document.getElementById('confirmar-senha').value;

        if(senha != confirmaSenha){
            alert('Senhas informadas devem ser iguais!');
            return;
        }

        createUser(nome, email, senha, "")
        .then(handleSuccess)
        .catch(handleError);
    }
)

document.querySelector('.toggle-password')
.addEventListener('click', function(){
    const inputId = this.dataset.target;
    const input = document.getElementById(inputId);
    input.type = input.type === 'pass'

});



function handleFormSubmit(selector, callback){
    const form = document.querySelector(selector);

    if(!form) return;

    form.addEventListener('submit', function(event){
        event.preventDefault();
        callback(event);

    });
}

function togglePassword(id) {
    let input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

