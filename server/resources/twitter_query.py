
from flask_restful import Resource, request
from resources.twitter_client import TwitterClient

class TwitterQuery(Resource):
    def get(self):
        args = request.args
        query = args["query"]
        api = TwitterClient()
        return api.get_tweets(query)   
    

