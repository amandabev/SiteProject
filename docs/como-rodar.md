# Como rodar o projeto localmente

## Pré-requisitos

- Python 3.10+
- pip

## 1. Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

O servidor sobe em: `http://localhost:5000`

## 2. Frontend

Abre o arquivo `frontend/index.html` diretamente no navegador — ou rode com um servidor local:

```bash
# Com Python
cd frontend
python -m http.server 8080
```

Acesse: `http://localhost:8080`

## Painel Admin

Acesse: `http://localhost:8080/admin.html`

> ⚠️ O painel admin ainda não tem autenticação. Para produção, adicionar login protegido.

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/profissionais | Lista profissionais aprovados |
| GET | /api/profissionais/:id | Perfil de um profissional |
| POST | /api/cadastro | Envia novo cadastro |
| GET | /api/admin/pendentes | Lista cadastros aguardando aprovação |
| POST | /api/admin/aprovar/:id | Aprova um cadastro |
| DELETE | /api/admin/recusar/:id | Remove um cadastro |
