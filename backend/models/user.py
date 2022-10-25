
from flask_mongoengine import MongoEngine
from bson import ObjectId
db = MongoEngine()


class User(db.Document):
    _id = db.ObjectIdField(default=ObjectId)
    name = db.StringField(max_length=60, required=True)
    email = db.StringField(required=True)
    passwordHash = db.StringField(required=True),
    phone = db.StringField(required=True),
    street = db.StringField(required=True, default='')
    apartment = db.StringField(required=True, default='')
    zip = db.StringField(required=True, default='')
    city = db.StringField(required=True, default='')
    country = db.StringField(required=True, default='')
    isAdmin = db.BooleanField(default=False)

    meta = {'collection': 'users'}

    def to_json(self):
        return {"name": self.name,
                "email": self.email,
                "passwordHash": self.passwordHash,
                "phone": self.phone,
                "street": self.street,
                "apartment": self.apartment,
                "city": self.city,
                "country": self.country,
                "isAdmin": self.isAdmin,
                }
