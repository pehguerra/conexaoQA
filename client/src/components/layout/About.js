import React, { Fragment } from 'react'

const About = () => {
    return (
        <Fragment>
            <h1 className="large text-primary"><i className="fas fa-exclamation-circle"></i> Sobre</h1>
            <hr style={{ marginTop: '30px' }} />
            <div style={{ textAlign: 'right', marginTop: '5px', marginBottom: '20px' }}>
                <p data-test="about-developer" style={{ fontSize: '13px' }}>Criado e desenvolvido por Pedro Guerra</p>
            </div>
            <div>
                <p className="lead"><i className="fas fa-bullseye"></i> Propósito</p>
                <p data-test="about-description">Projeto web para praticar/treinar/testar automação de testes com Cypress.io ou qualquer outro framework de teste</p>
            </div>
            <div className="my-2">
                <p className="lead"><i className="fas fa-sitemap"></i> Funcionalidades</p>
                <ul data-test="about-features">
                    <li>- Registrar usuário com senhas criptografadas</li>
                    <li>- Login com JWT (JSON Web Token)</li>
                    <li>- Criar perfil de usuário com experiências profissionais, formações acadêmicas e redes sociais</li>
                    <li>- Integração com GitHub para exibir os últimos 5 repositórios</li>
                    <li>- Postar dúvidas/sugestões/perguntas ou qualquer iteração com a comunidade de QA</li>
                    <li>- Like/Unlike em posts</li>
                    <li>- Criar threads de conversas em posts</li>
                    <li>- Páginação de posts e comentários a partir de 7 posts</li>
                    <li>- Atributo data-test para elementos HTML</li>
                    <li>- Redux DevTools (Extensão Chrome) habilitado para o site</li>
                    <li>- Redux Store disponível no window.store e estado inicial do state disponível no window.initialState</li>
                </ul>
            </div>
            <div className="my-2">
                <p className="lead"><i className="fab fa-github"></i> GitHub Repositório</p>
                <a href="https://github.com/pehguerra/conexaoQA" target="_blank" rel="noopener noreferrer" data-test="about-github">ConexãoQA Repositório</a>
            </div>
            <div className="my-2">
                <p className="lead"><i className="fas fa-cog"></i> Swagger - Documentação da API</p>
                <a href="https://conexaoqa.herokuapp.com/api-docs/" target="_blank" rel="noopener noreferrer" data-test="about-swagger">Express API com Swagger</a>
            </div>
            <div className="my-2">
                <p className="lead"><i className="fab fa-medium"></i> Medium</p>
                <a href="https://pedrohsguerra.medium.com/" target="_blank" rel="noopener noreferrer" data-test="about-medium">Artigos de Cypress</a>
            </div>
        </Fragment>
    )
}

export default About






