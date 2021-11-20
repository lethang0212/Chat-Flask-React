import os

from flask import Flask
from flask_jwt_extended import JWTManager


def create_app(test_config=None):
    """ Application factory function """
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'chatApp.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Setup flask-jwt-extended
    app.config["JWT_SECRET_KEY"] = "secert"
    jwt = JWTManager(app)

    # register blueprints + routes
    from api.resources import db
    db.init_app(app)

    # /api/auth route
    from api.resources import auth

    auth.api.add_resource(auth.register, '/register')
    auth.api.add_resource(auth.login, '/login')
    auth.api.add_resource(auth.usersList, '/users')

    app.register_blueprint(auth.bp)

    return app
