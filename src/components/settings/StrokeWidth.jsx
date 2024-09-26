


const StrokeWidth = ({
    setStrokeWidth,
    strokeWidth,
    placeholder
}) => (
    <div className='flex flex-col gap-3 border-b border-primary-grey-200 p-5'>
        <h3 className='text-lg font-semibold uppercase'>{placeholder}</h3>
        <input
            className='flex justify-center items-center flex-grow h-8 px-2 rounded-md overflow-hidden relative ring-2 ring-zinc-200 cursor-pointer'
            type='number'
            onChange={(e) => {
                setStrokeWidth(e.target.value)
            }}
            value={strokeWidth}
        />
    </div>
);

export default StrokeWidth;