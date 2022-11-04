import json

from flask import Blueprint, request, jsonify
from random import random
from flask_cors import cross_origin
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
    unset_jwt_cookies, jwt_required, JWTManager
import hashlib
# from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId


class UserAuthorization:

    def __init__(self, db, jwt):
        self.db = db
        self.jwt = jwt
        self.authorization = self.create_aut()
        #CORS(self.authorization, support_credentials=True)

    def create_aut(self):
        authorization_page = Blueprint('authorization', __name__)
        # CORS(authorization_page)

        @authorization_page.route('/')
        def hello_world():
            return 'Hello Andrey'

        @authorization_page.route('/login', methods=["POST"])
        @cross_origin()
        def create_token():
            email = request.json.get("email", None)
            password = request.json.get("password", None)
            login_details = request.get_json()
            user_from_db = self.db.users.find_one(
                {'email': login_details["email"]})
            if user_from_db:
                encrpted_password = hashlib.sha256(login_details["password"].encode(
                    "utf-8")).hexdigest()
                if encrpted_password == user_from_db['passwordHash']:
                    access_token = create_access_token(identity=email)
                    response = {"access_token": access_token, "email": email}
                    return response
                return {"msg": "Wrong password"}, 401
            return {"msg": "Wrong email"}, 401

        @authorization_page.route("/logout", methods=["POST"])
        def logout():
            response = jsonify({"msg": "logout successful"})
            unset_jwt_cookies(response)
            return response

        @authorization_page.route("/register", methods=['POST'])
        @cross_origin()
        def add_user():
            print('request is post or get:', request.method)

            _json = request.get_json()
            name = _json['name']
            email = _json['email']
            phone = _json['phone']
            # password = _json['password']
            password = hashlib.sha256(
                _json["password"].encode("utf-8")).hexdigest()
            street = _json['street']
            city = _json['city']
            country = _json['country']
            zip = _json['zip']
            print(name, email, phone, password, street, city)
            isAdmin = False

            doc = self.db.users.find_one({"email": email})
            if not doc:
                self.db.users.insert_one(
                    {
                        'name': name,
                        'email': email,
                        'phone': phone,
                        'passwordHash': password,
                        'city': city,
                        'street': street,
                        'isAdmin': isAdmin,
                        'country': country,
                        'zip': zip,
                        'apartment': ''
                    }
                )
                return jsonify({'msg': 'User created successfully'})
            return jsonify({'msg': 'Username already exists'}), 401

        return authorization_page
