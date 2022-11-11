from flask import Blueprint, jsonify,request
from flask_jwt_extended import jwt_required,get_jwt_identity

from src.controllers.postController import commentController, createPostController, deleteCommentController, dislikeController, getEventListController, getPostDetailController, getPostListController, getcommentController, likeController 

post=Blueprint("post",__name__,url_prefix="/post")

@post.post("/createpost")
@jwt_required()
def createpost():
    postDetail=request.get_json()
    userId=get_jwt_identity()
    postDetail['author']=userId
    res=createPostController(postDetail)
    res.headers["Content-Type"] = "application/json"
    return res

@post.get('/getpostlist')
@jwt_required()
def getpostlist():
    id=request.args.get('id')
    res=getPostListController(id)
    res.headers["Content-Type"] = "multipart/form-data"
    return res

@post.get('/geteventlist')
@jwt_required()
def geteventlist():
    id=request.args.get('id')
    res=getEventListController(id)
    res.headers["Content-Type"] = "application/json"
    return res

@post.get('/getpostdetail')
@jwt_required()
def getnewsdetail():
    id=request.args.get('id')
    res=getPostDetailController(id)
    res.headers["Content-Type"] = "application/json"
    return res


@post.get('/like')
@jwt_required()
def like():
    postId=request.args.get('id')
    id=get_jwt_identity()
    res=likeController(postId,id)
    res.headers["Content-Type"] = "application/json"
    return res

@post.get('/dislike')
@jwt_required()
def dislike():
    postId=request.args.get('id')
    id=get_jwt_identity()
    res=dislikeController(postId,id)
    res.headers["Content-Type"] = "application/json"
    return res

@post.put('/comment')
@jwt_required()
def comment():
    commentData=request.get_json()
    id=get_jwt_identity()
    res=commentController(commentData,id)
    res.headers["Content-Type"] = "application/json"
    return res

@post.post('/deletecomment')
@jwt_required()
def deleteComment():
    commentData=request.get_json()
    print('////////////')
    print(commentData)
    res=deleteCommentController(commentData)
    res.headers["Content-Type"] = "application/json"
    return res
    # return jsonify({"msg":"hello"})

@post.post('/getcomment')
@jwt_required()
def getcomment():
    data=request.get_json()
    id=data['id']
    page=int(data['page'])
    res=getcommentController(id,page)
    res.headers["Content-Type"] = "application/json"
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
    return jsonify({"msg":"post commented"}),200
    '''