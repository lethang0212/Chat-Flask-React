from datetime import datetime
from sqlite3.dbapi2 import Cursor
from flask import (
    Blueprint, g, json
)
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import get_jwt_identity, jwt_required, JWTManager
from api.resources.db import get_db

bp = Blueprint('message', __name__, url_prefix='/api')
api = Api(bp)

def get_table_to_json(query):
    db = get_db()
    cursor = db.cursor()
    jsonform = [dict((cursor.description[i][0], val) for i, val in enumerate(row)) for row in cursor.execute(query)]
    return jsonform

def user_in_conversation(uid,guid):
    members =  get_table_to_json(f'SELECT * FROM member_of WHERE guid = {guid}')
    for member in members:
        if member['uid'] == uid:
            return True
    return False

class Message(Resource):
    @jwt_required()
    def get(self): #Tìm kiếm tin nhắn theo nội dung,  người gửi hoặc conversation 
        parse = reqparse.RequestParser()
        parse.add_argument('search_key',required=False)
        parse.add_argument('mid',required=False,type=int,help='Message id pls')
        parse.add_argument('cid',required=False,type=int,help="Conversation id pls")
        
        args = parse.parse_args()
        
        query = 'SELECT * FROM message '
        if len(args):
            query += 'WHERE '
        
        if args['search_key']:
            query += f"content LIKE '%{args['search_key']}%' AND "
        if args['mid']:
            query += f"messid = {args['mid']} AND "
        if args['cid']:
            query += f"guid ={args['cid']} AND "
            
        if len(args):
            query = query[0:-4]
            
        messages = get_table_to_json(query)
        for message in messages:
            user = get_table_to_json(f'SELECT * FROM USER WHERE uid ={message.get("uid")}')
            message['display_name']=user[0].get('display_name')
        if len(messages):
            return messages,200
        return {"msg":"No message found..."},404
    
    @jwt_required()
    def post(self): #Gửi tin nhắn 
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('content',required=True)
        parser.add_argument('cid',required=True,type = int)
        args = parser.parse_args()
        user_id = get_jwt_identity()
        
        if not user_in_conversation(user_id,args['cid']):
            return {'msg':f"User {user_id} doesn't have access to this conversation."},401
        
        db = get_db()
        current_time = datetime.now()
        message = {'time' : str(current_time), 'uid' : user_id , 'guid' : args['cid'], 'content' : args['content']}
        try:
            db.execute(
                'INSERT INTO message (time, uid, guid, content) VALUES(?,?,?,?)',
                (str(current_time), user_id , args['cid'], args['content'])
            )
            db.commit()
        except db.IntegrityError:
            return {'msg':'Something happened'},409
        return message,201
    
    @jwt_required()
    def put(self): #Sửa tin nhắn 
        parser = reqparse.RequestParser(bundle_errors=True)
        parser.add_argument('mid',type=int,required=True)
        parser.add_argument('content',required=True)
        args = parser.parse_args()
                
        db=get_db()
        query = f"SELECT * FROM message WHERE messid = {args['mid']}"
        message = db.execute(query).fetchone()
        if not message:
            return {"msg":"Message not found..."},404
        
        user = get_jwt_identity()
        
        if user != 1 and user != message['uid']:
            return {"msg":"You don't have permission to edit this message"}, 203
        
        db.execute(
            f"UPDATE message SET content = '{args['content']}', time = '{str(datetime.now())}' WHERE messid = {args['mid']}"
        )
        db.commit()
        messages = get_table_to_json(query)
        return messages,200