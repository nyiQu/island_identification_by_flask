from Model import db, ma


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, index=True)
    username = db.Column(db.String(255), comment='用户名', index=True)
    password = db.Column(db.String(255), comment='密码')
    name = db.Column(db.String(255), comment='姓名', index=True)
    affiliation = db.Column(db.String(255), comment='所属机构')
    created_date = db.Column(db.Date, comment='创建时间')
    phone_number = db.Column(db.String(255), comment='用户手机号', index=True)
    mail = db.Column(db.String(255), comment='用户邮箱', index=True)

    def __repr__(self):
        return "User(id='%s')" % self.id


class UserSchema(ma.Schema):
    class Meta:
        fields = (
            'id', 'username', 'password', 'name', 'affiliation', 'created_date', 'phone_number', 'mail'
        )


user_schema = UserSchema(many=True)
personal_schema = UserSchema()
