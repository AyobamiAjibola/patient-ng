import dynamic from 'next/dynamic';
import { useMemo, useRef } from 'react';
import './style.css';

const Jodit = dynamic(() => import('jodit-react'), { ssr: false });

export default function MyEditor({ content, setContent }: any) {
    const editor = useRef(null);

    const config = useMemo(() => ({
        readonly: false,
        height: 400,
        placeholder: 'Start typing...',
        uploader: {
            insertImageAsBase64URI: true 
        }
    }), []);

    return (
        <Jodit
            ref={editor}
            value={content}
            onChange={(newContent: any) => {}}
            config={config}
            onBlur={(newContent: any) => setContent(newContent)}
        />
    )
}
