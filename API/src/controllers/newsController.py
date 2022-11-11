
from flask import make_response
from src.config.config import NEWS_FETCH_LIMIT
from src.db.newsQuery import createNews, getNewsDetail, getNewsList
from bson.objectid import ObjectId
from src.db.userQuery import getUserDataByEmailOrRoll
from src.validation.newsValidation import createNewsValidate, getNewsDetailValidation
import src.config

def createNewsController(newsDetail):
    res={"errors":None}
    msg,status=createNewsValidate(newsDetail)
    if status:
        schemaData=msg
        msg,status=createNews(schemaData)
        if status:
            res["response"]=msg
            res=make_response(res,200)
        else:
            res["errors"]=msg
            res=make_response(res,200)
    else:
        res["errors"]=msg
        res=make_response(res,400)
    return res

    
def getNewsListController(lastnewsid):
    status=False
    res={"errors":None}
    msg,status=getNewsList()
    if status:
        data=[]
        n=len(msg)
        if n==0:
            res['response']=data
            res=make_response(res,200)
            return res  
        if lastnewsid=='0':
            for i in range(0,NEWS_FETCH_LIMIT):
                if i>=n:
                    break
                msg[n-1-i]['_id']=str(ObjectId(msg[n-1-i]['_id']))
                data.append(msg[n-1-i])
        else:
            i=0
            while True:
                if str(ObjectId(msg[n-1-i]['_id']))==lastnewsid:
                    break
                i=i+1
            i=i+1
            for j in range(i,i+NEWS_FETCH_LIMIT):
                if j>=n:
                    break
                msg[n-1-j]['_id']=str(ObjectId(msg[n-1-j]['_id']))
                data.append(msg[n-1-j])
                #data[j]['_id']=str(ObjectId(data[j]['_id']))
        res['response']=data
        res=make_response(res,200)
        return res
    else:
        res["errors"]=msg
        res=make_response(res,400)
        return res

def getNewsDetailController(id):
    res={"errors":None}
    msg,status=getNewsDetailValidation(id)
    if status:
        msg,status=getNewsDetail(id)
        if status:
            msg=msg[0]
            print("............",msg)
            msg['_id']=str(ObjectId(msg['_id']))
            autherData,test=getUserDataByEmailOrRoll(msg['author'])
            if test:
                msg['author_first_name']=autherData['user']['first_name']
                msg['author_last_name']=autherData['user']['last_name']
                msg['profile']=autherData['user']['image']
                if autherData['user']['role']=='alumni':
                    msg['passing_year']=autherData['user']['passing_year']
                res["response"]=msg
                #print("data=>////////",msg)
                res=make_response(res,200)
                return res
            else:
                res["errors"]=msg
                res=make_response(res,400)
                return res    
        else:
            res["errors"]=msg
            res=make_response(res,400)
            return res
    else:
        res["errors"]=msg
        res=make_response(res,400)
        return res