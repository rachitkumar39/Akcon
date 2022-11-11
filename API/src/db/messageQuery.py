from src.db.dbConnection import dbConnection
from bson.objectid import ObjectId
#database connection
db=dbConnection()
collection=db['message']

def userListQuery(id):
    status=False
    userlist=set()
    doc={}
    try:
        # doc['users']=list(collection.find({"$or":[{"sender": id},{"receiver":id}]},{"sender":1,"receiver":1,"_id":0}))
        doc['users']=collection.find({"$or":[{"sender": id},{"receiver":id}]},{"sender":1,"receiver":1,"_id":0})
        for i in doc['users']:
            if i['sender']==id: 
                userlist.add(i['receiver'])
            else:
                 userlist.add(i['sender'])
        userlist=list(userlist)
        status=True
        return userlist,status
    except:
        return {"msg":"server internal error!"},status

def getChatHistoryQuery(id1,id2):
    status=False
    doc={}
    chat=[]
    try:
        print(id)
        # doc['users']=list(collection.find({"$or":[{"sender": id},{"receiver":id}]},{"sender":1,"receiver":1,"_id":0}))
        doc['chat']=list(collection.find(
            {
                "$or":[
                    {"$and":[{"sender": id1},{"receiver":id2}]},
                    {"$and":[{"sender": id2},{"receiver":id1}]},
                ]
            },
            {"_id":0}))

        chat=doc['chat']
        # print(chat)
        status=True
        return chat,status
    except:
        return {"msg":"server internal error!"},status

def createMesssageQuery(data):
    status=False
    try:
        collection.insert_one(data)
        status=True
        return {"msg":"mesaage sended successfully"},status
    except:
        return {"msg":"server internal error!"},status
