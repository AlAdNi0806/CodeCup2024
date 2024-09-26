import React, { useEffect, useRef, useState } from 'react';
import useEditor from '../../hooks/useEditor';
import { set, z } from 'zod';
import Toolbox from './_components/Toolbox';
import EditorCanvas from './_components/EditorCanvas';


import { ActiveSelection, Canvas, filters, PencilBrush } from 'fabric';
import Color from '../settings/Color';
import Text from '../settings/Text';
import StrokeWidth from '../settings/StrokeWidth';

const type = "CanvasState";

const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
})

export const CanvasStateElement = {
    type,

    designerComponent: DesignerComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
}

function PropertiesComponent(props) {

    const { canvas, setCanvas, currentFilter, setCurrentFilter, currentColor, setCurrentColor, strokeWidth, setStrokeWidth, fontSize, setFontSize, fontWeight, setFontWeight, fontFamily, setFontFamily } = useEditor()

    return (
        <div>
            <Color
                onChange={setCurrentColor}
                value={currentColor}
                placeholder={'color'}
            />
            <Text
                setFontSize={setFontSize}
                fontSize={fontSize}
                setFontWeight={setFontWeight}
                fontWeight={fontWeight}
                setFontFamily={setFontFamily}
                fontFamily={fontFamily}
                placeholder={'text'}
            />
            <StrokeWidth
                placeholder={'strokeWidth'}
                setStrokeWidth={setStrokeWidth}
                strokeWidth={strokeWidth}
            />
        </div>
    );
}

