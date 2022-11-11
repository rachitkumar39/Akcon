from src.db.dbConnection import dbConnection
from bson.objectid import ObjectId
#database connection
db=dbConnection()
collection=db['news']

def getNewsList():
    status=False
    doc={}
    try:
        doc['newsList']=list(collection.find({},{"title":1,"news_date":1,"_id":1}))
        newsList=doc['newsList']
        status=True
        return newsList,status
    except:
        return {"msg":"server internal error!"},status
    

def getNewsDetail(id):
    status=False
    doc={}
    try:
        doc['news']=list(collection.find({"_id": ObjectId(id)}))
        news=doc['news']
        if len(news)>0:
            status=True
            return news,status
    except:
        return {"msg":"server internal error!"},status  


def createNews(newsData):
    status=False
    doc={}
    try:
        collection.insert_one(newsData)
        status=True
        return {"msg":"News created successfully"},status
    except:
        return {"msg":"server internal error!"},status

