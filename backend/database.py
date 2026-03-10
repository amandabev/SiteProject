from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Nutricionista(db.Model):
    __tablename__ = 'nutricionistas'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(150), nullable=False)
    crn = db.Column(db.String(30), nullable=False)
    estado = db.Column(db.String(2), nullable=False)
    cidade = db.Column(db.String(100), nullable=False)
    especialidades = db.Column(db.String(300), nullable=False)  # separado por vírgula
    modalidade = db.Column(db.String(20), nullable=False)       # presencial, online, ambos
    contato_whatsapp = db.Column(db.String(20))
    contato_email = db.Column(db.String(150))
    contato_instagram = db.Column(db.String(100))
    valor_social = db.Column(db.String(50))
    descricao = db.Column(db.Text)
    aprovado = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'crn': self.crn,
            'estado': self.estado,
            'cidade': self.cidade,
            'especialidades': self.especialidades.split(','),
            'modalidade': self.modalidade,
            'contato_whatsapp': self.contato_whatsapp,
            'contato_email': self.contato_email,
            'contato_instagram': self.contato_instagram,
            'valor_social': self.valor_social,
            'descricao': self.descricao,
            'aprovado': self.aprovado
        }
