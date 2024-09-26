import { Blend, ChevronRight, Crop, Maximize2, Repeat, Scaling, SlidersHorizontal, Star, Text, Type } from 'lucide-react'
import React from 'react'
import useEditor from '../hooks/useEditor'
import { cn } from '../lib/utils'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Circle, IText, Line, Rect } from 'fabric'
import mergeImages from 'merge-images'

const LeftSidebar = () => {

    const { editorState, setEditorState, activeCanvasElement, setActiveCanvasElement, canvas } = useEditor()

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
            strokeWidth: 2
        });
        canvas.add(circle);
        canvas.renderAll();
    }

    function addText() {
        const text = new IText('Edit this text');
        canvas.add(text);
        canvas.centerObject(text);
        canvas.setActiveObject(text);
    }

    function addLine() {
        const line = new Line([100, 100, 200, 200], {
            stroke: 'red',
            strokeWidth: 4,
        });
        canvas.add(line);
        canvas.renderAll();
    }






    return (
        <div className=' min-w-72 max-w-72 flex-grow flex flex-col  border-r-2 border-zinc-200'>
            <canvas className='hidden' id="canvason" width="600" height="600"></canvas>
            <div className='flex flex-col gap-6 p-4'>
                <div
                    className={cn(
                        'flex flex-row gap-4 items-center cursor-pointer ease-in-out duration-300',
                        editorState === 'CROP' && 'text-blue-500 '
                    )}
                    onClick={() => setEditorState('CROP')}
                >
                    <Crop size={20} />
                    <p className='font-semibold'>Crop</p>
                </div>
                <div
                    className={cn(
                        'flex flex-row gap-4 items-center cursor-pointer ease-int-out duration-300',
                        editorState === 'RESIZE' && 'text-blue-500 '
                    )}
                    onClick={() => setEditorState('RESIZE')}
                >
                    <Maximize2 size={20} />
                    <p className='font-semibold'>Resize</p>
                </div>
                <div
                    className={cn(
                        'flex flex-row gap-4 items-center cursor-pointer ease-int-out duration-300',
                        editorState === 'ROTATE_FLIP' && 'text-blue-500'
                    )}
                    onClick={() => setEditorState('ROTATE_FLIP')}
                >
                    <Repeat size={20} />
                    <p className='font-semibold'>Rotate and flip</p>
                </div>
                <div
                    className={cn(
                        'flex flex-row gap-4 items-center cursor-pointer ease-int-out duration-300',
                        editorState === 'ADJUST' && 'text-blue-500'
                    )}
                    onClick={() => setEditorState('ADJUST')}
                >
                    <SlidersHorizontal size={20} />
                    <p className='font-semibold'>Adjust</p>
                </div>
                <div
                    className={cn(
                        'flex flex-row gap-4 items-center cursor-pointer ease-int-out duration-300',
                        editorState === 'FILTER' && 'text-blue-500'
                    )}
                    onClick={() => setEditorState('FILTER')}
                >
                    <Blend size={20} />
                    <p className='font-semibold'>Filters</p>
                </div>
            </div>
            <div className='h-0.5 w-full bg-zinc-200' />
            <div className='flex flex-col gap-6 p-4'>
                <Popover className=''>
                    <PopoverButton
                        className={cn(
                            'flex justify-between flex-row gap-4 items-center cursor-pointer ease-int-out duration-300 w-full flex-grow focus:ring-none',
                            editorState === 'CANVAS' && 'text-blue-500 '
                        )}
                        onClick={() => setEditorState('CANVAS')}
                    >
                        <div className='flex flex-row gap-4 items-center'>
                            <Star size={20} />
                            <p className='font-semibold'>Crop</p>
                        </div>
                        <ChevronRight />
                    </PopoverButton>
                    <PopoverPanel
                        transition
                        anchor="right"
                        className=" ring-1 ring-zinc-200 shadow-lg ml-8 divide-white/5 rounded-lg bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                    >
                        <div className="p-3 bg-white grid grid-cols-2 gap-3 w-64">
                            <span
                                onClick={() => {
                                    setActiveCanvasElement('text')
                                    addText()
                                }}
                                className='py-4 aspect-square rounded-md hover:bg-zinc-100 flex flex-col justify-between items-center ease-in-out duration-300 cursor-pointer'
                            >
                                <Type size={48} className='text-blue-500' />
                                Text
                            </span>
                            <span
                                onClick={() => {
                                    setActiveCanvasElement('line')
                                    addLine()
                                }}
                                className='py-4 pt-10 aspect-square rounded-md hover:bg-zinc-100 flex flex-col justify-between items-center ease-in-out duration-300 cursor-pointer'
                            >
                                <div className='w-20 h-1 bg-blue-500' />
                                Line
                            </span>
                            <span
                                onClick={() => {
                                    setActiveCanvasElement('circle')
                                    addCircle()
                                }}
                                className='py-4 aspect-square rounded-md hover:bg-zinc-100 flex flex-col justify-between items-center ease-in-out duration-300 cursor-pointer'
                            >
                                <div className='w-14 h-14 rounded-full bg-blue-500' />
                                Circle
                            </span>
                            <span
                                onClick={() => {
                                    setActiveCanvasElement('rectangle')
                                    addRectangle()
                                }}
                                className='py-4 pt-6 aspect-square rounded-md hover:bg-zinc-100 flex flex-col justify-between items-center ease-in-out duration-300 cursor-pointer'
                            >
                                <div className='w-20 h-10  bg-blue-500' />
                                Rectangle
                            </span>
                        </div>
                    </PopoverPanel>
                </Popover>
            </div>
        </div >
    )
}

export default LeftSidebar