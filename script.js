document.addEventListener('DOMContentLoaded', function() {
    // Filtro de produtos
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const produtos = document.querySelectorAll('.produto');
    
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove a classe active de todos os botões
            filtroBtns.forEach(b => b.classList.remove('active'));
            // Adiciona a classe active ao botão clicado
            this.classList.add('active');
            
            const categoria = this.getAttribute('data-categoria');
            
            produtos.forEach(produto => {
                if (categoria === 'todos' || produto.getAttribute('data-categoria') === categoria) {
                    produto.style.display = 'block';
                } else {
                    produto.style.display = 'none';
                }
            });
        });
    });
    
    // Chat Widget
    const chatWidget = document.getElementById('chatWidget');
    const abreChat = document.getElementById('abreChat');
    const fechaChat = document.getElementById('fechaChat');
    const enviaMensagem = document.getElementById('enviaMensagem');
    const mensagemInput = document.getElementById('mensagemInput');
    const chatMessages = document.querySelector('.chat-messages');
    
    abreChat.addEventListener('click', function() {
        chatWidget.style.display = 'flex';
    });
    
    fechaChat.addEventListener('click', function() {
        chatWidget.style.display = 'none';
    });
    
    function adicionaMensagem(texto, isAtendente) {
        const divMensagem = document.createElement('div');
        divMensagem.classList.add('mensagem');
        if (isAtendente) {
            divMensagem.classList.add('atendente');
        }
        divMensagem.innerHTML = `<p>${texto}</p>`;
        chatMessages.appendChild(divMensagem);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    enviaMensagem.addEventListener('click', function() {
        const texto = mensagemInput.value.trim();
        if (texto) {
            adicionaMensagem(texto, false);
            mensagemInput.value = '';
            
            // Resposta automática (simulada)
            setTimeout(() => {
                adicionaMensagem('Obrigado por sua mensagem. Um de nossos representantes entrará em contato em breve para fornecer o orçamento.', true);
            }, 1000);
        }
    });
    
    mensagemInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            enviaMensagem.click();
        }
    });
    
    // Botões de consulta de preço
    const btnConsultas = document.querySelectorAll('.btn-consulta');
    btnConsultas.forEach(btn => {
        btn.addEventListener('click', function() {
            const produto = this.getAttribute('data-produto');
            chatWidget.style.display = 'flex';
            adicionaMensagem(`Estou interessado no produto: ${produto}. Por favor, envie o orçamento.`, false);
            
            setTimeout(() => {
                adicionaMensagem(`Obrigado pelo interesse no ${produto}. Um de nossos representantes entrará em contato em breve com o orçamento.`, true);
            }, 1000);
        });
    });
});