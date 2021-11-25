from datetime import datetime
from typing_extensions import Required

from flask import (
    Blueprint, flash, g, json, redirect, render_template, request, session
)
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import get_jwt_identity, jwt_required, JWTManager

from api.resources.db import get_db

bp = Blueprint('conversation', __name__, url_prefix='/api') 
api = Api(bp)

class conversation(Resource):
    @jwt_required()
    def get(self,guid):
        db = get_db()
        query = f"SELECT * FROM message WHERE guid = {guid}"
        message = db.execute(query).fetchone()
        if not message:
            return {"msg":"Message not found..."},404
        
        user = get_jwt_identity()
        
        if user != 1 and user != message['uid']:
            return {"msg":"You don't have permission to edit this message"},401

        cursor = db.cursor()
        messages = [dict((cursor.description[i][0], val) for i, val in enumerate(row)) for row in cursor.execute(query)]
        return messages,200

class chatList(Resource):
    @jwt_required()
    def get(self,uid):
        uid1 = get_jwt_identity()
        if uid1 != int(uid): return{"msg":"Not have access"}
        db = get_db()
        cursor = db.cursor()
        mess = [dict((cursor.description[i][0], val) for i, val in enumerate(row)) for row in cursor.execute('SELECT conversation.* FROM message,conversation WHERE message.uid = ? and conversation.guid = message.guid',(uid))]
        if len(mess):
            return mess,200
        return {"msg":"No message"},404
        
        


        


        

        
