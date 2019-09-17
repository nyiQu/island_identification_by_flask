from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

# 声明数据库
db = SQLAlchemy()
# db = SQLAlchemy(session_options={'autocommit': True})
ma = Marshmallow()
