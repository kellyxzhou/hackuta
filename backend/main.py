from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
from flask_socketio import SocketIO, emit
import os
import subprocess

load_dotenv()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

client = MongoClient(os.getenv("MONGODB_URI"))

@socketio.on('audio_data')
def handle_audio_data(data):
    try:
        print("Received audio data")
        print(f"Type of data received: {type(data)}")
        print(f"Data size: {len(data)} bytes")

        # Save the received data as .wav
        with open("received_audio.wav", "wb") as f:
            f.write(data)

        emit("response", {"message": "Audio received successfully"})
    except Exception as e:
        print(f"Error: {e}")
        emit("error", {"message": str(e)})

@app.route("/")
def hello():
    try:
        databases = client.list_database_names()
        return jsonify({"message": "Connected to MongoDB", "databases": databases})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    socketio.run(app, debug=True, host="0.0.0.0", port=5001)
