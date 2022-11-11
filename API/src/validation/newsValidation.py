from datetime import datetime
from src.validation.validate import validate
from src.schema.newsSchema import *

def createNewsValidate(postData):
    _schema=schema.copy()
    print("postdata of requesr///////",postData)
    if 'type' not in postData:
        return {"msg":"type Required"},False
    if postData['type']=='news':
        msg,status=validate(postData,newsCreate_)
    else:
        return {"msg":"type is undefined"},False
    if status:
        for i in schema:
            if i in postData:
                _schema[i]=postData[i]
        date = datetime.now()
        _schema['news_date']=str(date.strftime("%d/%m/20%y"))
        return _schema,True
    else:
        return {"msg":msg},False
    
def getNewsDetailValidation(id):
    if id is None:
        return {"msg":"id required"},False
    return {"msg":"validation successful"},True