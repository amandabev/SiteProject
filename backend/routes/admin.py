from flask import Blueprint, request, jsonify, session
from database import db
from models.nutritionist import Nutritionist
from functools import wraps

admin_bp = Blueprint('admin', __name__)

# Credenciais simples de admin (em produção, usar autenticação robusta)
ADMIN_USER = 'admin'
ADMIN_PASS = 'nutriacesso2024'


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get('admin_logged_in'):
            return jsonify({'error': 'Não autorizado'}), 401
        return f(*args, **kwargs)
    return decorated


@admin_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if data.get('username') == ADMIN_USER and data.get('password') == ADMIN_PASS:
        session['admin_logged_in'] = True
        return jsonify({'message': 'Login realizado com sucesso'})
    return jsonify({'error': 'Credenciais inválidas'}), 401


@admin_bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Logout realizado'})


@admin_bp.route('/pending', methods=['GET'])
@login_required
def list_pending():
    pending = Nutritionist.query.filter_by(status='pending').order_by(Nutritionist.created_at).all()
    return jsonify([n.to_dict() for n in pending])


@admin_bp.route('/all', methods=['GET'])
@login_required
def list_all():
    nutritionists = Nutritionist.query.order_by(Nutritionist.created_at.desc()).all()
    return jsonify([n.to_dict() for n in nutritionists])


@admin_bp.route('/approve/<int:id>', methods=['POST'])
@login_required
def approve(id):
    nutritionist = Nutritionist.query.get_or_404(id)
    nutritionist.status = 'approved'
    db.session.commit()
    return jsonify({'message': f'{nutritionist.name} aprovado com sucesso.'})


@admin_bp.route('/reject/<int:id>', methods=['POST'])
@login_required
def reject(id):
    nutritionist = Nutritionist.query.get_or_404(id)
    nutritionist.status = 'rejected'
    db.session.commit()
    return jsonify({'message': f'{nutritionist.name} recusado.'})


@admin_bp.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete(id):
    nutritionist = Nutritionist.query.get_or_404(id)
    db.session.delete(nutritionist)
    db.session.commit()
    return jsonify({'message': 'Perfil removido com sucesso.'})
