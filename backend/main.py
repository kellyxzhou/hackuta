from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# Establish connection to MongoDB
client = MongoClient(os.getenv("MONGODB_URI"))

# Test route to confirm MongoDB connection
@app.route("/")
def hello():
    try:
        # List databases to confirm connection
        databases = client.list_database_names()
        return jsonify({"message": "Connected to MongoDB", "databases": databases})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)