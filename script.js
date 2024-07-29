// Variável para armazenar os dados da última consulta, permitindo reuso se necessário
let previousData = null;

// Adiciona um ouvinte de evento ao botão de consulta
document.getElementById('searchButton').addEventListener('click', function () {
    // Obtém o valor do CNPJ digitado pelo usuário
    const cnpj = document.getElementById('cnpjInput').value;

    // Faz uma requisição para a API da BrasilAPI com o CNPJ fornecido
    fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
        .then(response => response.json())  // Converte a resposta para JSON
        .then(data => {
            // Armazena os dados retornados para uso futuro
            previousData = data;

            // Preenche os campos do formulário com os dados retornados da API, se disponíveis
            document.getElementById('nome').value = data.nome_fantasia || '';
            document.getElementById('razao_social').value = data.razao_social || '';
            document.getElementById('data_inicio_atividade').value = data.data_inicio_atividade || '';
            document.getElementById('descricao_situacao_cadastral').value = data.descricao_situacao_cadastral || '';
            document.getElementById('cnae_fiscal_descricao').value = data.cnae_fiscal_descricao || '';
            document.getElementById('endereco').value = `${data.descricao_tipo_de_logradouro} ${data.logradouro}, ${data.numero}, ${data.complemento}, ${data.bairro}, ${data.municipio} - ${data.uf}, CEP: ${data.cep}` || '';
            document.getElementById('telefone').value = data.ddd_telefone_1 || '';
            document.getElementById('email').value = data.email || '';

            // Limpa e atualiza a lista de sócios com os dados retornados
            const sociosContainer = document.getElementById('socios');
            sociosContainer.innerHTML = '';
            if (data.qsa) {
                data.qsa.forEach(socio => {
                    const card = document.createElement('div');
                    card.className = 'socio-card';
                    card.innerHTML = `
                        <p><strong>Nome:</strong> ${socio.nome_socio}</p>
                        <p><strong>Qualificação:</strong> ${socio.codigo_qualificacao_socio}</p>
                        <p><strong>Percentual Capital Social:</strong> ${socio.percentual_capital_social}</p>
                    `;
                    sociosContainer.appendChild(card);
                });
            } else {
                sociosContainer.innerHTML = 'Nenhum sócio encontrado.';
            }

            // Oculta a seção de consulta e mostra a seção de resultados
            document.getElementById('consulta').classList.add('hidden');
            document.getElementById('result').classList.remove('hidden');
        })
        .catch(error => {
            // Exibe um alerta em caso de erro na requisição
            alert('Erro ao buscar os dados.');
        });
});

// Adiciona um ouvinte de evento ao botão de submissão dos dados
document.getElementById('submitButton').addEventListener('click', function () {
    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const razao_social = document.getElementById('razao_social').value;
    const data_inicio_atividade = document.getElementById('data_inicio_atividade').value;
    const descricao_situacao_cadastral = document.getElementById('descricao_situacao_cadastral').value;
    const cnae_fiscal_descricao = document.getElementById('cnae_fiscal_descricao').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    // Preenche a mensagem de confirmação com os dados do formulário
    document.getElementById('confirmNome').textContent = nome;
    document.getElementById('confirmRazaoSocial').textContent = razao_social;
    document.getElementById('confirmDataInicioAtividade').textContent = data_inicio_atividade;
    document.getElementById('confirmDescricaoSituacaoCadastral').textContent = descricao_situacao_cadastral;
    document.getElementById('confirmCnaeFiscalDescricao').textContent = cnae_fiscal_descricao;
    document.getElementById('confirmEndereco').textContent = endereco;
    document.getElementById('confirmTelefone').textContent = telefone;
    document.getElementById('confirmEmail').textContent = email;

    // Mostra a mensagem de confirmação e oculta a seção de resultados e o formulário
    document.getElementById('confirmationMessage').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('companyData').classList.add('hidden');
});

// Adiciona um ouvinte de evento ao botão de voltar na seção de resultados
document.getElementById('backButton').addEventListener('click', function () {
    // Mostra a seção de consulta e o formulário, e oculta a seção de resultados
    document.getElementById('result').classList.add('hidden');
    document.getElementById('consulta').classList.remove('hidden');
    document.getElementById('companyData').classList.remove('hidden');
});

// Adiciona um ouvinte de evento ao botão de voltar à tela de consulta na mensagem de confirmação
document.getElementById('returnToSearchButton').addEventListener('click', function () {
    // Oculta a mensagem de confirmação e mostra a tela de consulta e o formulário
    document.getElementById('confirmationMessage').classList.add('hidden');
    document.getElementById('consulta').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('companyData').classList.remove('hidden');

    // Limpa o formulário e a lista de sócios
    document.getElementById('companyData').reset();
    document.getElementById('socios').innerHTML = '';

    // Restaura os dados da última consulta, se disponíveis
    if (previousData) {
        document.getElementById('nome').value = previousData.nome_fantasia || '';
        document.getElementById('razao_social').value = previousData.razao_social || '';
        document.getElementById('data_inicio_atividade').value = previousData.data_inicio_atividade || '';
        document.getElementById('descricao_situacao_cadastral').value = previousData.descricao_situacao_cadastral || '';
        document.getElementById('cnae_fiscal_descricao').value = previousData.cnae_fiscal_descricao || '';
        document.getElementById('endereco').value = `${previousData.descricao_tipo_de_logradouro} ${previousData.logradouro}, ${previousData.numero}, ${previousData.complemento}, ${previousData.bairro}, ${previousData.municipio} - ${previousData.uf}, CEP: ${previousData.cep}` || '';
        document.getElementById('telefone').value = previousData.ddd_telefone_1 || '';
        document.getElementById('email').value = previousData.email || '';

        // Atualiza a lista de sócios com os dados da última consulta, se disponíveis
        const sociosContainer = document.getElementById('socios');
        sociosContainer.innerHTML = '';
        if (previousData.qsa) {
            previousData.qsa.forEach(socio => {
                const card = document.createElement('div');
                card.className = 'socio-card';
                card.innerHTML = `
                    <p><strong>Nome:</strong> ${socio.nome_socio}</p>
                    <p><strong>Qualificação:</strong> ${socio.codigo_qualificacao_socio}</p>
                    <p><strong>Percentual Capital Social:</strong> ${socio.percentual_capital_social}</p>
                `;
                sociosContainer.appendChild(card);
            });
        } else {
            sociosContainer.innerHTML = 'Nenhum sócio encontrado.';
        }
    }
});
