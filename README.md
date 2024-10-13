![Logo (3)](https://github.com/user-attachments/assets/58765acb-83a2-4647-b659-e2be85df0ef4)

## Inspiration
We noticed that many non-native English speakers struggle with pronunciation, often feeling self-conscious about their ability to communicate clearly. This challenge can lead to misunderstandings and frustration in conversations, hindering their confidence and willingness to engage in English-speaking environments. Additionally, suppose you're not from the US. In that case, you often lack access to English teachers who can provide personalized feedback on your pronunciation, and traditional English tutors can be expensive, inconsistent, and not always available when needed. Fluently addresses these challenges by offering an accessible, cost-effective solution that leverages advanced technology to help users improve their pronunciation.

## What it does
Fluently uses an ML hugging face model to convert speech directly to a list of phenomes. Phenomes are perceptually distinct sound units that distinguish one word from another. The speech is also converted to text using OpenAI's Whisper, which passes that text to OpenAI's text-to-speech, which passes that audio file to the hugging face model to generate the correct phenomes list. Finally, we compare the two phenome lists to determine which words the user pronounces incorrectly.

## How we built it
We used Nextjs, Flask, Google Cloud Provider, PropelAuth, Whisper, and a hugging face model named wav2vec2-ljspeech-gruut.

## Challenges we ran into
One of the most significant challenges we encountered was devising a method to compare the user's pronunciation with the correct pronunciation. Since users could say anything during their interactions with the AI, it was challenging to establish a definitive "correct" pronunciation to compare against. This required us to develop an innovative approach to handle diverse speech inputs effectively.

## Accomplishments that we're proud of
We're super proud of our ML pipeline and that each team member could work on something they've never done before.

## What we learned
Throughout the development process, we gained valuable insights into using WebSockets for real-time communication, enhancing the interactivity of our application. Additionally, we learned about the intricacies of machine learning model integration and the importance of efficient data processing in delivering a seamless user experience.

## What's next for Fluently
Looking ahead, we plan to enhance Fluently by expanding its language support, refining our phoneme comparison algorithms, and incorporating user feedback to improve the overall experience. We also aim to integrate additional features, such as personalized learning paths and progress tracking, further to empower users on their journey to mastering English pronunciation.
