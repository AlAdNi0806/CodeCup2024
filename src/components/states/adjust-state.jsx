
import { z } from 'zod'

import React, { useEffect, useRef, useState } from 'react'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import useEditor from '../../hooks/useEditor';
import setCanvasPreview from '../../utils/setCanvasPreview';
import SliderComponent from '../Slider';
import kelvinToRGB from 'kelvin-to-rgb';




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

    const [blueAmmount, setBlueAmmount] = useState(currentState['ADJUST'].blueAmmount)

    useEffect(() => {
        onChange()
    }, [brightness, saturation, inversion, grayscale, blueAmmount])

    useEffect(() => {
        setBrightness(currentState['ADJUST'].brightness)
        setSaturation(currentState['ADJUST'].saturation)
        setInversion(currentState['ADJUST'].inversion)
        setGrayscale(currentState['ADJUST'].grayscale)
        setBlueAmmount(currentState['ADJUST'].blueAmmount)
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
                blueAmmount: blueAmmount,
            }
        })
    }

    const onChange = () => {
        console.log('asdf')
        console.log('blueAmmount', blueAmmount)
        setAdjustState({
            // ...currentState['ADJUST'],
            brightness: brightness,
            saturation: saturation,
            inversion: inversion,
            grayscale: grayscale,
            blueAmmount: blueAmmount,
        })
    }

    const [kelvin, setKelvin] = useState(15000)

    useEffect(() => {
        console.log('kelvin', kelvin)
        const rgb = kelvinToRGB(kelvin)
        console.log('rgb', rgb)
    }, [kelvin])

    return (
        <div className='flex flex-col'>
            <SliderComponent label='Brightness' value={brightness} setValue={setBrightness} onMouseUp={onMouseUp} min={0} max={400} />
            <SliderComponent label='Saturation' value={saturation} setValue={setSaturation} onMouseUp={onMouseUp} min={0} max={400} />
            <SliderComponent label='Inversion' value={inversion} setValue={setInversion} onMouseUp={onMouseUp} min={0} max={100} />
            <SliderComponent label='Grayscale' value={grayscale} setValue={setGrayscale} onMouseUp={onMouseUp} min={0} max={100} />
            <SliderComponent label='Temperature' value={blueAmmount} setValue={setBlueAmmount} onMouseUp={onMouseUp} min={0} max={180} />


            {/* <SliderComponent label='Grayscale' value={grayscale} setValue={setGrayscale} onMouseUp={onMouseUp} min={0} max={100} /> */}

            <input
                type="number"
                // onBlur={() => onBlur()}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                value={blueAmmount}
                onChange={(e) => {
                    setBlueAmmount(e.target.value)
                }}
                onBlur={() => onChange()}
                className='w-full p-2 rounded-md border border-zinc-200 text-zinc-700 font-semibold'
            // onKeyDown={handleKeyPress}
            />
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