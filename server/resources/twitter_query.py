
from flask_restful import Resource, request
from twitter_client import TwitterClient

class TwitterQuery(Resource):
    def get(self):
        args = request.args
        api = TwitterClient()
        return {"message": "Hello, World!"}
        

    
