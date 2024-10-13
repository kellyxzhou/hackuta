import whisper
import sys
from transformers import AutoProcessor, AutoModelForCTC, Wav2Vec2Processor
import librosa
import torch
from itertools import groupby
from openai import OpenAI
from dotenv import load_dotenv
import os
import pydub
from pydub import AudioSegment
from pydub.silence import split_on_silence
import io
# Get device

load_dotenv()
speechToTextModel = whisper.load_model("small")
phonemeCheckpoint = "bookbot/wav2vec2-ljspeech-gruut"
phonemeModel = AutoModelForCTC.from_pretrained(phonemeCheckpoint)
processor = AutoProcessor.from_pretrained(phonemeCheckpoint)
sr = processor.feature_extractor.sampling_rate
OpenAI.api_key = os.environ.get("OPENAI_API_KEY")
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def decode_phonemes(
    ids: torch.Tensor, processor: Wav2Vec2Processor, ignore_stress: bool = False
) -> str:
    """CTC-like decoding. First removes consecutive duplicates, then removes special tokens."""
    # removes consecutive duplicates
    ids = [id_ for id_, _ in groupby(ids)]

    special_token_ids = processor.tokenizer.all_special_ids + [
        processor.tokenizer.word_delimiter_token_id
    ]
    # converts id to token, skipping special tokens
    phonemes = [processor.decode(id_) for id_ in ids if id_ not in special_token_ids]

    # joins phonemes
    prediction = " ".join(phonemes)

    # whether to ignore IPA stress marks
    if ignore_stress == True:
        prediction = prediction.replace("ˈ", "").replace("ˌ", "")

    return prediction

def generateTranscription(data):
    trans = speechToTextModel.transcribe(data)
    print("Generated transcription: " + str(trans["text"]), file=sys.stderr)
    return trans

def phonemeDecomp(data):
    inputs = processor(data, return_tensors="pt", padding=True)
    with torch.no_grad():
        logits = phonemeModel(inputs["input_values"]).logits
    predicted_ids = torch.argmax(logits, dim=-1)
    phonemes = decode_phonemes(predicted_ids[0], processor, ignore_stress=True)
    return phonemes

if __name__ == "__main__":
    audio_file = AudioSegment.from_wav("/data/LJ001-0008.wav")
    print(audio_file.dBFS)
    chunked_audio = split_on_silence(audio_file, min_silence_len=100, silence_thresh=-25)
    print(chunked_audio)
    print("Audio File loaded")
    phonemeList = []
    wordList = []
    for i, chunk in enumerate(chunked_audio):
        buffer = io.BytesIO()
        chunk.export(buffer, format="wav")
        #data, sr = sf.read(buffer)
        phonemes = phonemeDecomp(chunk.get_array_of_samples())
        transcription = generateTranscription(chunk.get_array_of_samples())
        phonemeList.append(phonemes)
        wordList.append(transcription)
    print(phonemeList)
    print(wordList)
    """response = client.audio.speech.create(
        model="tts-1",
        voice="alloy",
        input=transcription['text']
    )
    response.stream_to_file("tmp.wav")
    syn_array, _ = librosa.load("tmp.wav", sr=22050)
    
    genPhonemes = phonemeDecomp(syn_array)
    print(genPhonemes)
    """
    #print(transcription)
    