function DesignerComponent({ editorId }) {

    const parentRef = useRef(null)
    const [canvasHeight, setCanvasHeight] = useState(null)
    const [canvasWidth, setCanvasWidth] = useState(null)

    const canvasRef = useRef(null);
    // const [canvas, setCanvas] = useState(null);


    // const [currentFilter, setCurrentFilter] = useState(null);
    // const [currentColor, setCurrentColor] = useState('fff');

    const { imageRef, imageSrc, currentState, canvas, setCanvas, currentFilter, setCurrentFilter, currentColor, setCurrentColor, fontSize, setFontSize, fontWeight, setFontWeight, fontFamily, setFontFamily, strokeWidth, setStrokeWidth, adjustState } = useEditor()



    useEffect(() => {
        const canvasElement = document.getElementById("canvas", {
            interactive: false,
        });

        const canvas = new Canvas(canvasRef.current, { backgroundColor: 'transparent' });
        canvas.setDimensions({
            width: canvasElement?.clientWidth,
            height: canvasElement?.clientHeight,
        });
        setCanvas(canvas);

        const brush = new PencilBrush(canvas);
        brush.color = 'black';
        brush.width = 5;
        canvas.freeDrawingBrush = brush;

        // canvas.selectionBorderColor = '#ff0000';
        // canvas.selectionBorderWidth = 2;

        return () => canvas.dispose();

    }, [canvasRef, setCanvas]);

    useEffect(() => {
        if (!canvas ||
            !canvas.getActiveObject() ||
            !canvas.getActiveObject().isType('image')) return;

        function getSelectedFilter() {
            switch (currentFilter) {
                case 'sepia':
                    return new filters.Sepia();
                case 'vintage':
                    return new filters.Vintage();
                case 'invert':
                    return new filters.Invert();
                case 'polaroid':
                    return new filters.Polaroid();
                case 'grayscale':
                    return new filters.Grayscale();
                default:
                    return null;
            }
        }
        const filter = getSelectedFilter();
        const img = canvas.getActiveObject();

        img.filters = filter ? [filter] : [];
        img.applyFilters();
        canvas.renderAll();
    }, [currentFilter, canvas]);

    useEffect(() => {
        console.log('currentShape', canvas?.getActiveObject()?.type);
        // if (!canvas ||
        //     !canvas.getActiveObject() ||
        //     !canvas.getActiveObject().isType('rect')) return;
        if (!canvas ||
            !canvas.getActiveObject()) return;

        const activeObject = canvas.getActiveObject();
        // activeObject.set('fill', currentColor);

        const isRectangle = activeObject && activeObject.isType('rect');
        const isCircle = activeObject && activeObject.isType('circle');
        const isIText = activeObject && activeObject.isType('i-text');
        const isLine = activeObject && activeObject.isType('line');

        if (isRectangle) {
            activeObject.set('fill', currentColor);
            canvas.renderAll();
        } else if (isCircle) {
            activeObject.set('fill', currentColor);
            canvas.renderAll();
        } else if (isIText) {
            activeObject.set('fill', currentColor);
            canvas.renderAll();
        } else if (isLine) {
            activeObject.set('stroke', currentColor);
            canvas.renderAll();
        }


    }, [currentColor, canvas]);

    useEffect(() => {
        if (!canvas ||
            !canvas.getActiveObject()) return;

        const activeObject = canvas.getActiveObject();

        const isIText = activeObject && activeObject.isType('i-text');

        if (isIText) {
            activeObject.set('fontSize', fontSize);
            canvas.renderAll();
        }

    }, [fontSize, canvas]);

    useEffect(() => {
        if (!canvas ||
            !canvas.getActiveObject()) return;

        const activeObject = canvas.getActiveObject();

        const isIText = activeObject && activeObject.isType('i-text');

        if (isIText) {
            activeObject.set('fontWeight', fontWeight);
            canvas.renderAll();
        }

    }, [fontWeight, canvas]);

    useEffect(() => {
        if (!canvas ||
            !canvas.getActiveObject()) return;

        const activeObject = canvas.getActiveObject();

        const isIText = activeObject && activeObject.isType('i-text');

        if (isIText) {
            activeObject.set('fontFamily', fontFamily);
            canvas.renderAll();
        }

    }, [fontFamily, canvas]);

    useEffect(() => {
        if (!canvas ||
            !canvas.getActiveObject()) return;

        if (strokeWidth === null || strokeWidth === 0 || strokeWidth === '' || strokeWidth === undefined) return;

        console.log('strokeWidth', strokeWidth)

        const activeObject = canvas.getActiveObject();

        const isLine = activeObject && activeObject.isType('line');

        if (isLine) {
            activeObject.set('strokeWidth', parseInt(strokeWidth));
            canvas.renderAll();
        }

    }, [strokeWidth, canvas]);



    useEffect(() => {
        if (!canvas) return;

        function handleSelection(e) {
            const obj = e.selected?.length === 1 ? e.selected[0] : null;
            const filter = obj?.filters?.at(0);
            const fill = obj?.fill;
            const stroke = obj?.stroke;
            console.log('fill', fill);
            setCurrentFilter(filter ? filter.type.toLowerCase() : null);
            setFontSize(obj?.fontSize);
            setFontWeight(obj?.fontWeight);
            setFontFamily(obj?.fontFamily);
            setStrokeWidth(obj?.strokeWidth);
            if (obj?.isType('line')) {
                setCurrentColor(stroke);
            } else {
                setCurrentColor(fill);
            }
        }

        canvas.on({
            'selection:created': handleSelection,
            'selection:updated': handleSelection,
            'selection:cleared': handleSelection
        });

        return () => {
            canvas.off({
                'selection:created': handleSelection,
                'selection:updated': handleSelection,
                'selection:cleared': handleSelection
            });
        }

    }, [canvas, setCurrentFilter]);

    useEffect(() => {
        if (canvas) {
            const handleObjectEvents = () => {
                canvas.on({
                    'object:created': (options) => {
                        console.log('Object created:', options.target);
                        saveToState()
                    },
                    'object:moved': (options) => {
                        console.log('Object moved:', options.target);
                        saveToState()
                    },
                    'object:modified': (options) => {
                        console.log('Object modified:', options.target);
                        saveToState()
                    },
                    'object:removed': (options) => {
                        console.log('Object removed:', options.target);
                        saveToState()
                    },
                    // 'object:scaling': (options) => {
                    //     console.log('Object scaled:', options.target);
                    //     saveToState()
                    // },
                    // 'object:rotating': (options) => {
                    //     console.log('Object rotated:', options.target);
                    //     saveToState()
                    // },
                    // 'object:resized': (options) => {
                    //     console.log('Object resized:', options.target);
                    //     saveToState()
                    // }
                });
            };

            function saveToState() {
                const savedObjects = canvas.getObjects().map(obj => {
                    const objCopy = Object.assign({}, obj);
                    delete objCopy.id; // Remove the internal ID
                    return objCopy;
                });

                // Convert the array to a JSON string
                const jsonString = JSON.stringify(savedObjects);

                // Parse the JSON string
                const loadedObjects = JSON.parse(jsonString);

                // canvas.clear();

                // // Load the objects
                // canvas.loadFromJSON(loadedObjects, () => {
                //     canvas.renderAll();
                // });
            }

            handleObjectEvents();

            return () => {
                canvas.off('object:*');
            };
        }
    }, [canvas]);


    // const imageRef = useRef(null)

    function getImageDimensions(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;

            img.onload = () => {
                resolve({
                    width: img.naturalWidth,
                    height: img.naturalHeight
                });
            };

            img.onerror = () => {
                reject(new Error(`Failed to load image: ${url}`));
            };
        });
    }

    const [widthSet, setWidthSet] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            console.log('imageRef', imageRef)
            if (imageRef.current) {
                setCanvasHeight(imageRef.current?.clientHeight)
                setCanvasWidth(imageRef.current?.clientWidth)
                setWidthSet(true)
            }

            setTimeout(() => {
                console.log('imageRef=--f---s--set', widthSet)
            }, 1000)
        }, 500)
    }, [imageRef.current?.clientHeight])





    const [brightness, setBrightness] = useState(adjustState.brightness)
    const [saturation, setSaturation] = useState(adjustState.saturation)
    const [inversion, setInversion] = useState(adjustState.inversion)
    const [grayscale, setGrayscale] = useState(adjustState.grayscale)
    const [blueAmmount, setBlueAmmount] = useState(adjustState.blueAmmount)

    useEffect(() => {
        setBrightness(adjustState.brightness)
        setSaturation(adjustState.saturation)
        setInversion(adjustState.inversion)
        setGrayscale(adjustState.grayscale)
        setBlueAmmount(adjustState.blueAmmount)
    }, [adjustState])

    useEffect(() => {
        setBrightness(currentState['ADJUST'].brightness)
        setSaturation(currentState['ADJUST'].saturation)
        setInversion(currentState['ADJUST'].inversion)
        setGrayscale(currentState['ADJUST'].grayscale)
        setBlueAmmount(currentState['ADJUST'].blueAmmount)
    }, [currentState]);





    return (
        <>
            <div
                id="canvas"
                className='w-full h-full relative flex items-center justify-center'
                ref={parentRef}
            // style={{ maxWidth: canvasWidth, maxHeight: canvasHeight }}
            >
                <div className=' flex items-center justify-center h-full w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
                    <img
                        ref={imageRef}
                        src={imageSrc}
                        alt='random'
                        // className='absolute top-0 left-0'
                        style={{
                            maxHeight: "70vh",
                            filter: `hue-rotate(${blueAmmount}deg) brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) ${currentState['FILTER'].state === 'NONE' ? '' : currentState['FILTER'].state === 'SEPIA' ? 'sepia(100%)' : currentState['FILTER'].state === 'GRAY' ? 'grayscale(100%)' : currentState['FILTER'].state === 'VINTAGE' ? 'vintage(100%)' : ''}`,
                            transform: `rotate(${currentState['ROTATE_FLIP'].rotate}deg) scale(${currentState['ROTATE_FLIP'].flipHorizontal}, ${currentState['ROTATE_FLIP'].flipVertical})`
                        }}
                    />
                </div>
                {/* <div className="w-full h-full">
                </div> */}

                {/* <EditorCanvas
                    ref={canvasRef}
                    canvas={canvas}
                /> */}
                <canvas
                    ref={canvasRef}
                    // width={canvasWidth}
                    // height={canvasHeight}
                    // style={{ maxWidth: canvasWidth, maxHeight: canvasHeight }}
                    className='border border-zinc-700 rounded-md w-full h-full '
                />
                <div
                    style={{ maxWidth: canvasWidth, maxHeight: canvasHeight }}
                    className=' pointer-events-none h-full w-full  bg-transparent  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[0_0_0_99999px_rgba(229,231,235,.9)]'>

                </div>

            </div>
            {/* <Toolbox
                canvas={canvas}
                currentFilter={currentFilter}
                setCurrentFilter={setCurrentFilter}
                currentColor={currentColor}
                setCurrentColor={setCurrentColor}
                fontSize={fontSize}
                setFontSize={setFontSize}
            /> */}
        </>
    )
};
