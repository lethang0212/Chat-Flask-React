from flask import Flask
from flask_restful import reqparse, abort, Api, Resource

app = Flask(__name__)
api = Api(app)

USERS = {
    'user1': {'id': 1, 'firstname': 'Le', 'lastname': 'Thang', 'username': 'smilerkai', 'password': 'Daithang@0212', 'address': 'Ha Noi, Viet Nam', 'phone': '0123456789'},
    'user2': {'id': 2, 'firstname': 'Nguyen', 'lastname': 'Quy','username': 'nguyenquy', 'password': 'Nguyenquy@', 'address': 'Ha Noi, Viet Nam', 'phone': '0123456789'},
    'user3': {'id': 3, 'firstname': 'Tran', 'lastname': 'Khang', 'username': 'trankhang', 'password': 'Trankhang@', 'address': 'Ha Noi, Viet Nam', 'phone': '0123456789'},
    'user4': {'id': 4, 'firstname': 'Pham', 'lastname': 'Thieu', 'username': 'phamthieu', 'password': 'Phamthieu@', 'address': 'Ha Noi, Viet Nam', 'phone': '0123456789'},
    'user5': {'id': 5, 'firstname': 'Ho', 'lastname': 'Than', 'username': 'hothan', 'password': 'Hothan@', 'address': 'Ha Noi, Viet Nam', 'phone': '0123456789'},
}

def abort_if_todo_doesnt_exist(user_id):
    if user_id not in USERS:
        abort(404, message="User {} doesn't exist".format(user_id))

parser = reqparse.RequestParser()
parser.add_argument('id')
parser.add_argument('firstname')
parser.add_argument('lastname')
parser.add_argument('username')
parser.add_argument('password')
parser.add_argument('email')
parser.add_argument('address')
parser.add_argument('phone')

# Todo
# shows a single todo item and lets you delete a todo item
class User(Resource):
    def get(self, user_id):
        abort_if_todo_doesnt_exist(user_id)
        return USERS[user_id]

    def delete(self, user_id):
        abort_if_todo_doesnt_exist(user_id)
        del USERS[user_id]
        return '', 204

    def put(self, user_id):
        args = parser.parse_args()
        id = {'id': args['id']}
        USERS[user_id] = id
        return id, 201


# TodoList
# shows a list of all todos, and lets you POST to add new tasks
class UserList(Resource):
    def get(self):
        return USERS
                                      
    def post(self):
        args = parser.parse_args()
        user_id = int(max(USERS.keys()).lstrip('user')) + 1
        id = user_id
        user_id = 'user%i' % user_id
        USERS[user_id] = {
            'id': id, 'firstname': args['firstname'], 'lastname': args['lastname'], 'username': args['username'], 'password': args['password'], 'email': args['email'],'address': args['address'], 'phone': args['phone'],
        }
        return USERS[user_id], 201

## 
## Actually setup the Api resource routing here
##
api.add_resource(UserList, '/users')
api.add_resource(User, '/users/<user_id>')


if __name__ == '__main__':
    app.run(debug=True)