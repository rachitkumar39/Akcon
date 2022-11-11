from src.config import config
from flask import Config, make_response
from werkzeug.utils import secure_filename
import os
import uuid

def uploadImageController(image):
  res={"errors":None}
  if image['type']=='post':
    imagePath=config.POST_IMAGE_PATH
  elif image['type']=='news':
    imagePath=config.NEWS_IMAGE_PATH
  if image['type']=='profile':
    imagePath=config.PROFILE_IMAGE_PATH
  file=image['image']
  ex=file.filename.split('.')
  imageName = str(uuid.uuid4())
  file.filename=imageName+"."+ex[1]
  fileName=secure_filename(file.filename)
  file.save(os.path.join(imagePath,fileName))
  mediaurl=file.filename
  res["response"]={"mediaurl":mediaurl}
  res=make_response(res,200)
  return res
  