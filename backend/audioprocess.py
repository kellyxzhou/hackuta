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
    phonemes = [processor.decode(id_)
                for id_ in ids if id_ not in special_token_ids]

    # joins phonemes
    prediction = " ".join(phonemes)

    # whether to ignore IPA stress marks
    if ignore_stress == True:
        prediction = prediction.replace("ˈ", "").replace("ˌ", "")

    return prediction


def generateTranscription(data):
    trans = speechToTextModel.transcribe(data)
    print("Generated transcription: " + str(trans["text"]), file=sys.stderr)
    return [word for word in trans["text"].split(' ') if word != '']


def phonemeDecomp(data):
    inputs = processor(data, return_tensors="pt", padding=True)
    with torch.no_grad():
        logits = phonemeModel(inputs["input_values"]).logits
    predicted_ids = torch.argmax(logits, dim=-1)
    phonemes = decode_phonemes(predicted_ids[0], processor, ignore_stress=True)
    return phonemes


def buildSynPhonemes(transcript, intermediatePath="tmp.wav"):
    phonemeList = []
    for word in transcript:
        print("Processing " + word)
        response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=word
        )
        response.stream_to_file("tmp.wav")
        synArray, _ = librosa.load("tmp.wav", sr=22050)
        synPhonemes = phonemeDecomp(synArray)
        phonemeList.append(synPhonemes)
    print(phonemeList)
    return phonemeList

<<<<<<< HEAD
=======
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
>>>>>>> a3f82e000de4e17529dc14b7365bb9d489c2b15d

if __name__ == "__main__":
    data, _ = librosa.load("received_data.wav", sr=22050)
    phonemes = phonemeDecomp(data)
    transcript = generateTranscription(data)
    print(transcript)
    synPhonemes = buildSynPhonemes(transcript)
    print(phonemes)
    print(transcript)
    print(synPhonemes)

    longest_common_substrings = []
    for syn_phoneme in synPhonemes:
        max_len = len(max(''.join(syn_phoneme).replace(' ', ''), ''.join(phonemes).replace(' ', ''), key=len))
        if (max_len > len((''.join(syn_phoneme).replace(' ', '')))-2):
            longest_common_substrings.append(2)
        elif (max_len > len((''.join(syn_phoneme).replace(' ', '')))-4):
            longest_common_substrings.append(1)
        else:
            longest_common_substrings.append(0)
    print(longest_common_substrings)