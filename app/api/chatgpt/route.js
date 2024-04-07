import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.GPT
});

export const runtime = 'edge';

// Function to prepend the course summary as a system message
function addCourseSummaryToMessages(originalMessages, courseSummary) {
    const courseSummaryMessage = {
        role: 'system',
        content: courseSummary
    };
    // Ensure the course summary is the first message
    return [courseSummaryMessage, ...originalMessages];
}

export async function POST(req) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return new NextResponse('Missing OpenAI API key.', { status: 400 });
        }
        let { messages, body } = await req.json();
        console.log(body)

        // Add the course summary to the conversation if provided
            messages = addCourseSummaryToMessages(messages, 'The video discusses the importance and impact of the magnetic field in everyday life. It illustrates the various functions it plays and how it influences daily activities. The video also presents different examples of the magnetic fields application, such as its use in industries like network services and software. Additionally, the video shows how understanding the magnetic field can lead to advancements in technology, for instance, the development of more powerful equipment or strategies. Finally, the emphasis on the notion of collective learning suggests a need for shared knowledge and cooperation to further explore this concept.');

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            stream: true,
            messages,
        });

        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error(error);
        return new NextResponse('Something went wrong.', { status: 500 });
    }
};
