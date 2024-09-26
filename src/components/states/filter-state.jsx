
import { z } from 'zod'

import React, { useEffect, useRef, useState } from 'react'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import useEditor from '../../hooks/useEditor';
import setCanvasPreview from '../../utils/setCanvasPreview';
import SliderComponent from '../Slider';
import { cn } from '../../lib/utils';




const type = "FilterState";

const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
})

export const FilterStateElement = {
    type,

    designerComponent: DesignerComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
}


function PropertiesComponent({

}) {

    const { currentState, setCurrentState, imageSrc, addNewState, setAdjustState } = useEditor()



    // useEffect(() => {
    //     onChange()
    // }, [brightness, saturation, inversion, grayscale])

    const onChange = (state) => {
        addNewState({
            ...currentState,
            'FILTER': {
                ...currentState['FILTER'],
                state: state
            }
        })
    }

    return (
        <div className='grid grid-cols-2 gap-4 p-6'>
            <div
                className={cn(
                    ' min-w-10 min-h-10 aspect-square rounded-md overflow-hidden relative cursor-pointer',
                    currentState['FILTER'].state === 'NONE' && 'ring-2 ring-black'
                )}
                onClick={() => onChange('NONE')}
            >
                <img
                    src={imageSrc}
                    alt="Upload"
                    className='w-full h-full object-cover'
                    style={{
                        filter: `brightness(${currentState['ADJUST'].brightness}%) saturate(${currentState['ADJUST'].saturation}%) invert(${currentState['ADJUST'].inversion}%) grayscale(${currentState['ADJUST'].grayscale}%)`
                    }}
                />
                DEFAULT
            </div>
            <div
                className={cn(
                    ' min-w-10 min-h-10 aspect-square rounded-md overflow-hidden relative cursor-pointer',
                    currentState['FILTER'].state === 'SEPIA' && 'ring-2 ring-black'
                )}
                onClick={() => onChange('SEPIA')}
            >
                <img
                    src={imageSrc}
                    alt="Upload"
                    className='w-full h-full object-cover'
                    style={{
                        filter: `brightness(${currentState['ADJUST'].brightness}%) saturate(${currentState['ADJUST'].saturation}%) invert(${currentState['ADJUST'].inversion}%) grayscale(${currentState['ADJUST'].grayscale}%) sepia(100%)`
                    }}
                />
                SEPIA
            </div>
            <div>
                <div
                    className={cn(
                        ' min-w-10 min-h-10 aspect-square rounded-md overflow-hidden relative cursor-pointer',
                        currentState['FILTER'].state === 'GRAY' && 'ring-2 ring-black'
                    )}
                    onClick={() => onChange('GRAY')}
                >
                    <img
                        src={imageSrc}
                        alt="Upload"
                        className='w-full h-full object-cover'
                        style={{
                            filter: `brightness(${currentState['ADJUST'].brightness}%) saturate(${currentState['ADJUST'].saturation}%) invert(${currentState['ADJUST'].inversion}%) grayscale(${currentState['ADJUST'].grayscale}%) grayscale(100%)`
                        }}
                    />
                </div>
                GRAY
            </div>
            <div>
                <div
                    className={cn(
                        ' min-w-10 min-h-10 aspect-square rounded-md overflow-hidden relative cursor-pointer',
                        currentState['FILTER'].state === 'VINTAGE' && 'ring-2 ring-black'
                    )}
                    onClick={() => onChange('VINTAGE')}
                >
                    <img
                        src={imageSrc}
                        alt="Upload"
                        className='w-full h-full object-cover'
                        style={{
                            filter: `brightness(${currentState['ADJUST'].brightness}%) saturate(${currentState['ADJUST'].saturation}%) invert(${currentState['ADJUST'].inversion}%) grayscale(${currentState['ADJUST'].grayscale}%) vintage(100%)`
                        }}
                    />
                </div>
                VINTAGE
            </div>
        </div>
    )
}



function DesignerComponent({ }) {


    const { editorState, setEditorState, imageSrc, setImageSrc, currentState } = useEditor();

    const canvasRef = useRef(null);

    useEffect(() => {
        console.log(currentState['ADJUST'].brightness)
    }, [imageSrc, currentState]);

    return (
        < >
            <img
                src={imageSrc}
                alt="Upload"
                style={{
                    maxHeight: "70vh",
                    filter: `brightness(${currentState['ADJUST'].brightness}%) saturate(${currentState['ADJUST'].saturation}%) invert(${currentState['ADJUST'].inversion}%) grayscale(${currentState['ADJUST'].grayscale}%)`
                }}
                ref={canvasRef}
            />
        </>
    )
}