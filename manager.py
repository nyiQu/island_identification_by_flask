from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app import create_app
from Model import db

# 建立flask应用
app = create_app()
manager = Manager(app)
migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)


@manager.command
def run():
    app.run(host='0.0.0.0', port=8000, debug=True)


if __name__ == '__main__':
    manager.run()
