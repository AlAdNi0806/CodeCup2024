import { Image, IText, Rect, Circle, Line } from "fabric";
import { useState } from "react";

const Toolbox = ({ canvas, currentFilter, setCurrentFilter, currentColor, setCurrentColor }) => {
  const [drawingMode, setDrawingMode] = useState(false);

  function toggleDrawingMode() {
    canvas.isDrawingMode = !canvas.isDrawingMode;
    setDrawingMode(canvas.isDrawingMode);
  }

  function fileHandler(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const image = await Image.fromURL(e.target.result);
      image.scale(0.5);
      canvas.add(image);
      canvas.centerObject(image);
      canvas.setActiveObject(image);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function addText() {
    const text = new IText('Edit this text');
    canvas.add(text);
    canvas.centerObject(text);
    canvas.setActiveObject(text);
  }

  function addRectangle() {
    const rect = new Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 100,
      height: 100
    });
    canvas.add(rect);
    canvas.renderAll();
  }

  function addCircle() {
    const circle = new Circle({
      left: 300,
      top: 100,
      radius: 50,
      fill: 'blue',
      stroke: 'black',
      strokeWidth: 2
    });
    canvas.add(circle);
    canvas.renderAll();
  }

  function addLine() {
    const line = new Line({
      from: { x: 100, y: 200 },
      to: { x: 300, y: 200 },
      stroke: 'green',
      strokeWidth: 2
    });
    canvas.add(line);
    canvas.renderAll();
  }

  return (
    <div className="h-16 bg-slate-800 p-2 flex flex-row gap-4">
      <button className='bg-slate-200 rounded-md flex justify-center items-center h-10 w-10'>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={fileHandler}
        />
      </button>
      {/* <button
        onClick={addText}
        className='bg-slate-200 rounded-md flex justify-center items-center h-10 w-10'
      >
        T
      </button> */}
      <button
        onClick={addRectangle}
        className='bg-slate-200 rounded-md flex justify-center items-center h-10 w-10'
      >
        R
      </button>
      <button
        onClick={addCircle}
        className='bg-slate-200 rounded-md flex justify-center items-center h-10 w-10'
      >
        C
      </button>
      <button
        onClick={addLine}
        className='bg-slate-200 rounded-md flex justify-center items-center h-10 w-10'
      >
        L
      </button>
      <button
        className='bg-slate-200 rounded-md flex justify-center items-center h-10 w-10'
        onClick={toggleDrawingMode}
      >
        D
      </button>
      <button
        title="Filters"
        onClick={() => setCurrentFilter(currentFilter ? null : 'sepia')}
        className='bg-slate-200 rounded-md flex justify-center items-center h-10 w-10'
      >
        F
      </button>
      {currentFilter &&
        <select onChange={(e) => setCurrentFilter(e.target.value)} value={currentFilter}>
          <option value="sepia">Sepia</option>
          <option value="vintage">Vintage</option>
          <option value="invert">Invert</option>
          <option value="polaroid">Polaroid</option>
          <option value="grayscale">Grayscale</option>
        </select>
      }
      <input
        type='color'
        onChange={(e) => setCurrentColor(e.target.value)}
        value={currentColor}
      />
    </div>
  );
};

export default Toolbox;
