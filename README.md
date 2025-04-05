# Projeto para o Bootcamp Dio Decola Tech 2025 - Sistema de Agendamento para Barbearia - Angular e Spring Boot

Este é um sistema de agendamento desenvolvido para gerenciar clientes e horários em uma barbearia. O projeto foi criado utilizando **Angular** no frontend e **Spring Boot** no backend, com integração ao banco de dados MySQL.

## Funcionalidades da Aplicação
- **Gerenciamento de Clientes**:
  - Cadastro, edição e exclusão de clientes.
  - Validação de dados, como e-mail e telefone no formato `(XX) XXXXX-XXXX`.
- **Gerenciamento de Agendamentos**:
  - Criação, edição e exclusão de agendamentos.
  - Filtro de agendamentos por data.
  - Validação de horários para evitar conflitos.
- **Design Responsivo**:
  - Interface adaptada para dispositivos móveis, com tabelas roláveis horizontalmente.
- **Regras de Negócio**:
  - Clientes com agendamentos associados, ao serem excluídos, têm todos os seus agendamentos também excluídos.
 
## Principais Tecnologias
- **Frontend**:
  - **Angular**: Framework para desenvolvimento de aplicações web dinâmicas.
  - **TypeScript**: Superset do JavaScript com tipagem estática.
  - **Angular Material**: Biblioteca de componentes para estilização e usabilidade.
- **Backend**:
  - **Spring Boot**: Framework para criação de APIs RESTful.
  - **Hibernate**: ORM para gerenciamento do banco de dados.
  - **MySQL**: Banco de dados relacional.
- **Outras Tecnologias**:
  - **RxJS**: Para manipulação de eventos assíncronos no Angular.
  - **Lombok**: Para simplificar o código Java no backend.
 
## Estrutura do Projeto
- **Frontend**:
  - Localizado no diretório `frontend/`.
  - Gerado com [Angular CLI](https://github.com/angular/angular-cli).
- **Backend**:
  - Localizado no diretório `backend/`.
  - Gerado com [Spring Initializr](https://start.spring.io/).

## Configuração do Ambiente

1. Configure o banco de dados MySQL:
   - Este arquivo `application.properties` está configurado para criar o banco de dados `barbearia` automaticamente.
   - Certifique-se de que as suas credenciais de acesso estão corretas:
  ```properties
  spring.datasource.url=jdbc:mysql://localhost:3306/barbearia?useSSL=false&serverTimezone=UTC&createDatabaseIfNotExist=true
  spring.datasource.username=root
  spring.datasource.password=
  ```

2. Inicie o servidor de desenvolvimento do front e backend:
    - Na pasta raiz do projeto, execute:
  ```bash
  npm run start
  ```

3. Acesse a aplicação no navegador:
    - URL: http://localhost:4200/

## Recursos Adicionais
- **Filtros e Validações**:
  - Filtro de agendamentos por data no frontend.
  - Validação de horários para evitar conflitos.
- **Exclusão em Cascata**:
  - Exclusão de agendamentos associados ao cliente ao deletar o cliente.
- **Responsividade**:
  - Tabelas roláveis horizontalmente em dispositivos móveis.

## Referências
- [Protítipo do projeto](https://www.canva.com/design/DAGja4orYJs/rzQXjYmECwwiZGkPd8R18w/edit?utm_content=DAGja4orYJs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [MySQL Documentation](https://dev.mysql.com/doc/)
