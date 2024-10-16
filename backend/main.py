from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
from flask_socketio import SocketIO, emit
import os
import subprocess
import audioprocess
from openai import OpenAI
from pathlib import Path
from audioprocess import generateTranscription, phonemeDecomp, buildSynPhonemes
import librosa

load_dotenv()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

client = MongoClient(os.getenv("MONGODB_URI"))
openai_client = OpenAI()

AUDIO_FOLDER = 'temp_audio'
os.makedirs(AUDIO_FOLDER, exist_ok=True)

@socketio.on("audio_data")
def handle_audio_data(data):
    try:
        print("Received audio data")
        print(f"Type of data received: {type(data)}")
        print(f"Data size: {len(data)} bytes")
        
        with open("received_data.wav", "wb") as f:
            f.write(data)

        readdata, _ = librosa.load("received_data.wav", sr=22050)
        phonemes = phonemeDecomp(readdata)
        transcriptList = generateTranscription(readdata)
        synPhonemes = buildSynPhonemes(transcriptList)
        
        transcript = "".join(transcriptList)

        longest_common_substrings = []
        for syn_phoneme in synPhonemes:
            max_len = len(max(''.join(syn_phoneme).replace(' ', ''), ''.join(phonemes).replace(' ', ''), key=len))
            if (max_len > len((''.join(syn_phoneme).replace(' ', '')))-2):
                longest_common_substrings.append(2)
            elif (max_len > len((''.join(syn_phoneme).replace(' ', '')))-4):
                longest_common_substrings.append(1)
            else:
                longest_common_substrings.append(0)

        resBody = {
            "phonemes": phonemes,
            "transcript": transcript,
            "transcriptList": transcriptList,
            "synPhonemes": synPhonemes,
            "wordRatings": longest_common_substrings
        }
            
        emit("response", {"message": resBody})
    except Exception as e:
        print(f"Error: {e}")
        emit("error", {"message": str(e)})

def longest_common_substring(str1, str2):
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    max_len = 0
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i - 1] == str2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
                max_len = max(max_len, dp[i][j])
    return max_len

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
        user_input1 = data.get('text', '')
        user_input = user_input1.get('transcription', '')
        if not user_input:
            return jsonify({"error": "No input provided"}), 400

        response = openai_client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are friendly assitant who engages users in simple, casual conversations."},
            {
                "role": "user",
                "content": user_input
            }
        ]
        )
        
        assistant_reply = response.choices[0].message.content

        speech_file_path = Path(__file__).parent.parent / "frontend" / "public" / "speech.mp3"
        response_ai = openai_client.audio.speech.create(
            model="tts-1",
            voice="nova",
            input=assistant_reply
        )

        response_ai.stream_to_file(speech_file_path)        
        
        return jsonify({
            "response": assistant_reply,
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/response.mp3', methods=['GET'])
def get_audio():
    return app.send_static_file('response.mp3')

@app.route('/transcribe', methods=['GET'])
def transcribe():
    audio_file= open("received_data.wav", "rb")
    transcription = openai_client.audio.transcriptions.create(
        model="whisper-1", 
        file=audio_file
    )
    print(transcription.text)
    return jsonify({"transcription": transcription.text})
    
        

if __name__ == '__main__':
    app.static_folder = os.getcwd()
    socketio.run(app, debug=True, host="0.0.0.0", port=5001)