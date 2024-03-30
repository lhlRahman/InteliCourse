import { NextResponse } from "next/server";

export async function POST(req) {
    if (req.method === "POST") {
        try {
            const { text } = await req.json();
            const response = await fetch(`https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyDaR-UMlk1OiYgM3TmsLcZSrA6s6rEMtGA`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    audioConfig: {
                        audioEncoding: "MP3",
                        effectsProfileId: ["small-bluetooth-speaker-class-device"],
                        pitch: 0,
                        speakingRate: 1
                    },
                    input: { text },
                    voice: {
                        languageCode: "en-US",
                        name: "en-US-Studio-Q"
                    }
                }),
            });

            if (response.ok) {
                const json = await response.json();
                return NextResponse.json({ status: 201, data: json.audioContent });
            } else {
                console.error('Error from Google Text-to-Speech API:', await response.text());
                return NextResponse.json({ status: 500, message: "Internal server error" });
            }
        } catch (error) {
            console.error('Error:', error);
            return NextResponse.json({ status: 500, message: "Internal server error" });
        }
    } else {
        return NextResponse.json({ status: 405, message: "Method not allowed" });
    }
}
