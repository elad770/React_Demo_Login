from dotenv import dotenv_values, load_dotenv
from datetime import timedelta
import os
load_dotenv()

# config = os.getenv("MONGO_URI") #dotenv_values(".env")
MONGO_URI = os.getenv("MONGO_URI")  # config['MONGO_URI']
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")  # config['JWT_SECRET_KEY']
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=10)
