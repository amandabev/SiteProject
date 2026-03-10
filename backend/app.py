from flask import Flask
from flask_cors import CORS
from database import db
from routes.nutritionists import nutritionists_bp
from routes.admin import admin_bp

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nutriacesso.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'change-this-secret-key'

CORS(app)
db.init_app(app)

app.register_blueprint(nutritionists_bp, url_prefix='/api/nutritionists')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
