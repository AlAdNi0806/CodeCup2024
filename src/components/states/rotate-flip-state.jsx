
import { z } from 'zod'

import React, { useEffect, useRef, useState } from 'react'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import useEditor from '../../hooks/useEditor';
import setCanvasPreview from '../../utils/setCanvasPreview';
import { FlipHorizontal2, FlipVertical2, RotateCcwSquare, RotateCwSquare } from 'lucide-react';




const type = "RotateFlipState";

const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
})

export const RotateFlipStateElement = {
    type,

    designerComponent: DesignerComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
}


function PropertiesComponent({

}) {

    const { currentState, setCurrentState, addNewState } = useEditor()

    return (
        <div className='flex flex-col gap-4 p-6'>
            <p className='text-lg text-zinc-700 font-semibold'>
                Rotate
            </p>
            <div className='flex flex-row gap-4'>
                <span
                    className='flex justify-center items-center flex-grow h-16 rounded-md overflow-hidden relative ring-2 ring-zinc-200 cursor-pointer'
                    onClick={() => {
                        console.log('clicked')

                        addNewState({
                            ...currentState,
                            'ROTATE_FLIP': {
                                ...currentState['ROTATE_FLIP'],
                                rotate: currentState['ROTATE_FLIP'].rotate - 90
                            }
                        })
                    }}
                >
                    <RotateCcwSquare size={28} />
                </span>
                <div
                    className='flex justify-center items-center flex-grow h-16 rounded-md overflow-hidden relative ring-2 ring-zinc-200 cursor-pointer'
                    onClick={() => {
                        console.log('clicked')
                        addNewState({
                            ...currentState,
                            'ROTATE_FLIP': {
                                ...currentState['ROTATE_FLIP'],
                                rotate: currentState['ROTATE_FLIP'].rotate + 90
                            }
                        })
                    }}
                >
                    <RotateCwSquare />
                </div>
            </div>
            <p className='text-lg text-zinc-700 font-semibold'>
                Flip
            </p>
            <div className='flex flex-row gap-4'>
                <span
                    className='flex justify-center items-center flex-grow h-16 rounded-md overflow-hidden relative ring-2 ring-zinc-200 cursor-pointer'
                    onClick={() => {
                        console.log('clicked')
                        addNewState({
                            ...currentState,
                            'ROTATE_FLIP': {
                                ...currentState['ROTATE_FLIP'],
                                flipHorizontal: currentState['ROTATE_FLIP'].flipHorizontal === 1 ? -1 : 1
                            }
                        })
                    }}
                >
                    <FlipHorizontal2 />
                </span>
                <div
                    className='flex justify-center items-center flex-grow h-16 rounded-md overflow-hidden relative ring-2 ring-zinc-200 cursor-pointer'
                    onClick={() => {
                        console.log('clicked')
                        addNewState({
                            ...currentState,
                            'ROTATE_FLIP': {
                                ...currentState['ROTATE_FLIP'],
                                flipVertical: currentState['ROTATE_FLIP'].flipVertical === 1 ? -1 : 1
                            }
                        })
                    }}
                >
                    <FlipVertical2 />
                </div>
            </div>
        </div>
    )
}



function DesignerComponent({ }) {



    const { editorState, setEditorState, imageSrc, setImageSrc, currentState } = useEditor();


    useEffect(() => {
        console.log('HOASIDFASODFH', currentState['ROTATE_FLIP'].rotate)
    }, [currentState])



    return (
        < >
            <img
                src={imageSrc}
                alt="Upload"
                style={{
                    maxHeight: "70vh",
                    transform: `rotate(${currentState['ROTATE_FLIP'].rotate}deg) scale(${currentState['ROTATE_FLIP'].flipHorizontal}, ${currentState['ROTATE_FLIP'].flipVertical})`
                }}
            />
        </>
    )
}