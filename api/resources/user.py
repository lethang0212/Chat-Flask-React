from datetime import datetime
from flask_jwt_extended import JWTManager
from flask import   (
    Blueprint, current_app, flash, g, json, redirect, render_template, request, session
)
from flask_jwt_extended import jwt_manager
from flask_restful import Api, Resource
from werkzeug.security import generate_password_hash
from api.resources.db import get_db

bp = Blueprint('user', __name__, url_prefix='/api')
api = Api(bp)

class users(Resource):
    def get(self, uid):
        db = get_db()
        cursor = db.cursor()
        user = [dict((cursor.description[i][0], val) for i, val in enumerate(row)) for row in cursor.execute('SELECT * FROM user WHERE user.uid = ?',(uid))]
        return user

    def change_dpn_pass():
        db = get_db()
        with current_app.open_resource('resources/schema.sql') as f:
            db.executescript(f.read().decode('utf8'))
            db.execute(f"UPDATE user (display_name, password) VALUES ('admin',?)", (generate_password_hash('admin'), )
            )
            db.commit()
