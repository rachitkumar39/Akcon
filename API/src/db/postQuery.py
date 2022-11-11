from src.db.dbConnection import dbConnection
from bson.objectid import ObjectId
#database connection
db=dbConnection()
collection=db['post']

def getPostList():
    status=False
    doc={}
    try:
        doc['postList']=list(collection.find({},{}))
        postList=doc['postList']
        if len(postList)>=0:
            status=True
            return postList,status
    except:
        return {"msg":"server internal error!"},status
 

def geteventList():
    status=False
    doc={}
    try:
        doc['eventList']=list(collection.find({"type":"event"},{"title":1,"event_date":1,"_id":1}))
        postList=doc['eventList']
        if len(postList)>=0:
            status=True
            return postList,status
    except:
        return {"msg":"server internal error!"},status
   

def getPostDetail(id):
    status=False
    doc={}
    try:
        doc['post']=list(collection.find({"_id": ObjectId(id)}))
        post=doc['post']
        if len(post)>=0:
            status=True
            return post,status
    except:
        return {"msg":"server internal error!"},status  


def createPost(postData):
    status=False
    doc={}
    try:
        collection.insert_one(postData)
        status=True
        return {"msg":"post created successfully"},status
    except:
        return {"msg":"server internal error!"},status
        
def like(postId,id):
    status=False
    doc={}
    try:
        doc['post']=list(collection.find({"_id": ObjectId(postId)},{"like":1,"_id":0}))
        post=doc['post'][0]['like']
        if post.count(id)==0:
            try:
                collection.update_one({"_id": ObjectId(postId)},{"$push":{"like":id}})
                status=True
                return {"msg":"post liked"},status
            except:
                return {"msg":"server internal error!"},status        
        else:
            return {"msg":"post liked already"},status
    except:
        return {"msg":"server internal error!"},status  

def dislike(postId,id):
    status=False
    doc={}
    try:
        doc['post']=list(collection.find({"_id": ObjectId(postId)},{"like":1,"_id":0}))
        post=doc['post'][0]['like']
        if post.count(id)>0:
            try:
                collection.update_one({"_id": ObjectId(postId)},{"$pull":{"like":id}})
                status=True
                return {"msg":"post disliked"},status
            except:
                return {"msg":"server internal error!"},status        
        else:
            return {"msg":"post disliked already"},status
    except:
        return {"msg":"server internal error!"},status  

def comment(postId,commentData):
    status=False
    doc={}
    id="abc"
    try:
        doc['post']=list(collection.find({"_id": ObjectId(postId)},{"comment":1,"_id":0}))
        try:
            collection.update_one({"_id": ObjectId(postId)},{"$push":{"comment":commentData}})
            status=True
            return {"msg":"post commented"},status
        except:
            return {"msg":"server internal error!"},status        
    except:
        return {"msg":"server internal error!"},status  

def deleteComment(postId,commentData):
    status=False
    try:
        collection.update_one({"_id": ObjectId(postId)},{"$pull":{"comment":{"id":commentData['commenterId'],"comment":commentData['comment']}}})
        status=True
        return {"msg":"post comment deleted"},status
    except:
        return {"msg":"server internal error2!"},status 

def getcomment(id):
    status=False
    doc={}
    try:
        doc['comment']=list(collection.find({"_id":ObjectId(id)},{"comment":1,"_id":0}))
        comment=doc['comment']
        status=True
        return comment,status
    except:
        return {"msg":"server internal error!"},status
    
