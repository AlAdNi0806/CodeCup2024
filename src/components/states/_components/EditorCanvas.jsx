import { forwardRef } from 'react';

const EditorCanvas = forwardRef(({ canvas, setCurrentFilter }, ref) => {
    return (
        <canvas
            ref={ref}
            className='border border-zinc-700 rounded-md w-full h-full'
        ></canvas>
    );
});

export default EditorCanvas;