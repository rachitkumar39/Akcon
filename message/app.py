from flask import Flask, render_template, session, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO
from datetime import datetime



app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

users = {}
@socketio.on('connect')
def on_connect():
    print('Client connected')
    socketio.emit('my response', {'data': 'Connected'})

@socketio.on('disconnect')
def on_disconnect():
    users.pop(request.sid,'No user found')
    socketio.emit('current_users', users)
    print("User disconnected!\nThe users are: ", users)


@socketio.on('message')
def messaging(message, methods=['GET', 'POST']):
    now = datetime.now()
    timeAndDate = list(now.strftime("%d/%m/%Y %H:%M:%S").split(" "))
    message['date']=timeAndDate[0]
    message['time']=timeAndDate[1][:5]
    # print('received message: ' + str(message))
    socketio.emit('message', message)

if __name__ == '__main__':
    socketio.run(app, debug=True,port=5001)