
import flask
from src.routes.authRoute import auth
from src.routes.profileRoute import profile
from src.routes.postRoute import post
from src.routes.newsRoute import news
from src.routes.sharedRoute import shared
from src.routes.messageRoute import message

version=flask.Blueprint("version",__name__,url_prefix="/v1")
version.register_blueprint(auth)
version.register_blueprint(news)
version.register_blueprint(profile)
version.register_blueprint(post)
version.register_blueprint(shared)
version.register_blueprint(message)