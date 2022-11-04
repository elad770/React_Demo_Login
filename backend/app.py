# import json

from flask import Flask, request, jsonify
from routes.authorization import UserAuthorization
from routes.details import DetailsUser
from flask_jwt_extended import JWTManager
from flask_pymongo import PyMongo


app = Flask(__name__)
app.config.from_pyfile('settings.py')
mongo = PyMongo(app)
jwt = JWTManager(app)

userAut = UserAuthorization(mongo.db, jwt)
app.register_blueprint(DetailsUser(mongo.db, jwt).details)
app.register_blueprint(userAut.authorization)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
