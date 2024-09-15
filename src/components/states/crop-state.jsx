
import { z } from 'zod'

import React, { useRef, useState } from 'react'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import useEditor from '../../hooks/useEditor';
import setCanvasPreview from '../../utils/setCanvasPreview';




const type = "CropState";

const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
})

export const CropStateElement = {
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



const ASPECT_RATIO = null;
// const ASPECT_RATIO = 3/4;
const MIN_DIMENSION = 50;

function DesignerComponent({ }) {

    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");
    const [aspect, setAspect] = useState(null);

    const { editorState, setEditorState, imageSrc, setImageSrc, originalImageSrc, setOriginalImageSrc } = useEditor();

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const returnedImageUrl = reader.result?.toString() || "";
            imageElement.src = returnedImageUrl;

            imageElement.addEventListener("load", (e) => {
                if (error) setError("");
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setError("Image must be at least 150 x 150 pixels.");
                    return setImgSrc("");
                }
            });
            setOriginalImageSrc(returnedImageUrl);
            setImageSrc(returnedImageUrl);

        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: 100,
                height: 100,
            },
            width / height,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };


    return (
        < >
            {!originalImageSrc && (
                <label className="block mb-3 w-fit">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onSelectFile}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
                    />
                </label>
            )}
            {originalImageSrc && (
                <ReactCrop
                    crop={crop}
                    onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => {
                        setTimeout(() => {
                            setCanvasPreview(
                                imgRef.current, // HTMLImageElement
                                previewCanvasRef.current, // HTMLCanvasElement
                                convertToPixelCrop(
                                    crop,
                                    imgRef.current.width,
                                    imgRef.current.height
                                )
                            );
                            const dataUrl = previewCanvasRef.current.toDataURL();
                            setImageSrc(dataUrl);
                        }, 100);
                    }}
                    // circularCrop
                    keepSelection
                    // aspect={ASPECT_RATIO}
                    minWidth={MIN_DIMENSION}
                    minHeight={MIN_DIMENSION}
                >
                    <img
                        src={originalImageSrc}
                        ref={imgRef}
                        alt="Upload"
                        style={{ maxHeight: "70vh" }}
                        onLoad={onImageLoad}
                    />
                    {/* <img src={'https://avatars.mds.yandex.net/i?id=32468d99fe271203e3aac436878b51afb52a4e66-8196260-images-thumbs&n=13'} /> */}
                </ReactCrop>
            )}
            {crop && (
                <canvas
                    ref={previewCanvasRef}
                    className="mt-4"
                    style={{
                        // display: "none",
                        border: "1px solid black",
                        objectFit: "contain",
                        width: 150,
                        height: 150,
                    }}
                />
            )}
        </>
    )
}