from flask import make_response
from src.db.postQuery import comment, createPost, deleteComment, dislike, getPostDetail, getPostList, getcomment, geteventList, like
from bson.objectid import ObjectId
from src.db.userQuery import getUserDataByEmailOrRoll
from src.validation.postValidation import commentValidation, createPostValidate, deleteCommentValidation, getPostDetailValidation, likeValidation
from werkzeug.utils import secure_filename
import os
from src.config import config

def createPostController(postData):
    res={"errors":None}
    msg,status=createPostValidate(postData)
    if status:
        schemaData=msg
        msg,status=createPost(schemaData)
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

def getPostListController(lastpostid):
    status=False
    res={"errors":None}
    msg,status=getPostList()
    if status:
        data=[]
        n=len(msg)
        if lastpostid=='0':
            for i in range(0,config.POST_FETCH_LIMIT):
                if i>=n:
                    break
                msg[n-1-i]['_id']=str(ObjectId(msg[n-1-i]['_id']))
                autherData,test=getUserDataByEmailOrRoll(msg[n-1-i]['author'])
                if test:
                    msg[n-1-i]['author_first_name']=autherData['user']['first_name']
                    msg[n-1-i]['author_last_name']=autherData['user']['last_name']
                    msg[n-1-i]['passing_year']=autherData['user']['passing_year']
                    msg[n-1-i]['profile']=autherData['user']['image']
                    msg[n-1-i]['like_count']=len(msg[n-1-i]['like'])
                    msg[n-1-i]['comment_count']=len(msg[n-1-i]['comment'])
                data.append(msg[n-1-i])
        else:
            i=0
            while True:
                if str(ObjectId(msg[n-1-i]['_id']))==lastpostid:
                    break
                i=i+1
            i=i+1
            for j in range(i,i+config.POST_FETCH_LIMIT):
                if j>=n:
                    break
                msg[n-1-j]['_id']=str(ObjectId(msg[n-1-j]['_id']))
                autherData,test=getUserDataByEmailOrRoll(msg[n-1-j]['author'])
                if test:
                    msg[n-1-j]['author_first_name']=autherData['user']['first_name']
                    msg[n-1-j]['author_last_name']=autherData['user']['last_name']
                    msg[n-1-j]['passing_year']=autherData['user']['passing_year']
                    msg[n-1-j]['profile']=autherData['user']['image']
                    msg[n-1-j]['like_count']=len(msg[n-1-j]['like'])
                    msg[n-1-j]['comment_count']=len(msg[n-1-j]['comment'])
                data.append(msg[n-1-j])
                #data[j]['_id']=str(ObjectId(data[j]['_id']))


        # print("data length/////",len(data))
        # print("data/////",data)
        res['response']=data
        res=make_response(res,200)
        return res
    else:
        res["errors"]=msg
        res=make_response(res,400)
        return res

def getEventListController(lasteventid):
    status=False
    res={"errors":None}
    msg,status=geteventList()
    if status:
        data=[]
        n=len(msg)
        if lasteventid=='0':
            for i in range(0,config.EVENT_FETCH_LIMIT):
                if i>=n:
                    break
                msg[n-1-i]['_id']=str(ObjectId(msg[n-1-i]['_id']))
                data.append(msg[n-1-i])
        else:
            i=0
            while True:
                if str(ObjectId(msg[n-1-i]['_id']))==lasteventid:
                    break
                i=i+1
            i=i+1
            for j in range(i,i+config.EVENT_FETCH_LIMIT):
                if j>=n:
                    break
                msg[n-1-j]['_id']=str(ObjectId(msg[n-1-j]['_id']))
                data.append(msg[n-1-j])
        res['response']=data
        res=make_response(res,200)
        return res
    else:
        res["errors"]=msg
        res=make_response(res,400)
        return res

def getPostDetailController(id):
    res={"errors":None}
    msg,status=getPostDetailValidation(id)
    if status:
        msg,status=getPostDetail(id)
        msg=msg[0]
        #print("data=>////////",msg)
        if status:
            msg['_id']=str(ObjectId(msg['_id']))
            autherData,test=getUserDataByEmailOrRoll(msg['author'])
            if test:
                msg['author_first_name']=autherData['user']['first_name']
                msg['author_last_name']=autherData['user']['last_name']
                msg['passing_year']=autherData['user']['passing_year']
                msg['profile']=autherData['user']['image']
                msg['like_count']=len(msg['like'])
                msg['comment_count']=len(msg['comment'])
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

def likeController(postId,id):
    res={"errors":None}
    msg,status=likeValidation(postId)
    if status:
        msg,status=like(postId,id)
        if status:
            res["response"]=msg
            res=make_response(res,200)
            return res
        else:
            res["errors"]=msg
            if msg['msg']=="post liked already":
                res=make_response(res,200)
            else:
                res=make_response(res,400)
            return res
    else:
        res["errors"]=msg
        res=make_response(res,400)
        return res

