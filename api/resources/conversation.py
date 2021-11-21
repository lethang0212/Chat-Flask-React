from datetime import timedelta

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session,jsonify
)
from flask_restful import Api, Resource, reqparse

from api.resources.db import get_db

bp = Blueprint('conversation', __name__, url_prefix='/api') 
api = Api(bp)

class conversation(Resource):
    def get(self,guid):
        db = get_db()
        cursor = db.cursor()
        users = [dict((cursor.description[i][0], val) for i, val in enumerate(row)) for row in cursor.execute('SELECT * FROM message WHERE message.guid = ?',(guid))]
        return users

class chatList(Resource):
    def get(self,uid):
        db = get_db()
        cursor = db.cursor()
        mess = [dict((cursor.description[i][0], val) for i, val in enumerate(row)) for row in cursor.execute('SELECT conversation.* FROM message,conversation WHERE message.uid = ? and conversation.guid = message.guid',(uid))]
        return {"User "+uid : mess}
        
        


        


        

        
