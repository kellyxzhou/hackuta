![Logo (3)](https://github.com/user-attachments/assets/4e0d0bf6-9afd-4f0a-b3d9-d58ae9353ceb)

## Inspiration
We noticed that many non-native English speakers struggle with pronunciation, often feeling self-conscious about their ability to communicate clearly. This challenge can lead to misunderstandings and frustration in conversations, hindering their confidence and willingness to engage in English-speaking environments. Additionally, suppose you're not from the US. In that case, you often lack access to English teachers who can provide personalized feedback on your pronunciation, and traditional English tutors can be expensive, inconsistent, and not always available when needed. Fluently addresses these challenges by offering an accessible, cost-effective solution that leverages advanced technology to help users improve their pronunciation.

## What it does
Fluently uses an ML hugging face model to convert speech directly to a list of phenomes. Phenomes are perceptually distinct sound units that distinguish one word from another. The speech is also converted to text using OpenAI's Whisper, which passes that text to OpenAI's text-to-speech, which passes that audio file to the hugging face model to generate the correct phenomes list. Finally, we compare the two phenome lists to determine which words the user pronounces incorrectly.

## How we built it
We used Nextjs, Flask, Google Cloud Provider, PropelAuth, Whisper, and a hugging face model named wav2vec2-ljspeech-gruut.
