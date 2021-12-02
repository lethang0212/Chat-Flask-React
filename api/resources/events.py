from api import socketio
from flask_socketio import emit
@socketio.on('my response')

def test_response(message, methods=['GET', 'POST']):
    # emit('my response', {'data': message}, broadcast=True)
    print('received stuffs: ', message)
