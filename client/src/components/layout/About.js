import React, { Fragment } from 'react'

const About = () => {
    return (
        <Fragment>
            <h1 className="large text-primary"><i className="fas fa-exclamation-circle"></i> Sobre</h1>
            <hr className="my-15" />
            <div>
                <p className="lead"><i className="fas fa-bullseye"></i> Propósito</p>
                <p>Projeto web para praticar/treinar/testar automação de testes E2E e API com Cypress.io ou qualquer outro framework de teste</p>
            </div>
            <div className="my-2">
                <p className="lead"><i className="fas fa-sitemap"></i> Funcionalidades</p>
                <ul>
                    <li>- Registrar usuário com senhas criptografadas</li>
                    <li>- Login via JWT (JSON Web Token)</li>
                    <li>- Criar perfil de usuário com experiências profissionais, formações acadêmicas e redes sociais</li>
                    <li>- Integração com GitHub para exibir os últimos 5 repositórios</li>
                    <li>- Postar dúvidas/sugestões/perguntas ou qualquer iteração com a comunidade de QA</li>
                    <li>- Like/Unlike em posts</li>
                    <li>- Criar threads de conversas em posts</li>
                    <li>- Páginação de posts e comentários a partir de 7 posts</li>
                </ul>
            </div>
            <div className="my-2">
                <p className="lead"><i className="fab fa-github"></i> GitHub Repositório</p>
                <a href="https://github.com/pehguerra/conexaoQA" target="_blank" rel="noopener noreferrer">ConexãoQA Repositório</a>
            </div>
            <div className="my-2">
                <p className="lead"><i className="fas fa-cog"></i> Swagger - Documentação da API</p>
                <a href="https://conexaoqa.herokuapp.com/api-docs/" target="_blank" rel="noopener noreferrer">Express API com Swagger</a>
            </div>
            <div className="my-2">
                <p className="lead"><i className="fab fa-medium"></i> Medium</p>
                <a href="https://conexaoqa.herokuapp.com/api-docs/" target="_blank" rel="noopener noreferrer">Artigos de Cypress</a>
            </div>
        </Fragment>
    )
}

export default About






