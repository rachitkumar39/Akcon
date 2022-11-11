from src.schema.userSchema import *
from src.validation.validate import validate
def getProfileValidation(id):
    if id is None:
        return {"msg":"id required"},False
    return {"msg":"validation successful"},True

def updateProfileValidate(userData):
    err={}
    temp=True
    count=0
    _schema=schema.copy()
    # user validation
    msg,status=validate(userData['user'],register_)
    if status:
        for i in schema['user']:
            if i in userData['user']:
                _schema['user'][i]=userData['user'][i]
    else:
        temp=False
        err["user errors"]=msg
    # social plateform validation
    err["social_plateform_errors"]=[]
    for i in userData['social_plateform']:
        count+=1
        msg,status=validate(i,social_plateform_)
        if status:
            _schema['social_plateform'].append(i)
        else:
            temp=False
            mess=str(msg+" in "+str(count)+" field of social_plateform")
            err["social_plateform_errors"].append(mess)

    # education validation
    err["education_errors"]=[]
    count=0
    for i in userData['education']:
        count+=1
        msg,status=validate(i,education_)
        if status:
            _schema['education'].append(i)
        else:
            temp=False
            mess=str(msg+" in "+str(count)+" field of education ")
            err["education_errors"].append(mess)

    # skills validation
    err["skills_errors"]=[]
    count=0
    for i in userData['skills']:
        count+=1
        msg,status=validate(i,skills_)
        if status:
            _schema['skills'].append(i)
        else:
            temp=False
            mess=str(msg+" in "+str(count)+" field of skills ")
            err["skills_errors"].append(mess)
    
    # experience validation
    err["experience_errors"]=[]
    count=0
    for i in userData['experience']:
        count+=1
        msg,status=validate(i,experience_)
        if status:
            _schema['experience'].append(i)
        else:
            temp=False
            mess=str(msg+" in "+str(count)+" field of experience ")
            err["experience_errors"].append(mess)

    #return schema or error msg'''
    if temp:
        return _schema,temp
    else:
        return err,temp
