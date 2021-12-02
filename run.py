from api import create_app, socketio
from flask_socketio import emit

app = create_app()

@socketio.on('my response')
def test_response(message, methods=['GET', 'POST']):
    emit('my response', {'data': message}, broadcast=True)
    print('received message: ' + message)

if __name__ == '__main__':
    socketio.run(app, debug=True)
