import { IterationCcw, IterationCw } from 'lucide-react';
import React, { useRef, useState } from 'react'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import useEditor from '../hooks/useEditor';
import setCanvasPreview from '../utils/setCanvasPreview';
import EditorStates from './editor-states';
import mergeImages from 'merge-images'


// const ASPECT_RATIO = null;
// // const ASPECT_RATIO = 3/4;
// const MIN_DIMENSION = 50;

const MiddleCanvas = () => {

    // const imgRef = useRef(null);
    // const previewCanvasRef = useRef(null);
    // const [imgSrc, setImgSrc] = useState("");
    // const [crop, setCrop] = useState();
    // const [error, setError] = useState("");
    // const [aspect, setAspect] = useState(null);

    const { editorState, setEditorState, imageSrc, setImageSrc, goToBack, goToForward } = useEditor();

    // const onSelectFile = (e) => {
    //     const file = e.target.files?.[0];
    //     if (!file) return;

    //     const reader = new FileReader();
    //     reader.addEventListener("load", () => {
    //         const imageElement = new Image();
    //         const imageUrl = reader.result?.toString() || "";
    //         imageElement.src = imageUrl;

    //         imageElement.addEventListener("load", (e) => {
    //             if (error) setError("");
    //             const { naturalWidth, naturalHeight } = e.currentTarget;
    //             if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
    //                 setError("Image must be at least 150 x 150 pixels.");
    //                 return setImgSrc("");
    //             }
    //         });
    //         setImgSrc(imageUrl);
    //     });
    //     reader.readAsDataURL(file);
    // };



    // const onImageLoad = (e) => {
    //     const { width, height } = e.currentTarget;
    //     const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    //     const crop = makeAspectCrop(
    //         {
    //             unit: "%",
    //             width: 100,
    //             height: 100,
    //         },
    //         width / height,
    //         width,
    //         height
    //     );
    //     const centeredCrop = centerCrop(crop, width, height);
    //     setCrop(centeredCrop);
    // };

    // return (
    //     <div className='flex-grow flex flex-col'>
    //         <div className="bg-zinc-100 flex-grow flex flex-col justify-end p-6">
    //             <div className='flex-grow bg-white flex items-center justify-center'>
    //                 {!imgSrc && (
    //                     <label className="block mb-3 w-fit">
    //                         <span className="sr-only">Choose profile photo</span>
    //                         <input
    //                             type="file"
    //                             accept="image/*"
    //                             onChange={onSelectFile}
    //                             className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
    //                         />
    //                     </label>
    //                 )}
    //                 {imgSrc && (
    //                     <ReactCrop
    //                         crop={crop}
    //                         onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
    //                         onComplete={(c) => {
    //                             setCanvasPreview(
    //                                 imgRef.current, // HTMLImageElement
    //                                 previewCanvasRef.current, // HTMLCanvasElement
    //                                 convertToPixelCrop(
    //                                     crop,
    //                                     imgRef.current.width,
    //                                     imgRef.current.height
    //                                 )
    //                             );
    //                         }}
    //                         // circularCrop
    //                         keepSelection
    //                         // aspect={ASPECT_RATIO}
    //                         minWidth={MIN_DIMENSION}
    //                         minHeight={MIN_DIMENSION}
    //                     >
    //                         <img
    //                             src={imgSrc}
    //                             ref={imgRef}
    //                             alt="Upload"
    //                             style={{ maxHeight: "70vh" }}
    //                             onLoad={onImageLoad}
    //                         />
    //                         {/* <img src={'https://avatars.mds.yandex.net/i?id=32468d99fe271203e3aac436878b51afb52a4e66-8196260-images-thumbs&n=13'} /> */}
    //                     </ReactCrop>
    //                 )}
    //             </div>
    //         </div>
    //         <div className="bg-white w-full h-16 p-4 py-2 border-t-2 border-gray-200 flex flex-row justify-between items-center">
    //             <p className="text-xl font-semibold">
    //                 Image Editor
    //             </p>
    //             <div className='flex flex-row items-center gap-4'>
    //                 <IterationCw className='text-xl text-zinc-600' />
    //                 <IterationCcw className='text-xl text-zinc-600' />
    //             </div>
    //             <div className='flex flex-row items-center gap-4'>
    //                 <div className='ring-1 p-4 py-2 font-semibold ring-gray-200 flex flex-row items-center justify-between rounded-full'>
    //                     Cancel
    //                 </div>
    //                 <div className=' p-4 py-2 font-semibold bg-blue-500 text-white flex flex-row items-center justify-between rounded-full'>
    //                     Save
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )

    const { imageRef, currentState, canvas: returnCanvas } = useEditor();

    const saveImage = async () => {
        const canvas = document.querySelector("canvas")
        const ctx = canvas.getContext("2d");

        canvas.width = imageRef.current?.clientWidth
        canvas.height = imageRef.current?.clientHeight

        ctx.filter = `brightness(${currentState['ADJUST'].brightness}%) saturate(${currentState['ADJUST'].saturation}%) invert(${currentState['ADJUST'].inversion}%) grayscale(${currentState['ADJUST'].grayscale}%) ${currentState['FILTER'].state === 'NONE' ? '' : currentState['FILTER'].state === 'SEPIA' ? 'sepia(100%)' : currentState['FILTER'].state === 'GRAY' ? 'grayscale(100%)' : currentState['FILTER'].state === 'VINTAGE' ? 'vintage(100%)' : ''}`
        ctx.translate(canvas.width / 2, canvas.height / 2)
        if (currentState['ROTATE_FLIP'].rotate !== 0) {
            ctx.rotate(90 * Math.Pi / 180)
        }
        ctx.scale(currentState['ROTATE_FLIP'].flipHorizontal, currentState['ROTATE_FLIP'].flipVertical)
        ctx.drawImage(imageRef.current, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);


        const firstUrl = canvas.toDataURL({ format: 'png', quality: 1 });

        const secondUrl = returnCanvas.toDataURL();


        //TODO: somehow export the two images in one 'hhhhhhhhhhhhhhhhhhh'


        const link = document.createElement('a');
        link.download = 'image.png';
        link.href = returnCanvas.toDataURL();
        link.click();

        const exportAsPNG = () => {
            if (!canvas) return;

            // Capture the canvas content
            const dataUrl = canvas.toDataURL({ format: 'png', quality: 1 });

            // Create a downloadable link
            const link = document.createElement('a');
            link.download = 'canvas_image.png';
            link.href = dataUrl;
            link.click();
        };

        exportAsPNG();

    }





    // const EditorElement = editorState === 'CROP' ? EditorStates['CROP']?.designerComponent : editorState === 'ADJUST' ? EditorStates['ADJUST']?.designerComponent : EditorStates['CANVAS']?.designerComponent



    const EditorElement = editorState === 'CROP' ? EditorStates['CROP']?.designerComponent : EditorStates['CANVAS']?.designerComponent
    // const EditorElement = EditorStates[editorState]?.designerComponent 

    return (

        <div className='flex-grow flex flex-col' id='target-div'>
            <div className="bg-zinc-100 flex-grow flex flex-col justify-end p-6">
                <div className='flex-grow bg-white flex items-center justify-center overflow-hidden'>
                    {!EditorElement ? (
                        <div>No such Editor state</div>
                    ) : (
                        <EditorElement />
                    )}
                </div>
            </div>
            <div className="bg-white w-full h-16 p-4 py-2 border-t-2 border-gray-200 flex flex-row justify-between items-center">
                <p className="text-xl font-semibold">
                    Image Editor
                </p>
                <div className='flex flex-row items-center gap-4'>
                    <span
                        onClick={goToBack}
                        className='cursor-pointer p-2 rounded-full hover:bg-zinc-100 ease-in-out duration-200'
                    >
                        <IterationCw className='text-xl text-zinc-600' />
                    </span>
                    <span
                        onClick={goToForward}
                        className='cursor-pointer p-2 rounded-full hover:bg-zinc-100 ease-in-out duration-200'
                    >
                        <IterationCcw className='text-xl text-zinc-600' />
                    </span>
                </div>
                <div className='flex flex-row items-center gap-4'>
                    <div className='ring-1 p-4 py-2 font-semibold ring-gray-200 flex flex-row items-center justify-between rounded-full'>
                        Cancel
                    </div>
                    <div
                        onClick={() => saveImage()}
                        className=' cursor-pointer p-4 py-2 font-semibold bg-blue-500 text-white flex flex-row items-center justify-between rounded-full'
                    >
                        Save
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiddleCanvas
