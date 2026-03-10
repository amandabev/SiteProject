from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from database import db, Nutricionista
import os

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nutriacesso.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.create_all()

# --- Rotas Frontend ---
@app.route('/')
def index():
    return send_from_directory('../frontend', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('../frontend', path)

# --- API ---

@app.route('/api/profissionais', methods=['GET'])
def listar_profissionais():
    estado = request.args.get('estado')
    especialidade = request.args.get('especialidade')
    modalidade = request.args.get('modalidade')

    query = Nutricionista.query.filter_by(aprovado=True)
    if estado:
        query = query.filter_by(estado=estado)
    if especialidade:
        query = query.filter(Nutricionista.especialidades.contains(especialidade))
    if modalidade:
        query = query.filter_by(modalidade=modalidade)

    profissionais = query.all()
    return jsonify([p.to_dict() for p in profissionais])

@app.route('/api/profissionais/<int:id>', methods=['GET'])
def perfil_profissional(id):
    p = Nutricionista.query.filter_by(id=id, aprovado=True).first_or_404()
    return jsonify(p.to_dict())

@app.route('/api/cadastro', methods=['POST'])
def cadastrar_profissional():
    data = request.get_json()
    campos = ['nome', 'crn', 'estado', 'cidade', 'especialidades', 'modalidade', 'contato_whatsapp', 'contato_email']
    for campo in campos:
        if not data.get(campo):
            return jsonify({'erro': f'Campo obrigatório: {campo}'}), 400

    novo = Nutricionista(
        nome=data['nome'],
        crn=data['crn'],
        estado=data['estado'],
        cidade=data['cidade'],
        especialidades=data['especialidades'],
        modalidade=data['modalidade'],
        contato_whatsapp=data.get('contato_whatsapp', ''),
        contato_email=data.get('contato_email', ''),
        contato_instagram=data.get('contato_instagram', ''),
        valor_social=data.get('valor_social', ''),
        descricao=data.get('descricao', ''),
        aprovado=False
    )
    db.session.add(novo)
    db.session.commit()
    return jsonify({'mensagem': 'Cadastro recebido! Aguarde aprovação.'}), 201

# --- Admin ---
@app.route('/api/admin/pendentes', methods=['GET'])
def admin_pendentes():
    pendentes = Nutricionista.query.filter_by(aprovado=False).all()
    return jsonify([p.to_dict() for p in pendentes])

@app.route('/api/admin/aprovar/<int:id>', methods=['POST'])
def admin_aprovar(id):
    p = Nutricionista.query.get_or_404(id)
    p.aprovado = True
    db.session.commit()
    return jsonify({'mensagem': 'Profissional aprovado.'})

@app.route('/api/admin/recusar/<int:id>', methods=['DELETE'])
def admin_recusar(id):
    p = Nutricionista.query.get_or_404(id)
    db.session.delete(p)
    db.session.commit()
    return jsonify({'mensagem': 'Cadastro removido.'})

if __name__ == '__main__':
    app.run(debug=True)
