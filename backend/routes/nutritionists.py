from flask import Blueprint, request, jsonify
from database import db
from models.nutritionist import Nutritionist

nutritionists_bp = Blueprint('nutritionists', __name__)


@nutritionists_bp.route('/', methods=['GET'])
def list_nutritionists():
    """Lista nutricionistas aprovados com filtros opcionais."""
    state = request.args.get('state')
    modality = request.args.get('modality')
    specialty = request.args.get('specialty')

    query = Nutritionist.query.filter_by(status='approved')

    if state:
        query = query.filter_by(state=state)
    if modality and modality != 'todos':
        query = query.filter(Nutritionist.modality.in_([modality, 'ambos']))
    if specialty:
        query = query.filter(Nutritionist.specialties.contains(specialty))

    nutritionists = query.order_by(Nutritionist.name).all()
    return jsonify([n.to_dict() for n in nutritionists])


@nutritionists_bp.route('/<int:id>', methods=['GET'])
def get_nutritionist(id):
    """Retorna perfil de um nutricionista aprovado."""
    nutritionist = Nutritionist.query.filter_by(id=id, status='approved').first_or_404()
    return jsonify(nutritionist.to_dict())


@nutritionists_bp.route('/register', methods=['POST'])
def register():
    """Cadastro de novo nutricionista (fica pendente até aprovação)."""
    data = request.get_json()

    required = ['name', 'crn', 'email', 'state', 'city', 'modality']
    for field in required:
        if not data.get(field):
            return jsonify({'error': f'Campo obrigatório ausente: {field}'}), 400

    if Nutritionist.query.filter_by(crn=data['crn']).first():
        return jsonify({'error': 'CRN já cadastrado.'}), 409

    nutritionist = Nutritionist(
        name=data['name'],
        crn=data['crn'],
        email=data['email'],
        whatsapp=data.get('whatsapp'),
        instagram=data.get('instagram'),
        state=data['state'],
        city=data['city'],
        modality=data['modality'],
        specialties=','.join(data.get('specialties', [])),
        social_price=data.get('social_price'),
        bio=data.get('bio'),
        photo_url=data.get('photo_url')
    )

    db.session.add(nutritionist)
    db.session.commit()

    return jsonify({'message': 'Cadastro enviado com sucesso! Aguarde a aprovação.', 'id': nutritionist.id}), 201
