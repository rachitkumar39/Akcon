from twilio.rest import Client 
from random import *
from flask import  make_response, session
from src.db.userQuery import createUser,getUserDataByEmailOrRoll, updateLoginToken,updatePassword, updateotp 
from src.validation.authValidation import loginValidate, registerValidate,generateOtpValidate, setPasswordValidate, verifyOtpValidate
from datetime import datetime
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import create_access_token

def registerController(userData):
    res={"errors":None}
    userData=userData['users'][0]
    msg,status=registerValidate(userData)
    if status:
        schemaData=msg
        msg,status=createUser(schemaData)
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

def loginController(userData):
    res={"errors":None}
    msg,status=loginValidate(userData)
    if status==False:
        res["errors"]=msg
        res=make_response(res,400)
        return res
    else:
        msg,status=getUserDataByEmailOrRoll(userData['id'])
        if status:
            data=msg
            ispasswordcorrect=check_password_hash(data['password'],userData['password'])
            if ispasswordcorrect:
                token=create_access_token(data['user']['email'],expires_delta=False)
                msg,status=updateLoginToken(data['user']['email'],token)
                if status:
                    data['user']['token']=token
                    res["response"]={"user":data['user']}
                    res=make_response(res,200)
                    return res
                else:
                    res["errors"]=msg
                    res=make_response(res,400)
                    return res    
            else:
                res["errors"]={"msg":"Password is incorrect"}
                res=make_response(res,400)
                return res              
        else:
            res["errors"]=msg
            res=make_response(res,400)
            return res

def generateOtpController(id):
    res={"errors":None}
    msg,status=generateOtpValidate(id)
    if status==False:
        res["errors"]=msg
        res=make_response(res,400)
        return res
    else:
        msg,status=getUserDataByEmailOrRoll(str(id))
        if status:
            userData=msg
            otp = randint(100000,999999)
            mes="Your AKCON OTP is "+str(otp)+"."
            account_sid = 'AC7b2438069a962426e1bbdadadf399676' 
            auth_token = '7bdddc7b8e66c093e871701bba01d1d6' 
            client = Client(account_sid, auth_token) 
            contact=userData['user']['contact']
            message = client.messages.create(from_='+18597151697',body=mes,to=contact) 
            if message.sid:
                msg,status=updateotp(id,str(otp))
                if status:
                    res['response']={"message":"OTP sent at "+contact[:5]+'****'+contact[10:],"roll":userData['user']['roll']}
                    res=make_response(res,200)
                    return res
                else:
                    res["errors"]=msg
                    res=make_response(res,400)
                    return res
            else:
                res["errors"]={"message":"Server error"}
                res=make_response(res,502)
                return res
        else:
            res["errors"]=msg
            res=make_response(res,400)
            return res

def verifyOtpController(userData):
    res={"errors":None}
    msg,status=verifyOtpValidate(userData)
    if status==False:
        res["errors"]=msg
        res=make_response(res,400)
        return res
    else:
        msg,status=getUserDataByEmailOrRoll(userData['id'])
        if status:
            data=msg
            otp=data['otp']
            if str(otp)=='verified':
                res["errors"]={"msg":"OTP has been expired! send otp again"}
                res=make_response(res,400)
                return res
            if str(otp) == str(userData['otp']):
                msg,status=updateotp(userData['id'],'verified')
                if status:
                    res["response"]={"msg":"OTP has been successfully verified"}
                    res=make_response(res,200)
                    return res
                else:
                    res["errors"]=msg
                    res=make_response(res,400)
                    return res
            else:
                res["errors"]={"msg":"Incorrect OTP"}
                res=make_response(res,400)
                return res
        else:
            res["errors"]=msg
            res=make_response(res,400)
            return res
    

def setPasswordController(userData):
    res={"errors":None}
    msg,status=setPasswordValidate(userData)
    if status==False:
        res["errors"]=msg
        res=make_response(res,400)
        return res
    else:
        msg,status=getUserDataByEmailOrRoll(userData['id'])
        if status:
            email=msg['user']['email']
            passwordHash=generate_password_hash(userData['new_password'])
            d=datetime.now()
            date=str(d)[:10]
            msg,status=updatePassword(email,passwordHash,date)
            if status:
                res['response']=msg
                res=make_response(res,200)
                return res
            else:
                res['errors']=msg
                res=make_response(res,400)
                return res
        else:
            res["errors"]=msg
            res=make_response(res,400)
            return res
