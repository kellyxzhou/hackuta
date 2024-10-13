// components/Visualizer.tsx

"use client"; // Mark this as a client component

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

            {/* {blob && (
                <>
                    <AudioVisualizer
                        blob={blob}
                        width={500}
                        height={75}
                        barWidth={1}
                        gap={0}
                        barColor={'#f76565'}
                    />
                    <AudioVisualizer
                        blob={blob}
                        width={500}
                        height={75}
                        barWidth={3}
                        gap={2}
                        barColor={'lightblue'}
                    />
                </>
            )} */}
        </div>
    );
};

export default Visualizer;
