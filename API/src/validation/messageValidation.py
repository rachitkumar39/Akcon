from  src.schema.messageSchema import schema,messageCreate_
from src.validation.validate import validate
def messageValidate(data):
    _schema=schema.copy()
    msg,status=validate(data,messageCreate_)
    if status:
        for i in schema:
          _schema[i]=data[i]
        return _schema,True
    else:
        return {"msg":msg},False