import json
from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
    unset_jwt_cookies, jwt_required, JWTManager
import hashlib
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

api = Flask(__name__)

api.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
api.config["MONGO_URI"] = "mongodb+srv://eshop-user:Aa123456@cluster0.3rgmgrt.mongodb.net/eshop-db?retryWrites=true&w=majority"
api.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=10)
mongo = PyMongo(api)
jwt = JWTManager(api)


@api.route("/register", methods=['POST'])
def add_user():
    print('request is post or get:', request.method)

    # _json = request.json
    _json = request.get_json()
    name = _json['name']
    email = _json['email']
    phone = _json['phone']
    # password = _json['password']
    password = hashlib.sha256(_json["password"].encode("utf-8")).hexdigest()
    street = _json['street']
    city = _json['city']
    country = _json['country']
    zip = _json['zip']
    print(name, email, phone, password, street, city)
    isAdmin = False

    doc = mongo.db.users.find_one({"email": email})
    if not doc:
        mongo.db.users.insert_one(
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
    return jsonify({'msg': 'Username already exists'})


@api.route('/login', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    login_details = request.get_json()
    user_from_db = mongo.db.users.find_one(
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


@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)

        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                print(data["access_token"])
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@api.route('/profile')
@jwt_required()
def my_profile():
    # x = request.get_json()
    # print(x)

    response_body = {
        "name": "Andy",
        "about": "Hello! I'm a full stack developer that loves python and javascript",
    }
    return response_body
