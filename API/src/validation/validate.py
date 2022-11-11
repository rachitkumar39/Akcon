def validate(userData,required):
  err=""
  for i in required:
    if i not in userData:
      err=err+str(i)+", "
  if len(err)>0:
    err=err[0:len(err)-2]
    err=err+" Required"
    return err,False
  return "validate successfully",True
