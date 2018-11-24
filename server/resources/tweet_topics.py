from nltk.corpus import brown, stopwords
import nltk
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.cluster import DBSCAN
import numpy as np
import re

test = "Republicans and Democrats MUST come together, finally, with a major Border Security package, which will include funding for the Wall. After 40 years of talk, it is finally time for action. Fix the Border, for once and for all, NOW!"
test_rt = "RT @HNTitles: Elon Musk is getting serious about ES6 generator functions https:hakjshfk"

stop_words = stopwords.words('english')

wordtags = nltk.ConditionalFreqDist((w.lower(), t) 
        for w, t in brown.tagged_words(tagset="universal"))

def preprocessSentence(sentence):
    new = sentence

    #remove unnecessary RT info
    if new[0] == "R" and new[1] == "T":
        end_of_rt = new.find(':') + 2
        new = new[end_of_rt:]

    #remove filler words
    s = " "
    str_arr = new.split(s)
    str_arr_filtered = [x for x in str_arr if x not in stop_words and x[0:4] != "http"]

    #get rid of all this random /u stuff
    for string in str_arr_filtered:
        if string.find("/u") != -1:
            if string.find("/u") + 5 < len(string):
                rm_substring = string[string.find("/u"):string.find("/u") + 5]
            else:
                rm_substring = string[string.find("/u"):]
            string = string.replace(rm_substring, "")

    new = s.join(str_arr_filtered)
    #filter all other non word characters
    new = re.sub(r'([^\s\w]|_)+', '', new)

    #convert to only lowercase
    new = new.lower()

    print(new)

    return new 

def getBagOfWords(corpus):
    vectorizer = CountVectorizer()
    X = vectorizer.fit_transform(corpus)
    print(vectorizer.get_feature_names())
    print(X.toarray())  

#print(list(wordtags['report']))
document = [preprocessSentence(test), preprocessSentence(test_rt)]
getBagOfWords(document)


