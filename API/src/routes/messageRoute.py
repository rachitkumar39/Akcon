from flask import Blueprint,request
from flask_jwt_extended import jwt_required,get_jwt_identity
from src.controllers.messageController import getChatHistoryController, userListController,createMessageController
message=Blueprint("message",__name__,url_prefix="/message")

@message.get('/getuserlist')
@jwt_required()
def getuserlist():
    #id=request.args.get('id')
    id=get_jwt_identity()
    res=userListController(id)
    res.headers["Content-Type"] = "application/json"
    return res

@message.post('/createmessage')
@jwt_required()
def createmessage():
    data=request.get_json()
    id=get_jwt_identity()
    data['sender']=id
    res=createMessageController(data)
    res.headers["Content-Type"] = "application/json"
    return res

@message.get('/getchathistory')
@jwt_required()
def getchathistory():
    id1=request.args.get('id')
    id2=get_jwt_identity()
    res=getChatHistoryController(id1,id2)
    res.headers["Content-Type"] = "application/json"
    return res
