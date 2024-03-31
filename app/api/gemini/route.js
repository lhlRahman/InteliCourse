import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI('AIzaSyAOLtyxLn72u0jb9LMMF7kaQiixvuA1Qxs');

export const runtime = 'edge';

const buildGoogleGenAIPrompt = (messages) => ({
    contents: messages
        .filter(message => message.role === 'user' || message.role === 'assistant')
        .map(message => ({
            role: message.role === 'user' ? 'user' : 'model',
            parts: [{ text: message.content }],
        })),
});

export async function POST(req) {
    try {
        const { messages } = await req.json();
        console.log(messages);
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