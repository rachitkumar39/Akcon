from flask import jsonify, make_response
from src.db.messageQuery import getChatHistoryQuery, userListQuery,createMesssageQuery
from src.db.userQuery import getUserDataByEmailOrRoll
from src.validation.messageValidation import messageValidate
from datetime import datetime



def createMessageController(data):
  status=False
  res={"errors":None}
  now = datetime.now()
  timeAndDate = list(now.strftime("%d/%m/%Y %H:%M:%S").split(" "))
  data['date']=timeAndDate[0]
  data['time']=timeAndDate[1][:5]
  # print(timeAndDate[0])
  # print(timeAndDate[1][0:5])
  msg,status=messageValidate(data)
  if status:
      data,status=createMesssageQuery(msg)
      res['response']=data
      res=make_response(res,200)
      return res
  else:
      res["errors"]=msg
      res=make_response(res,400)
      return res

def getChatHistoryController(id1,id2):
  status=False
  res={"errors":None}
  msg,status=getChatHistoryQuery(id1,id2)
  if status:
    data=msg
    
    res['response']=data
    res=make_response(res,200)
    return res
  else:
      res["errors"]=msg
      res=make_response(res,400)
      return res


def userListController(id):
  status=False
  res={"errors":None}
  msg,status=userListQuery(id)
  if status:
      data=[]
      user={}
      for i in msg:
        userData,status=getUserDataByEmailOrRoll(i)
        # print("/////////////////////////") 
        # print(msg)
        # print(status)
        if status:
          print("/////////////////////////") 
          print("user>",id)
          print("i>",i)
          lastMessage,status=getChatHistoryQuery(i,id)
          lastMessage=lastMessage[len(lastMessage)-1]['message']
          user['id']=i
          user['first_name']=userData['user']['first_name']
          user['last_name']=userData['user']['last_name']
          user['image']=userData['user']['image']
          user['last_message']=lastMessage
          data.append(user.copy())
          user.clear()
          
      res['response']=data
      res=make_response(res,200)
      return res
  else:
      res["errors"]=msg
      res=make_response(res,400)
      return res
  
