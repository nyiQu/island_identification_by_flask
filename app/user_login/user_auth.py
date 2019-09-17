from flask_jwt_extended import create_access_token
from flask_restplus import Resource, Namespace
from flask import request, session, redirect, jsonify, send_from_directory, send_file
import domain as model_module
import os

# 前端文件路径
root = os.path.join(os.path.dirname(os.path.abspath(os.path.dirname(os.path.dirname(__file__)))), "templates")

# 定义新的命名空间
auth_ns = Namespace('')


# 文件查看
@auth_ns.route('/download/<file_name>')
class GetFiles(Resource):
    @staticmethod
    def get(file_name):
        UPLOAD_FOLDER = os.path.abspath('.') + "\\upload"
        path = UPLOAD_FOLDER
        if os.path.exists(os.path.join(path, file_name)):
            return send_file(os.path.join(path, file_name))
        else:
            return redirect("/file_error.html")


# 文件下载
@auth_ns.route('/downloadFile/<file_name>')
class DownloadFile(Resource):
    @staticmethod
    def get(file_name):
        upload_folder = os.path.abspath('.') + "\\upload"
        if os.path.exists(os.path.join(upload_folder, file_name)):
            return send_from_directory(upload_folder, file_name, as_attachment=True)
        else:
            return redirect("/file_error.html")


# 页面跳转
@auth_ns.route('/<filename>.html')
class UserAuth(Resource):
    @staticmethod
    def get(filename):
        if session.get('username') == 'huankeyuan':
            return send_from_directory(root, 'mobile_monitoring.html')
        else:
            if filename != 'public_participation_masses' and filename != 'personal_info':
                if 'username' in session:
                    username = session.get('username')
                    user = model_module.User.query.filter(model_module.User.username == username).first()
                    if user.position == 'Administrator' or filename == 'index':
                        return send_from_directory(root, filename + '.html')
                    else:
                        role = model_module.Role.query.filter(model_module.Role.position == user.position).first()
                        auth = model_module.Auth.query.filter(model_module.Auth.role_id == role.id).first()
                        page_name = model_module.PageAuth.query.filter(
                            model_module.PageAuth.page_url == filename).first()
                        if auth:
                            auth_list = auth.page_id.split(',')
                            if str(page_name.id) in auth_list:
                                return send_from_directory(root, filename + '.html')
                            else:
                                return send_from_directory(root, 'auth_error.html')
                        else:
                            return send_from_directory(root, 'auth_error.html')
                else:
                    return redirect("login")
            else:
                if filename == 'public_participation_masses':
                    return send_from_directory(root, 'public_participation_masses.html')
                else:
                    return send_from_directory(root, 'personal_info.html')


# 登陆
@auth_ns.route('/login')
class Login(Resource):
    @staticmethod
    def get():
        session.permanent = True
        return send_from_directory(root, 'login.html')

    @staticmethod
    def post():
        data = request.get_json()
        username = data.get('username')
        try:
            user = model_module.User.query.filter(model_module.User.username == username).first()
        except:
            result = {
                'success': False,
                'code': '',
                'msg': '用户名错误',
                'content': ''
            }
            return jsonify(result)
        user_msg = model_module.personal_schema.dump(user).data
        if data.get('password') == user.password:
            for key in user_msg.keys():
                session[key] = user_msg.get(key)
            result = {
                'success': True,
                'code': '',
                'msg': '',
                'content': ''
            }
            return jsonify(result)
        else:
            result = {
                'success': False,
                'code': '',
                'msg': '密码错误',
                'content': ''
            }
            return jsonify(result)


# 登出
@auth_ns.route('/logout')
class Logout(Resource):
    def get(self):
        session.pop('username', None)
        return redirect('login')


# 页面跳转
@auth_ns.route('/')
class Index(Resource):
    def get(self):
        if 'username' in session:
            if session.get('username') == 'huankeyuan':
                return send_from_directory(root, 'mobile_monitoring.html')
            else:
                return send_from_directory(root, 'index.html')
        else:
            return redirect("login")


@auth_ns.route('/loginToken')
class Token(Resource):
    @staticmethod
    def post():
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400

        username = request.json.get('username', None)
        password = request.json.get('password', None)
        if not username:
            return jsonify({"msg": "Missing username parameter"}), 400
        if not password:
            return jsonify({"msg": "Missing password parameter"}), 400

        if username != 'admin' or password != '123456':
            return jsonify({"msg": "Bad username or password"}), 401

        # Identity can be any data that is json serializable
        access_token = create_access_token(identity=username)
        response = jsonify(access_token=access_token)
        response.status_code = 200
        return response
