import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE);

export const runtime = 'edge';

const buildGoogleGenAIPrompt = (messages: Message[]) => ({
    contents: messages
        .filter(message => message.role === 'user' || message.role === 'assistant')
        .map(message => ({
            role: (message.role === 'user' ? 'user' : 'model') as 'user' | 'model',
            parts: [{ text: message.content }],
        })),
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const geminiStream = await genAI
            .getGenerativeModel({ model: 'gemini-pro' })
            .generateContentStream(buildGoogleGenAIPrompt(messages));
        const stream = GoogleGenerativeAIStream(geminiStream);
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error(error);
        return new NextResponse('Something went wrong.', { status: 500 });
    }
};