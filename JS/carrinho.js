// Adiciona um item ao carrinho
function adicionarAoCarrinho(nome, preco = 0, imagem = 'imagens/placeholder.png') {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    let produtoExistente = carrinho.find(item => item.nome === nome);

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1
        });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${nome} foi adicionado ao carrinho!`);
}

// Exibe os itens do carrinho na tela
function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let containerCarrinho = document.getElementById('carrinho-itens');
    
    if (!containerCarrinho) {
        console.error('Elemento #carrinho-itens não encontrado!');
        return;
    }

    containerCarrinho.innerHTML = '';  // Limpa o carrinho antes de adicionar os itens

    let total = 0;

    carrinho.forEach(item => {
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('item-carrinho');

        // Garante que os valores não sejam undefined
        let preco = item.preco || 0;
        let imagem = item.imagem || 'imagens/placeholder.png';
        let quantidade = item.quantidade || 1;
        let nome = item.nome || 'Produto sem nome';

        itemDiv.innerHTML = `
            <img src="${imagem}" alt="${nome}" class="imagem-produto">
            <div class="descricao-produto">
                <h3>${nome}</h3>
                <p>R$ ${preco.toFixed(2)}</p>
                <p>Quantidade: ${quantidade}</p>
                <p>Total: R$ ${(preco * quantidade).toFixed(2)}</p>
            </div>
        `;

        containerCarrinho.appendChild(itemDiv);

        total += preco * quantidade;
    });

    // Exibe o total do carrinho
    let totalDiv = document.getElementById('total');
    if (totalDiv) {
        totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
}

// Limpa o carrinho
function limparCarrinho() {
    localStorage.removeItem('carrinho');

    const containerCarrinho = document.getElementById('carrinho-itens');
    const totalDiv = document.getElementById('total');

    if (containerCarrinho) containerCarrinho.innerHTML = '';
    if (totalDiv) totalDiv.textContent = 'Total: R$ 0,00';

    alert('Carrinho limpo!');
}

// Redireciona para a tela de pagamento
function irParaPagamento() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    window.location.href = "pagamento.html";
}

// Executa ao carregar a página do carrinho
document.addEventListener('DOMContentLoaded', function () {
    if (document.body.id === 'carrinho') {
        exibirCarrinho();
    }
});
