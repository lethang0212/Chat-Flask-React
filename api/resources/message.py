from datetime import datetime
from typing_extensions import Required

from flask import (
    Blueprint, flash, g, json, redirect, render_template, request, session
)
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import get_jwt_identity, jwt_required, JWTManager


from api.resources.db import get_db

from random import randint

bp = Blueprint('message', __name__, url_prefix='/api')
api = Api(bp)

class Message(Resource):
    @jwt_required()
    def get(self):
        parse = reqparse.RequestParser()
        parse.add_argument('search_key',required=False)
        parse.add_argument('message_id',required=False,type=int)
        parse.add_argument('conversation_id',required=False,type=int)
        
        db = get_db()
        
        args = parse.parse_args()
        
        query = 'SELECT * FROM message '
        if len(args):
            query += 'WHERE '
        
        if args['search_key']:
            query += f"content LIKE '%{args['search_key']}%' AND "
        if args['message_id']:
            query += f"messid = {args['message_id']} AND "
        if args['conversation_id']:
            query += f"guid ={args['conversation_id']} AND "
            
        if len(args):
            query = query[0:-4]
            
        cursor = db.cursor()
        messages = [dict((cursor.description[i][0], val) for i, val in enumerate(row)) for row in cursor.execute(query)]
        if len(messages):
            return messages,200
        return {"msg":"No message found..."},404
    @jwt_required()
    def post(self):
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('content',required=True)
        parser.add_argument('guid',required=True,type = int)
        args = parser.parse_args()
        
        db = get_db()
        current_time = datetime.now()
        message = {'time' : str(current_time), 'uid' : get_jwt_identity(), 'guid' : args['guid'], 'content' : args['content']}
        try:
            db.execute(
                'INSERT INTO message (time, uid, guid, content) VALUES(?,?,?,?)',
                (str(current_time), get_jwt_identity(), args['guid'], args['content'])
            )
            db.commit()
        except db.IntegrityError:
            return {'msg':'something happened'},409
        return message,201