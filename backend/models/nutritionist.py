from database import db
from datetime import datetime

class Nutritionist(db.Model):
    __tablename__ = 'nutritionists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    crn = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False)
    whatsapp = db.Column(db.String(20))
    instagram = db.Column(db.String(100))
    state = db.Column(db.String(2), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    modality = db.Column(db.String(20), nullable=False)  # online, presencial, ambos
    specialties = db.Column(db.String(300))
    social_price = db.Column(db.String(50))
    bio = db.Column(db.Text)
    photo_url = db.Column(db.String(300))
    status = db.Column(db.String(20), default='pending')  # pending, approved, rejected
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'crn': self.crn,
            'email': self.email,
            'whatsapp': self.whatsapp,
            'instagram': self.instagram,
            'state': self.state,
            'city': self.city,
            'modality': self.modality,
            'specialties': self.specialties.split(',') if self.specialties else [],
            'social_price': self.social_price,
            'bio': self.bio,
            'photo_url': self.photo_url,
            'status': self.status,
            'created_at': self.created_at.isoformat()
        }
