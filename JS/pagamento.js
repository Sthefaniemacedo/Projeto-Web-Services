document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM carregado!');

    // --- RESUMO DO CARRINHO ---
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const resumoItens = document.getElementById('resumo-itens');
    const totalFinal = document.getElementById('total-final');

    let total = 0;

    carrinho.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-resumo');
        const subtotal = item.preco * item.quantidade;

        itemDiv.innerHTML = `<p>${item.nome} x${item.quantidade} - R$ ${subtotal.toFixed(2)}</p>`;
        resumoItens.appendChild(itemDiv);

        total += subtotal;
    });

    const frete = 10.00;
    total += frete;

    totalFinal.textContent = `Total: R$ ${total.toFixed(2)}`;

    // --- VALIDAÇÃO DO FORMULÁRIO + REDIRECIONAMENTO ---
    const btnFormaPagamento = document.getElementById('btn-forma-pagamento');

    if (btnFormaPagamento) {
        console.log('Botão encontrado. Ligando evento...');
        btnFormaPagamento.addEventListener('click', () => {
            const form = document.getElementById('form-endereco');
            const camposObrigatorios = form.querySelectorAll('input[required]');
            let formularioValido = true;

            camposObrigatorios.forEach((campo) => {
                if (campo.value.trim() === '') {
                    formularioValido = false;
                    campo.classList.add('erro');
                } else {
                    campo.classList.remove('erro');
                }
            });

            if (!formularioValido) {
                alert('Por favor, preencha todos os campos obrigatórios do endereço.');
                return;
            }

            // Se tudo estiver certo, redireciona
            alert('Redirecionando para a forma de pagamento...');
            window.location.href = 'forma-pagamento.html';
        });
    } else {
        console.error('Botão #btn-forma-pagamento NÃO encontrado!');
    }
});
