
from flask_restful import Resource

class TwitterQuery(Resource):
    def get(self):
        return {"message": "Hello, World!"}
        

    
