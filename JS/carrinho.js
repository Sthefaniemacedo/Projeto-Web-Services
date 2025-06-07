const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})


// Adiciona um item ao carrinho
function adicionarAoCarrinho(nome, preco = 0, imagem = 'imagens/placeholder.png') {
    console.log('To aqui no metodo adicionar ao carrinho');

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    let produtoExistente = carrinho.find(item => item.nome === nome);

    //verifica na api se o produto ja esta no carrinho
    getCartByUserId(2)
    .then(response =>{
        const carrinho = response.data;

        const itemExiste = carrinho.itens.some(item => item.nome === nome);

        if(itemExiste){
            //atualiza a quantidade do item no carrinho
            console.log("item ja existe. Quantidade sera atualizada ", nome);
        }else{
            //adiciona o item novo no carrinho
            console.log("item ainda não existe. Item será adicionado ", nome);

        }
    })
    .catch(erro =>{       
        console.log("Erro ao buscar carrinho", erro);
        if (erro.response && erro.response.status === 404) {
            // carrinho não existe, criar novo carrinho com o item
            const itens = [{
                id_usuario: 2,
                id_produto: 1,
                quantidade: 1,
                preco: preco
            }];
            saveNewCart(2, preco * 1, itens)
            .then(response => console.log("Carrinho criado", response.data))
            .catch(erro => console.log("Erro ao criar carrinho", erro));
        } else {
            console.log("Erro ao buscar carrinho", erro);
        }
    })
    if (produtoExistente) {
        produtoExistente.quantidade++;
        console.log(`Produto existente ${produtoExistente}`);
    } else {
        console.log('Produto ainda não existe');

        carrinho.push({
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1
        });
        console.log('To aqui logo antes de chamar o método da API');
        updateCart(2, preco)
            .then(response => {
                console.log('Carrinho atualizado com sucesso:', response.data);
            })
            .catch(error => {
                console.error('Erro ao atualizar o carrinho:', error);
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

///o onClick da tag html nao funciona com modulos
///o metodo adicionarCarrinho nao funciona mais
//n vai dar pra usar o modulo aqui, vou ter que
//colocar os metodos da api aqui mesmo


//Funções genéricas para as requisições HTTP
// Funções genéricas
function apiGet(path, config = {}) {
    return api.get(path, config);
}

function apiPost(path, data, config = {}) {
    return api.post(path, data, config);
}

function apiPut(path, data, config = {}) {
    return api.put(path, data, config);
}

function apiDelete(path, config = {}) {
    return api.delete(path, config);
}

//Funções de carrinho

const prefix = '/carrinho';

function getCartByUserId(usuario_id) {
    return apiGet(`${prefix}/consultar_carrinho_por_userId`, {
        params: { usuario_id }
    });
}

function saveNewCart(id_usuario, valor_total, itens) {
    return apiPost(`${prefix}/salvar_novo_carrinho`, {
        carrinho_create: {id_usuario, valor_total},
        itens_create: itens
    });
}

function updateCart(id_usuario, valor_total) {
    return apiPut(`${prefix}/atualizar_carrinho`, {
        id_usuario,
        valor_total
    });
}

function updateItemInCart(data) {
    return apiPut(`${prefix}/atualizar_item_carrinho`, data);
}


//Funções de produto
const prefixProduto = "/produto";

function getCartByUserId(usuario_id) {
    return apiGet(`${prefix}/consultar_carrinho_por_userId`, {
        params: { usuario_id }
    });
}

function getAllProducts(){
    return apiGet(`${prefixProduto}/encontra_produto/`)
}

function renderizarProduto(produto){
    console.log("imgUrl ", produto.imagem)
    return `
        <div class="gallery">
            <div class="gallery-content">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <div class="desc">${produto.nome}</div>
                <p class="valor_item">R$${parseFloat(produto.preco).toFixed(2)}</p>
            </div>
            <button onclick="adicionarAoCarrinho('${produto.nome}',
            ${produto.preco},
            '${produto.imagem || ''}')">Adicionar ao Carrinho</button>
        </div>
    `;
}

function carregarProdutos(){
    getAllProducts()
        .then(response =>{
            let produtos = response.data;
            const container = document.querySelector('.gallery-container');

            // Verifica se está na página index.html
            const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

            // Se for index.html, limita a 4 produtos
            //para mostrar na tela de favoritos
            if (isIndexPage) {
                produtos = produtos.sort(()=> Math.random() - 0.5).slice(0, 4);
            }
        
            produtos.forEach(produto =>{
                console.log("produto: ", produto)
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = renderizarProduto(produto);
                container.appendChild(tempDiv.firstElementChild);
            });
        })
        .catch(error =>{
            console.error('Erro ao buscar produtos.');
            console.log('Erro ao buscar produtos: ', error);
        });


}



window.addEventListener('DOMContentLoaded', carregarProdutos);

///configurar o endereço la na tela de checkout!




