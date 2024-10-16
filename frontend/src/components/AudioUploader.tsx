"use client";

import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import Recorder from "recorder-js";
import * as React from "react";
import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";

let socket: Socket;

interface AudioUploaderProps {
    sendTranscriptionData: (data: any) => void;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ sendTranscriptionData }) => {
    const [recording, setRecording] = useState<boolean>(false);
    const [recorder, setRecorder] = useState<Recorder | null>(null);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [blob, setBlob] = useState<Blob>();
    const recorders = useAudioRecorder();

    useEffect(() => {
        // Initialize WebSocket connection
        socket = io("http://localhost:5001"); // Point to Flask server

        socket.on("connect", () => {
            console.log("Connected to Flask WebSocket server");
        });

        socket.on("response", (data: { message: string }) => {
            console.log(data.message); // Log response from server
            axios
                .get("http://localhost:5001/transcribe")
                .then((response) => {
                    console.log(response.data); // Access the data in the response
                    sendTranscriptionData(response.data); // Send data to parent
                })
                .catch((error) => {
                    console.error("Error fetching data:", error); // Handle errors
                });
            
        });

        socket.on("error", (error: { message: string }) => {
            console.error(error.message);
        });

        return () => {
            if (socket) socket.disconnect();
        };
    }, []);

    const startRecording = async (): Promise<void> => {
        try {
            const audioContext = new (window.AudioContext ||
                window.AudioContext)();
            setAudioContext(audioContext);

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            setMediaStream(stream); // Save the media stream in state

            const recorder = new Recorder(audioContext);
            await recorder.init(stream);
            recorder.start();

            setRecorder(recorder);
            setRecording(true);
        } catch (error) {
            console.error("Error accessing audio devices:", error);
        }
    };

    const stopRecording = async (): Promise<void> => {
        if (recorder && audioContext) {
            try {
                const { blob } = await recorder.stop();

                // Send the WAV blob to the server
                sendAudioToServer(blob);

                // Stop the media stream to release the microphone
                if (mediaStream) {
                    mediaStream.getTracks().forEach((track) => track.stop());
                    setMediaStream(null); // Clear the media stream from state
                }

                // Clean up
                audioContext.close();
                setRecorder(null);
                setAudioContext(null);
                setRecording(false);
            } catch (error) {
                console.error("Error stopping the recorder:", error);
            }
        }
    };

    const sendAudioToServer = (audioBlob: Blob): void => {
        socket.emit("audio_data", audioBlob);
    };

    return (
        <div onClick={recording ? stopRecording : startRecording}>
            <AudioRecorder
                onRecordingComplete={setBlob}
                recorderControls={recorders}
            />

            {recorders.mediaRecorder && (
                <LiveAudioVisualizer
                    mediaRecorder={recorders.mediaRecorder}
                    width={300}
                    height={75}
                    barWidth={1}
                    gap={5}
                    barColor="#E94057"
                />
            )}
        </div>
    );
};

export default AudioUploader;
