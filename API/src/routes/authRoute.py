from flask import Blueprint,request
from src.controllers.authController import setPasswordController, verifyOtpController, generateOtpController, registerController, loginController

auth=Blueprint("auth",__name__,url_prefix="/auth")
@auth.post('/register')
def register():
    userData = request.get_json()
    res=registerController(userData)
    res.headers["Content-Type"] = "application/json"
    return res

@auth.post('/login')
def login():
    userData = request.get_json()
    res=loginController(userData)
    return res

@auth.get('/generateotp')
def genearateotp():
    id=request.args.get('id')
    res=generateOtpController(id)
    res.headers["Content-Type"] = "application/json"
    return res

@auth.post('/verifyotp')
def verifyotp():
    userData=request.get_json()
    res=verifyOtpController(userData)
    res.headers["Content-Type"] = "application/json"
    return res

@auth.post('/setpassword')
def setpassword():
    userData=request.get_json()
    res=setPasswordController(userData)
    res.headers["Content-Type"] = "application/json"
    return res
'''
    data={}
    json_data = request.get_json()
    _id = json_data['id']
    _pass = json_data['password']
    doc=collection.find({"$or":[{"user.email": _id},{"user.roll":_id}]})
    count=0
    for i in doc:
        count+=1
        data=i
        break
    if count==0:
        return jsonify({"message":"invalid id"}),400
    id=data['user']['roll']
    ispasswordcorrect=check_password_hash(data['password'],_pass)
    if ispasswordcorrect:
       token=create_access_token(identity=id,expires_delta=False)
        collection.update_one({"user.roll":id},{"$set" :{"token":token}})
        data['user']['token']=token
        response = make_response(
                jsonify(data['user']),200
            )
        response.headers["Content-Type"] = "application/json"
        return response
    else:
        return jsonify({"message":"password is incorrect"}),400
    '''