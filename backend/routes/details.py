from datetime import datetime, timedelta, timezone
import json
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
    unset_jwt_cookies, jwt_required, JWTManager,verify_jwt_in_request
import hashlib
from werkzeug.datastructures import ImmutableMultiDict
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_cors import CORS, cross_origin
from flask import Blueprint, request, jsonify
from functools import wraps

class DetailsUser:

    def __init__(self, db, jwt):
        self.db = db
        self.jwt = jwt
        self.details = self.create_det()
        # cors = CORS(self)
        # self.config['CORS_HEADERS'] = 'Content-Type'

    def create_det(self):
        details_page = Blueprint('details', __name__)

        @details_page.route('/profile')
        # headers=['Content-Type', 'Authorization'])
        @cross_origin()
        @jwt_required()
        def my_profile():
            #print("jwt is = ", get_jwt()['sub'])
            print("get_jwt_identity = ",get_jwt_identity())
            print("request.path.rsplit('/', 1)[-1] = ",request.path.rsplit('/', 1)[-1])
            # doc = self.db.users.find_one({"email": get_jwt()['sub']})
            doc = self.db.users.find_one({"email": get_jwt_identity()})
            response_body = {
                "name": doc["name"],
                "phone": doc["phone"],
                "email": f'{doc["email"]}'
            }
            return response_body


        def validate_user_admin():
            def validate_user(fn):
                @wraps(fn)
                def wrapper(*args, **kwargs):
                    #name = request.path.rsplit('/', 1)[-1]
                    verify_jwt_in_request()
                    current_user = self.db.users.find_one({"email": get_jwt_identity()})
                   
                    if  (current_user["isAdmin"] ==True):
                    # if (current_user["name"] == name) and (current_user["isAdmin"] ==True):
                        #kwargs["logged_user"] = current_user # If you need to use the user object in the future you can use this by passing it through the kwargs params
                        print("--->true")
                        return fn(*args, **kwargs)
                    else:
                        print("--->false")
                        return {'message': 'You are not authorized to access this data.'}, 403                            
                return wrapper
            return validate_user

        #Get all users
        #@jwt_required()
        @cross_origin()
        @details_page.route('/users')
        @validate_user_admin()
        def post():
            us = list(self.db.users.find({}))
            #print("hello")
            return json.loads(dumps(us))
 

        @details_page.after_request
        @cross_origin()
        def refresh_expiring_jwts(response):
            print("pppppppppppppppppppp")
            try:
                exp_timestamp = get_jwt()["exp"]
                now = datetime.now(timezone.utc)
                target_timestamp = datetime.timestamp(
                    now + timedelta(minutes=30))
                if target_timestamp > exp_timestamp:
                    access_token = create_access_token(
                        identity=get_jwt_identity())
                    data = response.get_json()

                    if type(data) is dict:
                        data["access_token"] = access_token
                        print(data["access_token"])
                        response.data = json.dumps(data)
                return response
            except (RuntimeError, KeyError):
                # Case where there is not a valid JWT. Just return the original respone
                return response

        return details_page
