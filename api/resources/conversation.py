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

class conversation(Resource): #Lấy tất cả các message từ 1 conversation của 1 user
    @jwt_required()
    def get(self,guid): #Nhận token của user, id của cuộc trò chuyện(guid) nếu user thuộc cuộc trò chuyện thì return
        db = get_db()
        query = f"SELECT * FROM message WHERE guid = {guid}"
        message = db.execute(query).fetchone()
        if not message:
            return {"msg":"Message not found..."},404
        
        user = get_jwt_identity()
        var = db.execute("SELECT uid FROM member_of WHERE guid = ?",guid)
        listuid = var.fetchone()
        check = 0
        a = []
        while listuid is not None:
            a.append(listuid[0])
            if user == listuid[0]: check = 1
            listuid = var.fetchone()
        if check == 0:
            return {"msg":"You don't have permission to edit this message"},401

        cursor = db.cursor()
        a = {'List uid in conversation':a}
        messages = [dict((cursor.description[i][0], val) for i, val in enumerate(row)) for row in cursor.execute(query)]
        messages.append(a)
        return messages,200

class chatList(Resource): # lấy tất cả các conversation của một user liệt kê theo thứ tự thời gian update gần nhất
    @jwt_required()
    def get(self,uid): #nhận token của user, id của user muốn lấy conversation để so sánh nếu đúng thì return 
        uid1 = get_jwt_identity()
        if uid1 != int(uid): return{"msg":"Not have access"},203
        db = get_db()
        cursor = db.cursor()
        mess = [dict((cursor.description[i][0], val) for i, val in enumerate(row)) for row in cursor.execute('SELECT conversation.* FROM member_of,conversation WHERE member_of.uid = ? and conversation.guid = member_of.guid ORDER BY conversation.last_updated DESC',(uid))]
        if len(mess):
            return mess,200
        return {"msg":"No message"},404
        
        


        


        

        
