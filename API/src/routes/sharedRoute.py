from flask import Blueprint, jsonify,request
from flask_jwt_extended import jwt_required,get_jwt_identity
from src.controllers.sharedController import uploadImageController 

shared=Blueprint("shared",__name__,url_prefix="/shared")

@shared.post("/uploadimage")
@jwt_required()
def uploadImage():
  image={}
  image['type']=request.form["type"]
  image['image']=request.files["image"]
  res=uploadImageController(image)
  return res
  # return jsonify({"msg":"hello"})