
import { z } from 'zod'

import React, { useEffect, useRef, useState } from 'react'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import useEditor from '../../hooks/useEditor';
import setCanvasPreview from '../../utils/setCanvasPreview';
import SliderComponent from '../Slider';




const type = "AdjustState";

const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
})

export const AdjustStateElement = {
    type,

    designerComponent: DesignerComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
}


function PropertiesComponent({

}) {

    const { currentState, setCurrentState, addNewState, setAdjustState } = useEditor()

    const [brightness, setBrightness] = useState(currentState['ADJUST'].brightness)
    const [saturation, setSaturation] = useState(currentState['ADJUST'].saturation)
    const [inversion, setInversion] = useState(currentState['ADJUST'].inversion)
    const [grayscale, setGrayscale] = useState(currentState['ADJUST'].grayscale)

    useEffect(() => {
        onChange()
    }, [brightness, saturation, inversion, grayscale])

    useEffect(() => {
        setBrightness(currentState['ADJUST'].brightness)
        setSaturation(currentState['ADJUST'].saturation)
        setInversion(currentState['ADJUST'].inversion)
        setGrayscale(currentState['ADJUST'].grayscale)
    }, [currentState]);

    const onMouseUp = () => {
        console.log('MOUSE UP')
        addNewState({
            ...currentState,
            'ADJUST': {
                ...currentState['ADJUST'],
                brightness: brightness,
                saturation: saturation,
                inversion: inversion,
                grayscale: grayscale,
            }
        })
    }

    const onChange = () => {
        console.log('asdf')
        setAdjustState({
            // ...currentState['ADJUST'],
            brightness: brightness,
            saturation: saturation,
            inversion: inversion,
            grayscale: grayscale,
        })
    }

    return (
        <div className='flex flex-col'>
            <SliderComponent label='Brightness' value={brightness} setValue={setBrightness} onMouseUp={onMouseUp} min={0} max={400} />
            <SliderComponent label='Saturation' value={saturation} setValue={setSaturation} onMouseUp={onMouseUp} min={0} max={400} />
            <SliderComponent label='Inversion' value={inversion} setValue={setInversion} onMouseUp={onMouseUp} min={0} max={100} />
            <SliderComponent label='Grayscale' value={grayscale} setValue={setGrayscale} onMouseUp={onMouseUp} min={0} max={100} />
        </div>
    )
}



function DesignerComponent({ }) {


    const { editorState, setEditorState, imageSrc, setImageSrc, currentState, adjustState } = useEditor();

    const [brightness, setBrightness] = useState(adjustState.brightness)
    const [saturation, setSaturation] = useState(adjustState.saturation)
    const [inversion, setInversion] = useState(adjustState.inversion)
    const [grayscale, setGrayscale] = useState(adjustState.grayscale)

    useEffect(() => {
        setBrightness(adjustState.brightness)
        setSaturation(adjustState.saturation)
        setInversion(adjustState.inversion)
        setGrayscale(adjustState.grayscale)
    }, [adjustState])

    useEffect(() => {
        setBrightness(currentState['ADJUST'].brightness)
        setSaturation(currentState['ADJUST'].saturation)
        setInversion(currentState['ADJUST'].inversion)
        setGrayscale(currentState['ADJUST'].grayscale)
    }, [currentState]);

    return (
        < >
            <img
                src={imageSrc}
                alt="Upload"
                style={{
                    maxHeight: "70vh",
                    filter: `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
                }}
            />
        </>
    )
}