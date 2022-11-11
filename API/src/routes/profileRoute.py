from flask import Blueprint,request
from flask_jwt_extended import jwt_required,get_jwt_identity 
from src.controllers.profileController import getProfileController, sarchController, updateProfileController, updateProfileImageController 

profile=Blueprint("profile",__name__,url_prefix="/profile")

@profile.get('/getprofile')
@jwt_required()
def getprofile():
    #userId=get_jwt_identity()
    id=request.args.get('id')
    res=getProfileController(id)
    res.headers["Content-Type"] = "application/json"
    return res

@profile.put('/updateprofile')
@jwt_required()
def updateprofile():
    data=request.get_json()
    userData=data['data']
    type=data['type']
    id=get_jwt_identity()
    res=updateProfileController(userData,type,id)
    #res.headers["Content-Type"] = "application/json"
    return res

@profile.get('/updateprofileimage')
@jwt_required()
def updateprofileimage():
    imageurl=request.args.get('imageurl')
    id=get_jwt_identity()
    res=updateProfileImageController(imageurl,id)
    #res.headers["Content-Type"] = "application/json"
    return res

@profile.get('/search')
@jwt_required()
def search():
    id=request.args.get('id')
    res=sarchController(id)
    res.headers["Content-Type"] = "application/json"
    return res
'''
@profile.get('/getprofile')
@jwt_required()
def getprofile():
    user=get_jwt_identity()
    print(user)
    doc=collection.find({"user.roll": user})
    count=0
    for i in doc:
        count+=1
        data=i
        break
    response=make_response(
            jsonify({
                "user":data['user'],
                "social_plateform": data['social_plateform'],
                "education": data['education'],
                "skills": data['skills'],
                "experience": data['experience'],
                "created_on":data['created_on']            
                }),200
        )
    response.headers["Content-Type"] = "application/json"
    return response


@profile.put('/updateprofile')
@jwt_required()
def updateprofile():
    data=request.get_json()
    roll=get_jwt_identity()
    data['user']['roll']=roll
    print(roll)
    collection.update_one(
                        {"user.roll":roll},{"$set":
                        {
                        "user":data['user'],
                        "social_plateform": data['social_plateform'],
                        "education": data['education'],
                        "skills": data['skills'],
                        "experience": data['experience']
                        }})
    return jsonify({"msg":"profile updated"}),200

@profile.get('/search')
@jwt_required()
def search():
    data=[]
    users={}
    _id=request.args.get('id')
    doc=collection.find({"$or":[ {"user.fullname": _id},{"user.email": _id},{"user.roll":_id},{"user.batch":_id},{"user.location": _id},{"user.contact": _id},{"skills.name":_id},{"experience.company_name":_id},{"experience.job_title":_id},{"education.degree_name":_id},{"education.degree_type":_id} ]},{"password":0,"token":0,"refresh_token":0,"_id":0}   )
    data=list(doc)
    count=len(data)
    users['data']=data
    if count>0:
        response=make_response(
            jsonify(users),200
        )
        res.headers["Content-Type"] = "application/json"
        return response
    else:
        return jsonify({"msg":"no data found"}),200
        '''