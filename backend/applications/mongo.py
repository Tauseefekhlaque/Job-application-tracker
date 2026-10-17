from pymongo import MongoClient

# Connect to the MongoDB server running on this computer
client = MongoClient('mongodb://localhost:27017/', serverSelectionTimeoutMS=3000)

# Our database and collection (MongoDB creates them automatically)
db = client['job_tracker']
notes = db['notes']