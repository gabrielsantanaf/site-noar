document.addEventListener('DOMContentLoaded', function() {
    // Navegação entre seções
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove a classe active de todos os links e seções
            navLinks.forEach(navLink => navLink.parentElement.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Adiciona a classe active ao link clicado
            this.parentElement.classList.add('active');
            
            // Mostra a seção correspondente
            const target = this.getAttribute('href');
            document.querySelector(target).classList.add('active');
        });
    });
    
    // Gerenciamento de Produtos
    const addProdutoBtn = document.getElementById('add-produto');
    const produtoFormContainer = document.getElementById('produto-form-container');
    const cancelarProdutoBtn = document.getElementById('cancelar-produto');
    const produtoForm = document.getElementById('produto-form');
    const tabelaProdutos = document.getElementById('tabela-produtos').getElementsByTagName('tbody')[0];
    
    // Mostrar/ocultar formulário de produto
    addProdutoBtn.addEventListener('click', function() {
        produtoFormContainer.style.display = 'block';
        produtoForm.reset();
        document.getElementById('produto-id').value = '';
        document.getElementById('imagem-preview').innerHTML = '';
    });
    
    cancelarProdutoBtn.addEventListener('click', function() {
        produtoFormContainer.style.display = 'none';
    });
    
    // Preview da imagem do produto
    const produtoImagemInput = document.getElementById('produto-imagem');
    const imagemPreview = document.getElementById('imagem-preview');
    
    produtoImagemInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagemPreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            }
            reader.readAsDataURL(file);
        }
    });
    
    // Envio do formulário de produto (simulado)
    produtoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui você normalmente faria uma requisição AJAX para salvar no servidor
        // Estamos simulando com dados locais para demonstração
        
        const produtoId = document.getElementById('produto-id').value;
        const isEdit = produtoId !== '';
        
        const produto = {
            id: isEdit ? produtoId : Date.now().toString(),
            nome: document.getElementById('produto-nome').value,
            codigo: document.getElementById('produto-codigo').value,
            categoria: document.getElementById('produto-categoria').value,
            descricao: document.getElementById('produto-descricao').value,
            especificacoes: JSON.parse(document.getElementById('produto-especificacoes').value || '{}'),
            imagem: imagemPreview.querySelector('img') ? imagemPreview.querySelector('img').src : 'imagens/produtos/sem-imagem.jpg'
        };
        
        if (isEdit) {
            // Atualizar produto existente
            atualizarProdutoNaTabela(produto);
        } else {
            // Adicionar novo produto
            adicionarProdutoNaTabela(produto);
        }
        
        // Limpar formulário e ocultar
        produtoForm.reset();
        produtoFormContainer.style.display = 'none';
        document.getElementById('produto-id').value = '';
        imagemPreview.innerHTML = '';
        
        alert(`Produto ${isEdit ? 'atualizado' : 'adicionado'} com sucesso!`);
    });
    
    // Função para adicionar produto na tabela
    function adicionarProdutoNaTabela(produto) {
        const row = tabelaProdutos.insertRow();
        
        row.innerHTML = `
            <td><img src="${produto.imagem}" alt="${produto.nome}" class="table-img"></td>
            <td>${produto.nome}</td>
            <td>${produto.codigo}</td>
            <td>${traduzirCategoria(produto.categoria)}</td>
            <td class="table-actions">
                <button class="action-btn edit-btn" data-id="${produto.id}"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn" data-id="${produto.id}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        // Adicionar eventos aos botões
        adicionarEventosAcoesProduto(row);
    }
    
    // Função para atualizar produto na tabela
    function atualizarProdutoNaTabela(produto) {
        const rows = tabelaProdutos.getElementsByTagName('tr');
        for (let row of rows) {
            const editBtn = row.querySelector('.edit-btn');
            if (editBtn && editBtn.getAttribute('data-id') === produto.id) {
                row.cells[0].innerHTML = `<img src="${produto.imagem}" alt="${produto.nome}" class="table-img">`;
                row.cells[1].textContent = produto.nome;
                row.cells[2].textContent = produto.codigo;
                row.cells[3].textContent = traduzirCategoria(produto.categoria);
                break;
            }
        }
    }
    
    // Função para traduzir categoria
    function traduzirCategoria(categoria) {
        const categorias = {
            'garra': 'Atuadores Garra',
            'especial': 'Atuadores Especiais',
            'compacto': 'Atuadores Compactos',
            'guiado': 'Atuadores Guiados',
            'normalizado': 'Atuadores Normalizados',
            'haste': 'Atuadores Sem Haste',
            'rotativo': 'Atuadores Rotativos',
            'valvula': 'Válvulas',
            'instrumento': 'Instrumentação',
            'linear': 'Movimentação Linear'
        };
        return categorias[categoria] || categoria;
    }
    
    // Adicionar eventos aos botões de ação
    function adicionarEventosAcoesProduto(row) {
        // Botão editar
        const editBtn = row.querySelector('.edit-btn');
        editBtn.addEventListener('click', function() {
            const produtoId = this.getAttribute('data-id');
            // Aqui você normalmente buscaria os dados do produto no servidor
            // Estamos simulando com dados fixos para demonstração
            
            const produto = {
                id: produtoId,
                nome: "Garra Paralela HFZ",
                codigo: "HFZ",
                categoria: "garra",
                descricao: "Garra paralela para manipulação de peças",
                especificacoes: {
                    "Tipo": "Garra Paralela",
                    "Aplicação": "Manipulação geral",
                    "Modelo": "HFZ"
                },
                imagem: "imagens/produtos/hfz.jpg"
            };
            
            // Preencher formulário
            document.getElementById('produto-id').value = produto.id;
            document.getElementById('produto-nome').value = produto.nome;
            document.getElementById('produto-codigo').value = produto.codigo;
            document.getElementById('produto-categoria').value = produto.categoria;
            document.getElementById('produto-descricao').value = produto.descricao;
            document.getElementById('produto-especificacoes').value = JSON.stringify(produto.especificacoes, null, 2);
            imagemPreview.innerHTML = `<img src="${produto.imagem}" alt="Preview">`;
            
            // Mostrar formulário
            produtoFormContainer.style.display = 'block';
        });
        
        // Botão excluir
        const deleteBtn = row.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja excluir este produto?')) {
                // Aqui você faria uma requisição AJAX para excluir no servidor
                // Estamos simulando a remoção da linha
                row.remove();
                alert('Produto excluído com sucesso!');
            }
        });
    }
    
    // Gerenciamento de Mensagens
    const messageItems = document.querySelector('.message-items');
    const messageSubject = document.getElementById('message-subject');
    const messageFrom = document.getElementById('message-from');
    const messageDate = document.getElementById('message-date');
    const messageContent = document.getElementById('message-content');
    const sendReplyBtn = document.getElementById('send-reply');
    
    // Simulação de mensagens (em um sistema real, viriam do servidor)
    const mensagens = [
        {
            id: 1,
            assunto: "Consulta sobre Garra Paralela HFZ",
            remetente: "João Silva",
            email: "joao@empresa.com.br",
            data: "10/05/2023 14:30",
            conteudo: "Bom dia, gostaria de saber mais informações sobre a Garra Paralela HFZ e como posso adquirir.",
            lida: false
        },
        {
            id: 2,
            assunto: "Orçamento para Atuadores",
            remetente: "Maria Oliveira",
            email: "maria@industria.com.br",
            data: "09/05/2023 10:15",
            conteudo: "Precisamos de um orçamento para 10 unidades de Atuadores Compactos ACQ para nosso novo projeto.",
            lida: true
        },
        {
            id: 3,
            assunto: "Dúvida sobre Válvulas",
            remetente: "Carlos Mendes",
            email: "carlos@mecanica.com.br",
            data: "08/05/2023 16:45",
            conteudo: "Qual a diferença entre as válvulas 4V e 6V? Precisamos para um sistema de alta ciclagem.",
            lida: false
        }
    ];
    
    // Carregar mensagens na lista
    function carregarMensagens() {
        messageItems.innerHTML = '';
        
        mensagens.forEach(msg => {
            const messageItem = document.createElement('div');
            messageItem.className = `message-item ${msg.lida ? '' : 'unread'}`;
            messageItem.setAttribute('data-id', msg.id);
            
            messageItem.innerHTML = `
                <div class="message-item-header">
                    <span class="message-sender">${msg.remetente}</span>
                    <span class="message-date">${msg.data}</span>
                </div>
                <div class="message-preview">${msg.assunto}</div>
            `;
            
            messageItem.addEventListener('click', function() {
                // Marcar como lida
                msg.lida = true;
                messageItem.classList.remove('unread');
                
                // Mostrar mensagem no painel de visualização
                mostrarMensagem(msg);
            });
            
            messageItems.appendChild(messageItem);
        });
    }
    
    // Mostrar mensagem selecionada
    function mostrarMensagem(msg) {
        messageSubject.textContent = msg.assunto;
        messageFrom.textContent = `${msg.remetente} (${msg.email})`;
        messageDate.textContent = msg.data;
        messageContent.innerHTML = `<p>${msg.conteudo}</p>`;
    }
    
    // Enviar resposta (simulado)
    sendReplyBtn.addEventListener('click', function() {
        const replyText = document.getElementById('reply-text').value;
        if (replyText.trim() === '') {
            alert('Digite uma resposta antes de enviar.');
            return;
        }
        
        // Aqui você normalmente enviaria a resposta por e-mail ou salvaria no banco de dados
        alert('Resposta enviada com sucesso!');
        document.getElementById('reply-text').value = '';
    });
    
    // Carregar dados iniciais
    carregarMensagens();
    
    // Simular alguns produtos na tabela
    const produtosIniciais = [
        {
            id: '1',
            nome: 'Garra Paralela HFZ',
            codigo: 'HFZ',
            categoria: 'garra',
            imagem: 'imagens/produtos/hfz.jpg'
        },
        {
            id: '2',
            nome: 'Atuador Compacto ACQ',
            codigo: 'ACQ',
            categoria: 'compacto',
            imagem: 'imagens/produtos/acq.jpg'
        },
        {
            id: '3',
            nome: 'Válvula Direcional Solenoide 4V',
            codigo: '4V',
            categoria: 'valvula',
            imagem: 'imagens/produtos/4v.jpg'
        }
    ];
    
    produtosIniciais.forEach(produto => adicionarProdutoNaTabela(produto));
    
    // Atualizar estatísticas
    document.getElementById('total-produtos').textContent = produtosIniciais.length;
    document.getElementById('novas-mensagens').textContent = mensagens.filter(m => !m.lida).length;
});