from flask import Flask ,jsonify
import os
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from src.version import version
def create_app(test_config=None):
    app=Flask(__name__ , instance_relative_config=True)
    #configuration
    CORS(app)
    cors = CORS(app,resources = {
        r"/*":{
            "origin":"*"
        }
    })
    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY=os.environ.get("SECRET_KEY"),
            JWT_SECRET_KEY=os.environ.get('JWT_SECRET_KEY')
        )
    else:
        app.config.from_mapping(test_config)
    JWTManager(app)
    #Register blueprints
    app.register_blueprint(version)
    return app