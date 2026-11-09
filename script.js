document.addEventListener('DOMContentLoaded', () => {
  const toastElement = document.getElementById('toastUnico');
  const toastTitulo = document.getElementById('toastTitulo');
  const toastMensagem = document.getElementById('toastMensagem');
  const toastIcone = document.getElementById('toastIcone');
  

  const bsToast = new bootstrap.Toast(toastElement, {
    autohide: true,
    delay: 5000
  });


  const listaHistorico = document.getElementById('listaHistorico');
  const contadorAcoes = document.getElementById('contadorAcoes');
  const itemVazio = document.getElementById('itemVazio');
  let totalAcoes = 0;


  const modalConfirmarLimpeza = new bootstrap.Modal(document.getElementById('modalConfirmarLimpeza'));


  function processarAcao(titulo, mensagem, textoHistorico, iconeClasse) {

    toastTitulo.textContent = titulo;
    toastMensagem.textContent = mensagem;
    toastIcone.className = `bi ${iconeClasse} me-2`;
    toastIcone.style.color = '#6f42c1';
    bsToast.show();


    if (itemVazio) {
      itemVazio.style.display = 'none';
    }


    const novoItem = document.createElement('li');
    novoItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    
    const horaAtual = new Date().toLocaleTimeString('pt-BR');
    novoItem.innerHTML = `
      <span><i class="bi ${iconeClasse} me-2" style="color: #6f42c1;"></i>${textoHistorico}</span>
      <span class="badge bg-light text-dark border">${horaAtual}</span>
    `;

    listaHistorico.prepend(novoItem); 


    totalAcoes++;
    contadorAcoes.textContent = totalAcoes;
  }

  document.getElementById('btnCadastrar').addEventListener('click', (e) => {
    e.preventDefault();
    processarAcao(
      'Cadastro realizado',
      'O usuário foi cadastrado com sucesso.',
      'Cadastro de usuário realizado.',
      'bi-person-check-fill'
    );
  });

  document.getElementById('btnSeguranca').addEventListener('click', (e) => {
    e.preventDefault();
    processarAcao(
      'Atenção à segurança',
      'Verifique suas credenciais de acesso.',
      'Verificação de segurança executada.',
      'bi-exclamation-triangle-fill'
    );
  });

  document.getElementById('btnSistema').addEventListener('click', (e) => {
    e.preventDefault();
    processarAcao(
      'Sistema atualizado',
      'Nenhuma atualização pendente foi encontrada.',
      'Consulta de atualizações realizada.',
      'bi-check-circle-fill'
    );
  });

 
  document.getElementById('btnAbrirModalLimpar').addEventListener('click', () => {
    if (totalAcoes === 0) {
      alert('O histórico já está vazio!');
      return;
    }
    modalConfirmarLimpeza.show();
  });

  document.getElementById('btnConfirmarLimpar').addEventListener('click', () => {
   
    listaHistorico.innerHTML = '';
    
    const liVazia = document.createElement('li');
    liVazia.className = 'list-group-item text-muted text-center py-3';
    liVazia.id = 'itemVazio';
    liVazia.textContent = 'Nenhuma atividade registrada ainda.';
    listaHistorico.appendChild(liVazia);

   
    totalAcoes = 0;
    contadorAcoes.textContent = totalAcoes;

  
    modalConfirmarLimpeza.hide();
  });
});