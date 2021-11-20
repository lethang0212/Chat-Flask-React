from datetime import date, datetime, timedelta
from os import abort

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session
)
from flask_restful import Api, Resource, reqparse
# from flask_jwt_extended import create_access_token

# from api.resources.db import get_db

from random import randint

bp = Blueprint('chatting', __name__, url_prefix='/api/chatting')
api = Api(bp)

create_chat_parser = reqparse.RequestParser(bundle_errors=True)
create_chat_parser.add_argument('type',required=True)


used_cid =[]
conversations =[]

# def abort_if_conversation_doesnt_exist(cid):
#     
class Conversation(Resource):
    def get(self):
        return {"num": str(len(conversations))},200
    
    def put(self):
        args = create_chat_parser.parse_args()
        while(1):
            id = randint(1,99999)
            if id not in used_cid :
                break
        conversation = {"cid":str(id),"type" : args["type"] , "last update" : str(datetime.now())}
        conversations.append(conversation)
        return conversation,201
        

class Chat(Resource) :
    def get(self,cid):
        for conversation in conversations:
            if conversation.get("cid") == cid:
                return conversation
        return {},404

def current_time_id():
    x = datetime.now()
    return str(x.year)+str(x.month)+str(x.day)+str(x.hour)+str(x.minute)+str(x.second)
messages = []
message_parser = reqparse.RequestParser(bundle_errors=True)
message_parser.add_argument("user id",required=True)
message_parser.add_argument("conversation id",required=True)

class Message(Resource): 
    def get(self):
        return {}
    def put(self):
        args = message_parser.parse_args()
        x = datetime.now()
        message = {"mid":args["user id"]+args["conversation id"] + str(x.year)+str(x.month)+str(x.day)+str(x.hour)+str(x.minute)+str(x.second)+str(randint(1,9)), 
                   "user id" : args["user id"], 
                   "conversation id": args["conversation id"], 
                   "time created" : str(x)}
        messages.append(message)
        return message,201
        
    
            

    
