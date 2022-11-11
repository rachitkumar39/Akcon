from flask import Blueprint,request
from flask_jwt_extended import jwt_required,get_jwt_identity
from src.controllers.newsController import createNewsController, getNewsDetailController, getNewsListController

news=Blueprint("news",__name__,url_prefix="/news")

@news.post("/createnews")
@jwt_required()
def createnews():
    newsDetail=request.get_json()
    userId=get_jwt_identity()
    print("data//////",newsDetail)
    newsDetail['author']=userId
    res=createNewsController(newsDetail)
    res.headers["Content-Type"] = "application/json"
    return res

@news.get('/getnewslist')
@jwt_required()
def getnewslist():
    id=request.args.get('id')
    res=getNewsListController(id)
    res.headers["Content-Type"] = "application/json"
    return res

@news.get('/getnewsdetail')
@jwt_required()
def getnewsdetail():
    id=request.args.get('id')
    res=getNewsDetailController(id)
    res.headers["Content-Type"] = "application/json"
    return res
