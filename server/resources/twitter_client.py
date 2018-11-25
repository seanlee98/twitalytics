import re  
from textblob import TextBlob 
from datetime import date, datetime, timedelta
import twython
from twython import Twython  
from resources.tweet_topics import getTweetTopics

class TwitterClient(object): 
	''' 
	Generic Twitter Class for sentiment analysis. 
	'''
	def __init__(self): 
		''' 
		Class constructor or initialization method. 
		'''
		# keys and tokens from the Twitter Dev Console 
		account0 = {
			"consumer_key": 'yxB1e2ilD3jWtfmq8xaNszGvi',
			"consumer_secret": 'qBCvdycFsb5PwSiGSam5PPDOHGwViRrJcrdeUd6PmqS5TDn5up',
		}
		account1 = {
			"consumer_key": 'vyOVChNpw0QFI9i3VbbD5DmQj',
			"consumer_secret": 'AO3RPNUvmh8oZDQsxiCtubQtdCksiqS2ysSMu0xTuF0Bgp8Dxj',
		}
		account2 = {
			"consumer_key": 'RWlq5oMusXJSwmgzCH3SLtii6',
			"consumer_secret": 'WRQ2md3RmGVzXsCMNxjvzaNhfZ2CuHOjsVLpIIHh8ADED8ZsvL',
		}
		account3 = {
			"consumer_key": 'ENE70oiMDLwiv3CFJtNcLVXNx',
			"consumer_secret": '33AU7pd8EJZgQAyMB2w8SybRCpNQyxXtX2v53KShYMhUhXnL2s',
		}
		account4 = {
			"consumer_key": 'FbBzH9UH3IV7vOwKNf07i4WkW',
			"consumer_secret": 'luuSMMhLarF5VqY5r8RhRWNKtNGnpcTpCtobGhRPle7BAwgvEss',
		}
		self.Months = {
			"Jan" : 1,
			"Feb" : 2,
			"Mar" : 3,
			"Apr" : 4,
			"May" : 5,
			"Jun" : 6,
			"Jul" : 7,
			"Aug" : 8,
			"Sept" : 9,
			"Oct" : 10,
			"Nov" : 11,
			"Dec" : 12
		}
		try: 
			# Instantiate an object
			python_tweets0 = Twython(account0["consumer_key"], account0["consumer_secret"])
			python_tweets1 = Twython(account1["consumer_key"], account1["consumer_secret"])
			python_tweets2 = Twython(account2["consumer_key"], account2["consumer_secret"])
			python_tweets3 = Twython(account3["consumer_key"], account3["consumer_secret"])
			python_tweets4 = Twython(account4["consumer_key"], account4["consumer_secret"])
			self.python_tweets = [python_tweets0,python_tweets1,python_tweets2,python_tweets3,python_tweets4]
			self.twitter_index = 0
		except: 
			print("Error: Authentication Failed") 

	def clean_tweet(self, tweet): 
		''' 
		Utility function to clean tweet text by removing links, special characters 
		using simple regex statements. 
		'''
		return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t]) |(\w+:\/\/\S+)", " ", tweet).split()) 

	def get_tweet_sentiment(self, tweet): 
		''' 
		Utility function to classify sentiment of passed tweet 
		using textblob's sentiment method 
		'''
		# create TextBlob object of passed tweet text 
		analysis = TextBlob(self.clean_tweet(tweet)) 
		# set sentiment 
		return analysis.sentiment.polarity * 100 

	def json_serial(self, obj):
		"""JSON serializer for objects not serializable by default json code"""

		if isinstance(obj, (datetime, date)):
			return obj.isoformat()
		raise TypeError ("Type %s not serializable" % type(obj))

	def subtract_hour_from_datetime(self, obj):
		return obj - timedelta(hours=1)
	def get_tweets(self, search_parameters, count = 100): 
		''' 
		Main function to fetch tweets and parse them. 
		'''
		# empty list to store parsed tweets 
		intervals = {} 
		bad_tweets = []
		good_tweets = []
		cumulative_percentages = {
			"Very Bad": 0,
			"Bad": 0,
			"Average": 0,
			"Good": 0,
			"Very Good": 0,
		}
		tweet_frequency = {}
		current_time = datetime.utcnow()
		current_time = current_time.replace(second=0, microsecond=0, minute=0, hour=current_time.hour)
		intervals[self.json_serial(current_time)] = {
				"sentiments": {
					"Very Bad": 0,
					"Bad": 0,
					"Average": 0,
					"Good": 0,
					"Very Good": 0,
				}, 
				"average_value": [], 
			}
		for _ in range(168):
			current_time = self.subtract_hour_from_datetime(current_time)
			intervals[self.json_serial(current_time)] = {
				"sentiments": {
					"Very Bad": 0,
					"Bad": 0,
					"Average": 0,
					"Good": 0,
					"Very Good": 0,
				}, 
				"average_value": [], 
			}
		try: 
			smallest_id = 9223372036854775807
			run = True
			query = {
				'q': str(search_parameters),  
				'count': 100,
				'lang': 'en'
			}
			while run:
				try:
					# call twitter api to fetch tweets 
					fetched_tweets = self.python_tweets[self.twitter_index].search(**query)['statuses']
					if len(fetched_tweets) == 0:
						run = False
					else:
						# add sentiments to correct bucket in time
						for tweet in fetched_tweets:  
							smallest_id = tweet["id"] if tweet["id"] < smallest_id else smallest_id
							created_at = tweet["created_at"].split()
							created_at = created_at[5] + "-" + str(self.Months[created_at[1]]) + "-" + created_at[2] + "T" + created_at[3][0] + created_at[3][1] + ":00:00"
							sentiment = self.get_tweet_sentiment(tweet["text"]) 
							print(sentiment)
							if tweet["text"][0] == 'R' and tweet["text"][1] == 'T':
								retweeted_text = tweet_frequency["text"][3:]
							else:
								retweeted_text = tweet["text"]
							if retweeted_text in tweet_frequency:
								tweet_frequency[retweeted_text] += 1
							else:
								tweet_frequency[tweet["text"]] = 1
							intervals[created_at]["average_value"].append(sentiment)
							if sentiment >= -100 and sentiment < -60:
								intervals[created_at]["sentiments"]["Very Bad"] += 1
								cumulative_percentages["Very Bad"] += 1
								bad_tweets.append(tweet["text"])
							elif sentiment >= -60 and sentiment < -20:
								intervals[created_at]["sentiments"]["Bad"] += 1
								cumulative_percentages["Bad"] += 1
								bad_tweets.append(tweet["text"])
							elif sentiment >= -20 and sentiment < 20:
								intervals[created_at]["sentiments"]["Average"] += 1
								cumulative_percentages["Average"] += 1
							elif sentiment >= 20 and sentiment < 60:
								intervals[created_at]["sentiments"]["Good"] += 1
								cumulative_percentages["Good"] += 1
								good_tweets.append(tweet["text"])
							elif sentiment >= 60 and sentiment <= 100:
								intervals[created_at]["sentiments"]["Very Good"] += 1
								cumulative_percentages["Very Good"] += 1
								good_tweets.append(tweet["text"])
						# call twitter api to fetch tweets 
						query = {
							'q': str(search_parameters),  
							'count': 100,
							'max_id': smallest_id,
							'lang': 'en'
						}
				except Exception as e:
					if "Rate limit exceeded" in str(e):
						self.twitter_index += 1
					elif "out of range" in str(e):
						print("You have been throttled to death")
						run = False
					else:
						run = False
			for _,interval in intervals.items():
				if interval["average_value"]:
					num = len(interval["average_value"])
					total = 0
					for sentiment in interval["average_value"]:
						total += sentiment
					interval["average_value"] = total / num
				else:
					interval["average_value"] = 0

			cumulative_total = 0
			for _,count in cumulative_percentages.items():
				cumulative_total += interval

			for _,count in cumulative_percentages.items():
				count = (count / cumulative_total) * 100

			# frontend has asked for this response shape and so it shall be
			correct_shape = []
			for key, interval in intervals.items():
				total = 0
				for _, amount in interval["sentiments"].items():
					count += amount
				correct_shape.append(
					{
						"interval": key,
						"sentiments": {
							"Very Bad": interval["sentiments"]["Very Bad"],
							"Bad": interval["sentiments"]["Bad"],
							"Average": interval["sentiments"]["Average"],
							"Good": interval["sentiments"]["Good"],
							"Very Good": interval["sentiments"]["Very Good"],
						}, 
						"average_value": interval["average_value"], 
						"count": count,
					}
			) 
			correct_shape = sorted(correct_shape, key=lambda k: k['interval'])
			print("reached right before common_tweets")
			common_tweets = {"bad_tweets": getTweetTopics(list(set(bad_tweets))), "good_tweets": getTweetTopics(list(set(good_tweets)))}
			return {
				"sentiments": correct_shape, 
				"cumulative_percentages": cumulative_percentages, 
				"most_retweeted": max(tweet_frequency, key=tweet_frequency.get),
				"common_tweets": common_tweets
			} 
			
		except Exception as e: 
			print("You done fucked up")
			print(str(e))