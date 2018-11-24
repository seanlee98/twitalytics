
from flask import Blueprint
from flask_restful import Api
from resources.twitter_query import TwitterQuery

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# Route
api.add_resource(TwitterQuery, '/twitter_query')
