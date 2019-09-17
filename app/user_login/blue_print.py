from flask import Blueprint
from flask_restplus import Api
from app.user_login.user_auth import auth_ns
# from api import web_api
# from api.water_section import data_api

# 创建blueprint
blueprint = Blueprint('', __name__, url_prefix='')
api = Api(blueprint)

api.add_namespace(auth_ns)
# api.add_namespace(web_api)
# api.add_namespace(data_api)
