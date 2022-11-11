from src.db.dbConnection import dbConnection

#database connection
db=dbConnection()
collection=db['users']

def getUserDataByEmailOrRoll(id):
    status=False
    doc={}
    try:
        doc['userDetail']=list(collection.find({"$or":[{"user.email": id},{"user.roll":id}]},{"_id":0}))
        userData=doc['userDetail']
        if len(userData)>0:
            status=True
            return userData[0],status
    except:
        return {"msg":"server internal error!"},status
    return {"msg":"id not exist"},status

def getUserDataByAny(id):
    status=False
    doc={}
    try:
        doc['userDetail']=list(collection.find({"$or":[ {"social_plateform.url": id}, {"user.first_name": id}, {"user.last_name": id},{"user.email": id},{"user.roll":id},{"user.passing_year":id},{"user.city": id},{"user.contact": id},{"skills.name":id},{"experience.company_name":id},{"experience.job_title":id},{"education.degree_name":id},{"education.degree_type":id} ]},{"user.first_name":1,"user.last_name":1,"user.city":1,"user.image":1,"user.passing_year":1,"user.email":1,"_id":0}))
        userData=doc['userDetail']
        # print("///////////////")
        # print(userData)
        status=True
        return userData,status
    except:
        return {"msg":"server internal error!"},status


def createUser(userData):
    status=False
    doc={}
    try:
        doc['userDetail']=list(collection.find({"$or":[{"user.contact": userData['user']['contact']},{"user.email": userData['user']['email']},{"user.roll":userData['user']['roll']}]},{"user":1,"_id":0}))
        data=doc['userDetail']
        if len(data)>0:
            return {"msg":"Already Registered"},status    
        else:
            try:
                collection.insert_one(userData)
                status=True
                return {"msg":"successfully Register"},status
            except:
                return {"msg":"server internal error!"},status
        
    except:
        return {"msg":"server internal error!"},status

def updateUser(userData,type,id):
    status=False
    if type=='personal':
        try:
            collection.update_one({"user.email":id},{"$set" : 
            {
                "user.first_name":userData['first_name'],
                "user.last_name":userData['last_name'],
                "user.city":userData['city'],
                "user.state":userData['state'],
                "user.country":userData['country'],
                "current_college":userData["current_college"],
                "current_organization":userData["current_organization"],
                "current_position":userData["current_position"]
            }})
            status=True
            return {"msg":"personal has been successfully updated"},status       
        except:
            return {"msg":"server internal error!"},status
    elif type=='education':
        try:
            collection.update_one({"user.email": id},{"$push":{"education":userData}})
            status=True
            return {"msg":"education added has been successfully updated"},status       
        except:
            return {"msg":"server internal error!"},status
    elif type=='contact':
        try:
            collection.update_one({"user.email": id},{"$set":{"social_plateform":userData}})
            status=True
            return {"msg":"contact has been successfully updated"},status       
        except:
            return {"msg":"server internal error!"},status
    elif type=='experience':
        try:
            collection.update_one({"user.email": id},{"$push":{"experience":userData}})
            status=True
            return {"msg":"experience has been successfully updated"},status       
        except:
            return {"msg":"server internal error!"},status
    elif type=='skills':
        try:
            collection.update_one({"user.email": id},{"$push":{"skills":userData}})
            status=True
            return {"msg":"skills has been successfully updated"},status       
        except:
            return {"msg":"server internal error!"},status

def deleteUpdateUser(userData,type):
    status=False
    if type=='persional':
        try:
            collection.update_one({"user.email":userData['email']},{"$set" : {"user":userData['user'],"social_plateform":userData["social_plateform"],"education":userData["education"],"skills":userData["skills"],"experience":userData["experience"]}})
            return {"msg":"profile has been successfully updated"},status       
        except:
            return {"msg":"server internal error!"},status
    elif type=='education':
        try:
            collection.update_one({"user.email":userData['email']},{"$set" : {"user":userData['user'],"social_plateform":userData["social_plateform"],"education":userData["education"],"skills":userData["skills"],"experience":userData["experience"]}})
            return {"msg":"profile has been successfully updated"},status       
        except:
            return {"msg":"server internal error!"},status
    elif type=='contact':
        try:
            collection.update_one({"user.email":userData['email']},{"$set" : {"user":userData['user'],"social_plateform":userData["social_plateform"],"education":userData["education"],"skills":userData["skills"],"experience":userData["experience"]}})
            return {"msg":"profile has been successfully updated"},status       
        except:
            return {"msg":"server internal error!"},status
    elif type=='experience':
        try:
            collection.update_one({"user.email":userData['email']},{"$set" : {"user":userData['user'],"social_plateform":userData["social_plateform"],"education":userData["education"],"skills":userData["skills"],"experience":userData["experience"]}})
            return {"msg":"profile has been successfully updated"},status       
        except:
            return {"msg":"server internal error!"},status
    elif type=='skills':
        try:
            collection.update_one({"user.email":userData['email']},{"$set" : {"user":userData['user'],"social_plateform":userData["social_plateform"],"education":userData["education"],"skills":userData["skills"],"experience":userData["experience"]}})
            return {"msg":"profile has been successfully updated"},status       
        except:
            return {"msg":"server internal error!"},status
            

def updatePassword(email,passwordHash,date):
    status=False
    try:
        collection.update_one({"user.email":email},{"$set" : {"password":passwordHash,"created_on":date}})
        status=True
        return {"msg":"Password has been successfully updated"},status       
    except:
        return {"msg":"server internal error!"},status

def updateProfileImageQuery(imageurl,id):
    status=False
    try:
        collection.update_one({"user.email":id},{"$set" : {"user.image":imageurl,}})
        status=True
        return {"msg":"Profile image has been successfully updated"},status       
    except:
        return {"msg":"server internal error!"},status

def updateLoginToken(id,token):
    status=False
    try:
        collection.update_one({"user.email":id},{"$set" :{"token":token}})
        status=True
        return {"msg":"token has been set successfully"},status       
    except:
        return {"msg":"server internal error!"},status

def updateotp(id,otp):
    status=False
    try:
        collection.update_one({"user.email":id},{"$set" :{"otp":otp}})
        status=True
        return {"msg":"otp status has been set successfully"},status       
    except:
        return {"msg":"server internal error!"},status


