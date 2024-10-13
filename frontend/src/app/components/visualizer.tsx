"use client";

import * as React from 'react';
import { useState } from 'react';
import { AudioVisualizer, LiveAudioVisualizer } from 'react-audio-visualize';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

const Visualizer: React.FC = () => {
    const [blob, setBlob] = useState<Blob>();
    const recorder = useAudioRecorder();

    return (
        <div>
            <AudioRecorder
                onRecordingComplete={setBlob}
                recorderControls={recorder}
            />

            {recorder.mediaRecorder && (
                <LiveAudioVisualizer
                    mediaRecorder={recorder.mediaRecorder}
                    width={200}
                    height={75}
                />
            )}

        </div>
    );
};

export default Visualizer;
