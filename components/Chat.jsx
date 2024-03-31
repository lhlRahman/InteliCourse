"use client";

import { useChat } from "ai/react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { SendHorizonalIcon } from "lucide-react";
import { ScrollArea } from "../components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { useEffect, useState } from "react";
import FormattedMarkdown from "./format-markdown";

export default function Chat({prompt}) {
    const [model, setModal] = useState('');

    

    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
        api: model,
        body: {
            prompt: prompt,
        },
    });
    
          return (
        <section className="text-zinc-700 flex pt-36">
            <div className=" max-w-sm justify-end flex-col text-wrap">
                {
                    error && (
                        <div className="text-sm text-red-500 text-center p-2">{error.message}</div>
                    )
                }
                <ScrollArea className="mb-2 h-[400px] rounded-md border-2 p-4 border-slate-700">
                    {messages.map(m => (
                        <div key={m.id} className="flex flex-col">
                            <div className='m-1 whitespace-pre-wrap'>
                                {m.role === 'user' && (
                                    <div className='mb-6 flex gap-3 justify-end'>
                                        <div className='mt-1.5'>
                                            <p className='font-semibold text-right'>You</p>
                                            <div className='mt-1.5 text-sm text-zinc-900'>
                                                {m.content}
                                            </div>
                                        </div>
                                        <Avatar>
                                            <AvatarImage src='' />
                                            <AvatarFallback className='text-white bg-slate-500'>U</AvatarFallback>
                                        </Avatar>
                                    </div>
                                )}
                                {m.role === 'assistant' && (
                                    <div className='mb-6 flex gap-3 justify-end'>
                                        <Avatar>
                                            <AvatarImage src='' />
                                            <AvatarFallback className='bg-emerald-500 text-white'>
                                                AI
                                            </AvatarFallback>
                                        </Avatar>
                                        <FormattedMarkdown message={m}></FormattedMarkdown>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </ScrollArea>
                <form onSubmit={handleSubmit} className="relative">
                    <div className="flex">
                        <Select onValueChange={(value) => setModal(value)} required>
                            <SelectTrigger className="w-[180px] mr-2 border-2 border-slate-700">
                                <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Models</SelectLabel>
                                    <SelectItem value="/api/chatgpt">Openai GPT-3.5</SelectItem>
                                    <SelectItem value="/api/gemini">Google Gemini</SelectItem>
                                    <SelectItem value="/api/cohere">Cohere</SelectItem>
                                    <SelectItem value="/api/huggingface">Open Assistant(HF)</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Input
                            required
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Ask me something..."
                            className="placeholder:italic placeholder:text-zinc-600 border-2 border-slate-700"
                        ></Input>
                        <Button
                            size={"icon"}
                            type="submit"
                            variant={"secondary"}
                            disabled={isLoading}
                            className="absolute right-1 top-1 h-8 w-10"
                        >
                            <SendHorizonalIcon className="h-4 w-4 text-emerald-500"></SendHorizonalIcon>
                        </Button>
                    </div>
                </form>
            </div>
        </section >
    );
};