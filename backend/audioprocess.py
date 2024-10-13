import whisper
import sys
from transformers import AutoProcessor, AutoModelForCTC, Wav2Vec2Processor
import librosa
import torch
from itertools import groupby

speechToTextModel = whisper.load_model("small")
phonemeCheckpoint = "bookbot/wav2vec2-ljspeech-gruut"
phonemeModel = AutoModelForCTC.from_pretrained(phonemeCheckpoint)
processor = AutoProcessor.from_pretrained(phonemeCheckpoint)
sr = processor.feature_extractor.sampling_rate

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
    audio_array, _ = librosa.load("/data/LJ001-0009.wav", sr=22050)
    print("Audio File loaded")
    phonemes = phonemeDecomp(audio_array)
    transcription = generateTranscription(audio_array)
    print(phonemes)
    print(transcription)