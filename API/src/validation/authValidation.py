from src.schema.userSchema import *
from src.validation.validate import validate
def registerValidate(userData):
    _schema=schema.copy()
    msg,status=validate(userData['user'],register_)
    if status:
        for i in schema['user']:
            if i in userData['user']:
                _schema['user'][i]=userData['user'][i]
        for i in schema:
            if i!='user' and i in userData:
                _schema[i]=userData[i]
        return _schema,True
    else:
        return {"msg":msg},False

def generateOtpValidate(id):
    if id is None:
        return {"msg":"id required"},False
    return {"msg":"validation successful"},True

def verifyOtpValidate(userData):
    msg,status=validate(userData,verifyOtp_)
    if status:
        return userData,True
    else:
        return {"msg":msg},False

def setPasswordValidate(userData):
    msg,status=validate(userData,setpassword_)
    if status:
        if userData['new_password']!=userData['confirm_password']:
            return {"msg":"new_password and confirm_password must be same."},False
        if len(userData['new_password'])<=8 or len(userData['new_password'])>=12:
            return {"msg":"Password length must be greater than 8 character and less than 12 character"},False
        return userData,True
    else:
        return {"msg":msg},False

def loginValidate(userData):
    msg,status=validate(userData,login_)
    if status:
        return userData,True
    else:
        return {"msg":msg},False