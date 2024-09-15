import { useState, useEffect } from 'react';

const useCanvasInteraction = (canvasElement) => {
    const [ctx, setCtx] = useState(null);
    const [squares, setSquares] = useState([]);

    useEffect(() => {
        if (canvasElement && canvasElement.getContext) {
            const canvas = canvasElement;
            const ctx = canvas.getContext('2d');

            // Set the canvas size
            canvas.width = 800;
            canvas.height = 600;

            // Function to draw squares
            function drawSquares() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                squares.forEach((square, index) => {
                    ctx.fillStyle = `hsl(${index * 60}, 100%, 50%)`;
                    ctx.fillRect(square.x, square.y, square.size, square.size);
                });
            }

            // Event listener for mouse clicks
            function handleCanvasClick(e) {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate square size based on click position
                const size = Math.min(canvas.width / 10, canvas.height / 10);

                // Add new square to the array
                setSquares(prevSquares => [
                    ...prevSquares,
                    {
                        x: x - size / 2,
                        y: y - size / 2,
                        size: size
                    }
                ]);

                // Redraw the canvas
                drawSquares();
            }

            // Add event listener to the canvas
            canvas.addEventListener('click', handleCanvasClick);

            // Cleanup function
            return () => {
                canvas.removeEventListener('click', handleCanvasClick);
            };

            setCtx(ctx);
        }
    }, [squares]);

    return { ctx, squares };
}

export default useCanvasInteraction;