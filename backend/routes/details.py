from datetime import datetime, timedelta, timezone
import json
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
    unset_jwt_cookies, jwt_required, JWTManager
import hashlib
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_cors import CORS, cross_origin
from flask import Blueprint, request, jsonify


class DetailsUser:

    def __init__(self, db, jwt):
        self.db = db
        self.jwt = jwt
        self.details = self.create_det()

    def create_det(self):
        details_page = Blueprint('details', __name__)

        @details_page.route('/profile')
        @cross_origin()
        @jwt_required()
        def my_profile():
            response_body = {
                "name": "XP 2005",
                "about": "Hello! I'm a full stack developer that loves python and javascript",
                # "email": f'{request.get_json()["email"]}'
            }
            return response_body

        @details_page.after_request
        @cross_origin()
        def refresh_expiring_jwts(response):
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