def dislikeController(postId,id):
    res={"errors":None}
    msg,status=likeValidation(postId)
    if status:
        msg,status=dislike(postId,id)
        if status:
            res["response"]=msg
            res=make_response(res,200)
            return res
        else:
            res["errors"]=msg
            if msg['msg']=="post disliked already":
                res=make_response(res,200)
            else:
                res=make_response(res,400)
            return res
    else:
        res["errors"]=msg
        res=make_response(res,400)
        return res

def commentController(commentdata,id):
    res={"errors":None}
    msg,status=commentValidation(commentdata)
    if status:
        commentData={
            "id":id,
            "comment":commentdata['comment']
        }
        postId=commentdata['id']
        msg,status=comment(postId,commentData)
        if status:
            res["response"]=msg
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

def deleteCommentController(commentdata):
    res={"errors":None}
    msg,status=deleteCommentValidation(commentdata)
    if status:
        
        commentData={
            "commenterId":commentdata['userid'],
            "comment":commentdata['comment']
        }
        postId=commentdata['postid']
        msg,status=deleteComment(postId,commentData)
        if status:
            res["response"]=msg
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

def getcommentController(postId,page):
    res={"errors":None}
    msg,status=likeValidation(postId)
    if status:
        msg,status=getcomment(postId)
        if status:
            data=[]
            com={}
            # print("data from")
            # print(type(msg))
            # print(msg)
            if len(msg)==0:
                #data.append(com)
                res["response"]=data
                res=make_response(res,200)
                return res
            
            
            if page==0:
                start=0
                end=page * config.COMMENT_FETCH_LIMIT
            else:
                start=(page-1) * config.COMMENT_FETCH_LIMIT
                end=page * config.COMMENT_FETCH_LIMIT
            if len(msg)>=0:
                count=start
                msg=msg[0]
                msg=msg['comment']
                # print("/////////////")
                msg.reverse()
                # print(msg)
                for i in msg[start:end]:
                    if len(msg)>count:
                        count+=1
                        userid=i['id']
                        com['id']=userid
                        com['comment']=i['comment']
                        userdata=list(getUserDataByEmailOrRoll(userid))
                        userdata=userdata[0]['user']
                        com['profile']=userdata['image']
                        com['first_name']=userdata['first_name']
                        com['last_name']=userdata['last_name']
                        data.append(com.copy())
                        com.clear()
                        
                    else:
                        break
                res["response"]=data
                res=make_response(res,200)
                return res
            else:
                #data.append(com)
                res["response"]=data
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


'''
@post.get('/getpostlist')
@jwt_required()
def getpostlist():
    posts=[]
    data={}
    doc=collection.find({},{"like":0,"_id":0})
    posts=list(doc)
    data['post_list']=posts
    return jsonify(data),200

@post.post('/createpost')
@jwt_required()
def createpost():
    post=dict(request.get_json())
    roll=get_jwt_identity()
    db=client['akcon']
    collection1=db['users']
    doc=collection1.find({"user.roll":roll},{"user.fullname":1,"_id":0})
    name=list(doc)
    name=name[0]['user']['fullname']
    post['fullname']=name
    count=collection.count_documents({})+1
    post['id']=count
    post['author']=roll
    post['like_count']=0
    post['comment_count']=0
    post['like']=[]
    post['comment']=[]
    collection.insert_one(post)
    return jsonify({"msg":"post created"}),200

@post.get("/geteventlist")
@jwt_required()
def geteventlist():
    events=[]
    data={}
    doc=collection.find({"post_type":"event"},{"_id":0})
    events=list(doc)
    data['events_list']=events
    return jsonify(data),200

@post.get("/like")
@jwt_required()
def like():
    c_id=request.args.get('id')
    id=get_jwt_identity()
    data={}
    doc=collection.find({"id":int(c_id)},{"like":1,"_id":0})
    l=list(doc)
    l=l[0]['like']
    count=len(l)+1
    isliked=False
    for i in l:
        if i['roll']==id:
            isliked=True
            break
    if isliked:
        return jsonify({"msg":"post liked already"}),200
    data['roll']=id
    collection.update_one({"id":int(c_id)},{"$push":{"like":data}})
    collection.update_one({"id":int(c_id)},{"$set":{"like_count":count}})
    return jsonify({"msg":"post liked"}),200

@post.put("/comment")
@jwt_required()
def comment():
    data=request.get_json()
    db=client['akcon']
    collection1=db['users']
    id=get_jwt_identity()
    doc=collection1.find({"user.roll":id},{"user.fullname":1,"_id":0})
    name=list(doc)
    name=name[0]['user']['fullname']
    data['roll']=id
    data['fullname']=name
    c_id=data['comment_id']
    l=[]
    doc=collection.find({"id":int(data['comment_id'])},{"comment":1,"_id":0})
    l=list(doc)
    l=l[0]['comment']
    count=len(l)+1
    iscommented=False
    for i in l:
        if i['roll']==id:
            iscommented=True
            break
    if iscommented:
        return jsonify({"msg":"post commented already"}),200
    data.pop('comment_id')
    collection.update_one({"id":int(c_id)},{"$push":{"comment":data}})
    collection.update_one({"id":int(c_id)},{"$set":{"comment_count":count}})
    return jsonify({"msg":"post commented"}),200'''