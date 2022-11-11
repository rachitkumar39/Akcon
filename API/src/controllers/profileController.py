from flask import jsonify, make_response
from src.db.userQuery import getUserDataByAny, getUserDataByEmailOrRoll, updateProfileImageQuery, updateUser
from src.validation.profileValidation import getProfileValidation, updateProfileValidate


def getProfileController(id):
    status=False
    res={"errors":None}
    msg,status=getProfileValidation(id)
    if status==False:
        res["errors"]=msg
        res=make_response(res,400)
        return res
    else:
        msg,status=getUserDataByEmailOrRoll(id)
        if status:
            data=msg
            education=[]
            e1=''
            e2=''
            e3=''
            e4=''
            for i in data['education']:
                if i['degree_type']=='pg':
                    e4=i
                if i['degree_type']=='ug':
                    e3=i
                if i['degree_type']=='hsc':
                    e2=i
                if i['degree_type']=='ssc':
                    e1=i
            if e4!='':
                education.append(e4)
            if e3!='':
                education.append(e3)
            if e2!='':
                education.append(e2)
            if e1!='':
                education.append(e1)

            res['response']={
                "user":data['user'],
                "social_plateform":data['social_plateform'],
                "education":education,
                "skills": data['skills'],
                "experience": data['experience'] ,
                "current_college": data['current_college'] ,
                "current_organization": data['current_organization'] ,
                "current_position": data['current_position'] 
            }
            res=make_response(res,200)
            return res

        else:
            res["errors"]=msg
            res=make_response(res,400)
            return res

def updateProfileController(userData,type,id):
    res={"errors":None}
    status=True
    #msg,status=updateProfileValidate(userData,type)
    if status:
        #schemaData=msg
        msg,status=updateUser(userData,type,id)
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

def updateProfileImageController(imageurl,id):
    res={"errors":None}
    msg,status=updateProfileImageQuery(imageurl,id)
    if status:
        res["errors"]=msg
        res=make_response(res,200)
        return res
    else:
        res["errors"]=msg
        res=make_response(res,400)
        return res


def sarchController(id):
    status=False
    res={"errors":None}
    msg,status=getProfileValidation(id)
    if status==False:
        res["errors"]=msg
        res=make_response(res,400)
        return res
    else:
        msg,status=getUserDataByAny(id)
        if status:
            data=[]
            for i in range(0,len(msg)):
                data.append(msg[i]['user'])
            res["response"]=data
            res=make_response(res,200)
            return res

        else:
            res["errors"]=msg
            res=make_response(res,400)
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
        response.headers["Content-Type"] = "application/json"
        return response
    else:
        return jsonify({"msg":"no data found"}),200'''