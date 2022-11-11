import pymongo
import os


#database connection
def dbConnection():
    client=pymongo.MongoClient(os.environ.get('MONGO_URL'))
    db=client['akcon']
    print(client)
    print(db)
    return db