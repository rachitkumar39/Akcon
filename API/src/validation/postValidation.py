
from src.schema.postSchema import *
from src.validation.validate import validate
from datetime import date, datetime
def createPostValidate(postData):
    _schema=schema.copy()
    if 'type' not in postData:
        return {"msg":"type Required"},False
    if postData['type']=='image':
        msg,status=validate(postData,imageCreate_)
    elif postData['type']=='event':
        msg,status=validate(postData,eventCreate_)
    elif postData['type']=='text':
        msg,status=validate(postData,textCreate_)
    else:
        return {"msg":"type is undefined"},False
    if status:
        for i in schema:
            if i in postData:
                _schema[i]=postData[i]
        date = datetime.now()
        _schema['post_date']=str(date.strftime("%d/%m/20%y"))
        return _schema,True
    else:
        return {"msg":msg},False

def likeValidation(id):
    if id is None:
        return {"msg":"id required"},False
    return {"msg":"validation successful"},True

def getPostDetailValidation(id):
    if id is None:
        return {"msg":"id required"},False
    return {"msg":"validation successful"},True

def commentValidation(commentData):
    msg,status=validate(commentData,comment_)
    if status:
        return commentData,True
    else:
        return {"msg":msg},False

def deleteCommentValidation(commentData):
    msg,status=validate(commentData,deleteComment_)
    if status:
        return commentData,True
    else:
        return {"msg":msg},False