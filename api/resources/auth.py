from datetime import timedelta

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session
)
from werkzeug.security import check_password_hash, generate_password_hash
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import create_access_token

from api.resources.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/api/auth')
api = Api(bp)

# quy: haha, thang: hehe, khang: 123

parser = reqparse.RequestParser(bundle_errors=True)
parser.add_argument('username', required=True)
parser.add_argument('password', required=True)

class register(Resource):
    def post(self):

        db = get_db()
        args = parser.parse_args()
        user = {'username': args['username'], 'password': generate_password_hash(args['password'])}
        try:
            db.execute(
                'INSERT INTO user (username, password) VALUES (?, ?)',
                (args['username'], generate_password_hash(args['password']))
            )
            db.commit()
        except db.IntegrityError:
            return {'msg': 'Username already exists'}, 409
        return user, 201

class login(Resource):
    def post(self):
        db = get_db()
        args = parser.parse_args()
        user = db.execute(
            'SELECT * FROM user WHERE username = ?', (args['username'],)
        ).fetchone()

        if user is None:
            return {'msg': 'Wrong username'}, 401
        elif not check_password_hash(user['password'], args['password']):
            return {'msg': 'Incorrect password'}, 401
        
        expires = timedelta(days=7)
        access_token = create_access_token(identity=user['id'], expires_delta=expires)
        return {'token': access_token}, 200



class usersList(Resource):
    def get(self):
        db = get_db()
        # users = db.execute('SELECT * FROM user').fetchall()
        cursor = db.cursor()
        users = [dict((cursor.description[i][0], val) for i, val in enumerate(row)) for row in cursor.execute('SELECT * FROM user')]
        return users




