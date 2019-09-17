from flask import Flask
from flask_cors import *
from app.logging_info import *
import app.user_login as auth
from flask_jwt_extended import JWTManager
from app.user_login.blue_print import *
from flask_compress import Compress
from Model import db
import datetime


# flask app
def create_app():
    app = Flask(__name__, static_folder='../static', static_url_path='')
    CORS(app)
    Compress(app)
    app.app_context().push()
    # 设置接口响应数据格式
    app.config['JSON_AS_ASCII'] = False

    # 连接数据库
    app.permanent_session_lifetime = datetime.timedelta(seconds=720 * 60)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123456@127.0.0.1:5432/island'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = False
    app.config['SQLALCHEMY_ECHO'] = False
    app.config['JWT_SECRET_KEY'] = 'UbuQgGIdry*H&&I@'
    app.config['JWT_BLACKLIST_ENABLED'] = False
    app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
    db.init_app(app)
    db.create_all()

    # 注册蓝图
    app.register_blueprint(auth.blueprint)
    # 注册JWT
    jwt = JWTManager(app)

    # Set the secret key to some random bytes. Keep this really secret!
    app.secret_key = b'_5#y2L"F4Q8z\n\xec]hhfhfj8989jjja/'

    # 日志
    LoggingINFO.logging_setting()
    return app
