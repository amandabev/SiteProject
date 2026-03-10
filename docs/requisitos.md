# Requisitos do Projeto — NutriAcesso

## Requisitos Funcionais

### RF01 — Cadastro de Nutricionista
- O profissional deve preencher: nome completo, CRN, estado, cidade, especialidades, modalidade de atendimento (presencial/online), formas de contato (WhatsApp, e-mail, Instagram), valor da consulta social e uma breve descrição
- O cadastro deve passar por aprovação antes de ser exibido

### RF02 — Listagem de Profissionais
- Exibir cards com nome, foto (opcional), especialidade e localização
- Permitir filtrar por: estado, cidade, especialidade, modalidade (presencial/online)

### RF03 — Perfil do Profissional
- Página individual com todos os dados do nutricionista
- Botões de contato (WhatsApp, e-mail)
- Indicação clara de que é atendimento a preço social

### RF04 — Painel Administrativo
- Visualizar cadastros pendentes
- Aprovar ou recusar cadastros
- Editar ou remover perfis publicados

## Requisitos Não Funcionais

### RNF01 — Responsividade
- O site deve funcionar bem em dispositivos móveis e desktop

### RNF02 — Acessibilidade
- Seguir boas práticas de acessibilidade (contraste, alt text, navegação por teclado)

### RNF03 — Performance
- Carregamento rápido da listagem de profissionais

### RNF04 — Segurança
- Dados de contato dos profissionais devem ser exibidos apenas após cadastro aprovado
- Proteção básica contra spam no formulário de cadastro

## Em aberto / A decidir

- [ ] Tecnologia de frontend (HTML puro, React, Next.js...)
- [ ] Backend e banco de dados
- [ ] Hospedagem
- [ ] Design visual / identidade da marca
- [ ] Nome definitivo da plataforma
