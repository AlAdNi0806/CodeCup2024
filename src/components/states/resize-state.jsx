
import { z } from 'zod'

import React, { useRef, useState } from 'react'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import useEditor from '../../hooks/useEditor';
import setCanvasPreview from '../../utils/setCanvasPreview';




const type = "ResizeState";

const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
})

export const ResizeStateElement = {
    type,

    designerComponent: DesignerComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
}


function PropertiesComponent({

}) {

    return (
        <div>
            cropProperties
        </div>
    )
}



function DesignerComponent({ }) {



    const { editorState, setEditorState, imageSrc, setImageSrc } = useEditor();



    return (
        < >
            <img
                src={imageSrc}
                alt="Upload"
                style={{ maxHeight: "70vh" }}
            />
        </>
    )
}