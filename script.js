// Evento para o botão de consulta
document.getElementById('searchButton').addEventListener('click', function () {
    // Obtém o valor do CNPJ digitado pelo usuário
    const cnpj = document.getElementById('cnpjInput').value;

    // Realiza a consulta na API da BrasilAPI
    fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
        .then(response => response.json())
        .then(data => {
            // Preenche os campos do formulário com os dados recebidos
            document.getElementById('nome').value = data.nome_fantasia || data.razao_social || '';
            document.getElementById('razao_social').value = data.razao_social || '';
            document.getElementById('data_inicio_atividade').value = data.data_inicio_atividade || '';
            document.getElementById('descricao_situacao_cadastral').value = data.descricao_situacao_cadastral || '';
            document.getElementById('cnae_fiscal_descricao').value = data.cnae_fiscal_descricao || '';
            document.getElementById('endereco').value = `${data.descricao_tipo_de_logradouro} ${data.logradouro}, ${data.numero}, ${data.complemento}, ${data.bairro}, ${data.municipio} - ${data.uf}, CEP: ${data.cep}` || '';
            document.getElementById('telefone').value = data.ddd_telefone_1 || '';
            document.getElementById('email').value = data.email || '';

            // Preenche a seção de sócios
            const sociosContainer = document.getElementById('socios');
            sociosContainer.innerHTML = '';
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

            // Mostra os resultados e oculta a tela de consulta
            document.getElementById('consulta').classList.add('hidden');
            document.getElementById('result').classList.remove('hidden');
        })
        .catch(error => {
            console.error('Erro ao consultar CNPJ:', error);
            alert('CNPJ inválido ou erro na consulta.');
        });
});

// Evento para o botão de voltar
document.getElementById('backButton').addEventListener('click', function () {
    // Volta para a tela de consulta e reseta os dados do formulário
    document.getElementById('consulta').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('companyData').reset();
    document.getElementById('socios').innerHTML = '';
});
