
from flask_restful import Resource, request
from resources.twitter_client import TwitterClient

class TwitterQuery(Resource):
    def get(self):
        interval = request.json.get('interval')
        query = request.json.get('query')
        api = TwitterClient()
        return api.get_tweets(interval, query)        

    
