const formaPagamentoSelect = document.getElementById('forma-pagamento');
const cartaoDetalhes = document.getElementById('cartao-detalhes');
const qrcodeContainer = document.getElementById('qrcode-container');
const resumoItens = document.getElementById('resumo-itens');
const totalSpan = document.getElementById('total');

// Puxa dados do carrinho e mostra resumo
function carregarResumo() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  resumoItens.innerHTML = '';

  let totalCompra = 0;
  carrinho.forEach(item => {
    const nome = item.nome || 'Produto sem nome';
    const preco = item.preco || 0;
    const qtd = item.quantidade || 1;
    const totalItem = preco * qtd;
    totalCompra += totalItem;

    const div = document.createElement('div');
    div.textContent = `${nome} (${qtd}x) - R$ ${totalItem.toFixed(2)}`;
    resumoItens.appendChild(div);
  });

  const frete = 15.00;
  const totalGeral = totalCompra + frete;
  document.getElementById('frete').textContent = `R$ ${frete.toFixed(2)}`;
  totalSpan.textContent = `R$ ${totalGeral.toFixed(2)}`;
}

// Atualiza visibilidade dos campos dependendo da forma de pagamento
formaPagamentoSelect.addEventListener('change', () => {
  const valor = formaPagamentoSelect.value;
  if (valor === 'credito' || valor === 'debito') {
    cartaoDetalhes.classList.remove('hidden');
    qrcodeContainer.classList.add('hidden');
  } else if (valor === 'pix') {
    cartaoDetalhes.classList.add('hidden');
    qrcodeContainer.classList.remove('hidden');
  } else {
    cartaoDetalhes.classList.add('hidden');
    qrcodeContainer.classList.add('hidden');
  }
});

document.getElementById('btn-finalizar').addEventListener('click', () => {
  const forma = formaPagamentoSelect.value;
  if (!forma) {
    alert('Por favor, selecione uma forma de pagamento.');
    return;
  }
  if ((forma === 'credito' || forma === 'debito')) {
    const numCartao = document.getElementById('num-cartao').value.trim();
    const vencimento = document.getElementById('vencimento').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    if (!numCartao || !vencimento || !cvv) {
      alert('Por favor, preencha todos os dados do cartão.');
      return;
    }
    // Aqui pode validar os dados do cartão se quiser
  }
  alert('Pagamento finalizado com sucesso!');
  localStorage.removeItem('carrinho');
  window.location.href = 'compra-finalizada.html'; // Página de agradecimento (crie ela)
});

carregarResumo();
