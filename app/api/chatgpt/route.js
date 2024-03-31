import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.GPT
});

export const runtime = 'edge';

export async function POST(req) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return new NextResponse('Missing Openai API key.', { status: 400 });
        }
        const { messages } = await req.json();
        const response = await ({
            model: 'gpt-3.5-turbo-0125',
            stream: true,
            messages,
        });
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (error) {
        return new NextResponse('Something went wrong.', { status: 500 });
    }
};