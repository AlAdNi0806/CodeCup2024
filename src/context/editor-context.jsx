import { createContext, useRef, useState } from "react";
import { set } from "zod";

export const EditorContext = createContext(null)

export default function EditorContextProvider({ children }) {

    const [previousStates, setPreviousStates] = useState([])
    const [currentState, setCurrentState] = useState({
        'CROP': {
            title: 'Crop'
        },
        'RESIZE': {
            title: 'Resize'
        },
        'ADJUST': {
            title: 'Adjust',
            brightness: 100,
            saturation: 100,
            inversion: 0,
            grayscale: 0,
        },
        'ROTATE_FLIP': {
            title: 'Rotate and flip',
            rotate: 0,
            flipHorizontal: 1,
            flipVertical: 1
        },
        'FILTER': {
            title: 'Filter',
            state: 'NONE'
        },
        'CANVAS': {
            title: 'Canvas',
            objects: []
        },
    })
    const [nextStates, setNextStates] = useState([])

    const [originalImageSrc, setOriginalImageSrc] = useState(null)
    const [imageSrc, setImageSrc] = useState(null)

    const [editorState, setEditorState] = useState('CROP')
    const [activeCanvasElement, setActiveCanvasElement] = useState('rectangle')

    const activeObjectRef = useRef(null)
    const fabricRef = useRef(null)
    const canvasRef = useRef(null)

    const [elementAttributes, setElementAttributes] = useState({
        width: '',
        height: '',
        fill: '',
        fontFamily: '',
        fontSize: '',
        fontWeight: '',
        stroke: '',
    })

    const [canvas, setCanvas] = useState(null)

    const [canvasObjects, setCanvasObjects] = useState({});

    const [adjustState, setAdjustState] = useState({
        brightness: 100,
        saturation: 100,
        inversion: 0,
        grayscale: 0,
    })


    const MAX_HISTORY_LENGTH = 20;

    const addNewState = (newState) => {
        // Add the new state to the beginning of the previousStates array
        setPreviousStates(prev => [...prev, currentState]);

        // Limit the length of previousStates to 20
        setPreviousStates(prev => prev.slice(-20));

        // Reset nextStates
        setNextStates([]);

        // Update the currentState
        setCurrentState(newState);
    };

    // Function to go back in history
    const goToBack = () => {
        if (previousStates.length > 0) {
            const newState = previousStates[previousStates.length - 1];
            setCurrentState(newState);
            setPreviousStates(prev => prev.slice(0, -1));
            setNextStates([currentState, ...nextStates]);

            // Log states after changes
            console.log('CURRENT STATE:', currentState);
            console.log('PREVIOUS STATES:', previousStates);
            console.log('NEXT STATES:', nextStates);
        }
    };

    // Function to go forward in history
    const goToForward = () => {
        if (nextStates.length > 0) {
            const newState = nextStates[0];
            setCurrentState(newState);
            setPreviousStates([...previousStates, currentState]);
            setNextStates(nextStates.slice(1));

            // Log states after changes
            console.log('CURRENT STATE:', currentState);
            console.log('PREVIOUS STATES:', previousStates);
            console.log('NEXT STATES:', nextStates);
        }
    };


    const [currentFilter, setCurrentFilter] = useState(null);
    const [currentColor, setCurrentColor] = useState('fff');
    const [fontSize, setFontSize] = useState(14);
    const [fontWeight, setFontWeight] = useState(400);
    const [fontFamily, setFontFamily] = useState('Helvetica');

    const imageRef = useRef(null)

    return (
        <EditorContext.Provider value={{

            imageRef,

            currentFilter,
            setCurrentFilter,
            currentColor,
            setCurrentColor,
            canvas,
            setCanvas,
            fontSize,
            setFontSize,
            fontWeight,
            setFontWeight,
            fontFamily,
            setFontFamily,


            addNewState,
            goToBack,
            goToForward,

            adjustState,
            setAdjustState,


            canvasObjects,
            setCanvasObjects,


            previousStates,
            setPreviousStates,

            currentState,
            setCurrentState,

            nextStates,
            setNextStates,

            originalImageSrc,
            setOriginalImageSrc,

            imageSrc,
            setImageSrc,

            editorState,
            setEditorState,

            activeCanvasElement,
            setActiveCanvasElement,

            activeObjectRef,
            fabricRef,
            canvasRef,

            elementAttributes,
            setElementAttributes,
        }}>
            {children}
        </EditorContext.Provider>
    )
}