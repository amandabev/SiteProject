"""Script para popular o banco com dados de exemplo."""
from app import app
from database import db
from models.nutritionist import Nutritionist

with app.app_context():
    db.create_all()

    examples = [
        Nutritionist(
            name='Ana Paula Souza',
            crn='CRN-3 12345',
            email='ana.souza@email.com',
            whatsapp='11999990001',
            instagram='@anapaula.nutri',
            state='SP',
            city='São Paulo',
            modality='online',
            specialties='Nutrição Clínica,Emagrecimento',
            social_price='R$ 30,00',
            bio='Nutricionista com 5 anos de experiência em nutrição clínica e funcional. Atendo online com horários flexíveis.',
            status='approved'
        ),
        Nutritionist(
            name='Carlos Mendes',
            crn='CRN-6 54321',
            email='carlos.mendes@email.com',
            whatsapp='31988880002',
            state='MG',
            city='Belo Horizonte',
            modality='ambos',
            specialties='Nutrição Esportiva,Hipertrofia',
            social_price='R$ 40,00',
            bio='Especialista em nutrição esportiva. Atendo presencialmente em BH e online para todo o Brasil.',
            status='approved'
        ),
        Nutritionist(
            name='Mariana Lima',
            crn='CRN-1 99887',
            email='mariana.lima@email.com',
            whatsapp='21977770003',
            instagram='@mariana.nutri',
            state='RJ',
            city='Rio de Janeiro',
            modality='presencial',
            specialties='Nutrição Infantil,Gestantes',
            social_price='R$ 25,00',
            bio='Atendo crianças e gestantes com foco em saúde e qualidade de vida.',
            status='approved'
        ),
    ]

    for n in examples:
        db.session.add(n)

    db.session.commit()
    print('Banco populado com sucesso!')
