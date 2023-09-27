# Gerenciador de Projetos

Este é o repositório do **Gerenciador de Projetos**, uma aplicação que ajuda a organizar e acompanhar projetos. Este README fornecerá informações sobre como configurar e usar a aplicação.

## Requisitos

Antes de começar, certifique-se de que você tenha o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v18.2.0 ou superior)
- [npm](https://www.npmjs.com/) (v9.0.0 ou superior)
- [MySQL](https://www.mysql.com/) (v5.7 ou superior) - O servidor de banco de dados

## Configuração

Siga as etapas abaixo para configurar e iniciar a aplicação.

### Frontend

1. Navegue até a pasta `costs`:

   ```bash
   cd costs
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie a aplicação frontend:

   ```bash
   npm start
   ```

A aplicação frontend será executada em [http://localhost:3000](http://localhost:3000).

### Backend

1. Navegue até a pasta `server`:

   ```bash
   cd server
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados MySQL:

   - Crie um banco de dados MySQL chamado `gerenciador_projetos`.
   - Edite o arquivo `server.js` para definir as informações de conexão com o banco de dados, se necessário.

4. Inicie o servidor backend:

   ```bash
   npm run dev
   ```

O servidor backend será executado em [http://localhost:5000](http://localhost:5000).

### Banco de Dados

O servidor backend utiliza o MySQL como banco de dados. Certifique-se de configurar corretamente as tabelas e as relações necessárias no banco de dados para que a aplicação funcione corretamente.

## Funcionalidades

O Gerenciador de Projetos permite:

- Criar, visualizar, atualizar e excluir projetos.
- Associar projetos a tarefas e colaboradores.
- Acompanhar o status e o progresso dos projetos.
- Gerenciar colaboradores e atribuir tarefas.
- Gerar relatórios e gráficos para análise de projetos.

## Contribuindo

Sinta-se à vontade para contribuir com melhorias para este projeto. Para contribuir, siga estas etapas:

1. Faça um fork deste repositório.
2. Crie um branch para suas alterações: `git checkout -b feature/nova-funcionalidade`.
3. Faça as alterações desejadas e faça commit delas: `git commit -m "Adicione uma nova funcionalidade"`.
4. Envie suas alterações: `git push origin feature/nova-funcionalidade`.
5. Abra uma solicitação pull neste repositório.

## Licença

Este projeto está licenciado sob a Licença ISC. Consulte o arquivo `LICENSE` para obter detalhes.

---

Divirta-se gerenciando seus projetos com o **Gerenciador de Projetos**! Se tiver alguma dúvida ou encontrar problemas, não hesite em entrar em contato.
