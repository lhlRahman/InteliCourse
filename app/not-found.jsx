"use client";
import { useEffect, useState } from "react";

export default function Component() {
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = { text: "I love Joe Biden" };

            try {
                const response = await fetch(`/api/tts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const audioUrl = await response.json();
                    setAudio(`data:audio/mpeg;base64,${audioUrl.data}`);
                } else {
                    console.error('Fetch error:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

    return (
        <p className="mt-2 text-lg md:text-2xl text-blue-600">
            Oops! You seem lost.
            {audio && <audio controls src={audio}>Your browser does not support the audio element.</audio>}
        </p>
    );
}
