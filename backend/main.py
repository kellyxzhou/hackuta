from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
from flask_socketio import SocketIO, emit
import os
import subprocess
import audioprocess
import openai
from gtts import gTTS


load_dotenv()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

client = MongoClient(os.getenv("MONGODB_URI"))
openai.api_key = os.getenv("OPENAI_API_KEY")

AUDIO_FOLDER = 'temp_audio'
os.makedirs(AUDIO_FOLDER, exist_ok=True)

@socketio.on('audio_data')
def handle_audio_data(data):
    try:
        print("Received audio data")
        print(f"Type of data received: {type(data)}")
        print(f"Data size: {len(data)} bytes")

        # Decompose and spech-to-text input audio
        # with open("received_audio.wav", "wb") as f:
        #    f.write(data)
        transcription = audioprocess.generateTranscription(data)["text"]
        phenomes = audioprocess.phonemeDecomp(data)

        emit("response", {"message": transcription + str(phenomes)})
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

@app.route("/chat", methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_input = data.get('text', '')
        if not user_input:
            return jsonify({"error": "No input provided"}), 400

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a friendly assistant who engages users in simple, casual conversations."},
                {"role": "user", "content": user_input}
            ]
        )
        
        assistant_reply = response['choices'][0]['message']['content']

        audio_file = os.path.join(AUDIO_FOLDER, "response.mp3")
        tts = gTTS(assistant_reply)
        tts.save(audio_file)
        
        return jsonify({
            "response": assistant_reply,
            "audio": "http://localhost:5000/response.mp3"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/response.mp3', methods=['GET'])
def get_audio():
    return app.send_static_file('response.mp3')

if __name__ == '__main__':
    app.static_folder = os.getcwd()
    socketio.run(app, debug=True, host="0.0.0.0", port=5001)
