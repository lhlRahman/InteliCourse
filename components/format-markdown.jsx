import Markdown from "react-markdown";

export default function FormattedMarkdown({ message }) {
    return (
        <div className='mt-1.5 w-full'>
            <p className='font-semibold'>AI</p>
            <div className='mt-2 text-sm text-zinc-900'>
                <Markdown>{message.content}</Markdown>
            </div>
        </div>
    );
};