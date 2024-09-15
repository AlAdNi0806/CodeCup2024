


const Color = ({
    onChange,
    value,
    placeholder
}) => (
    <div className='flex flex-col gap-3 border-b border-primary-grey-200 p-5'>
        <h3 className='text-lg font-semibold uppercase'>{placeholder}</h3>
        <input
            type='color'
            onChange={(e) => onChange(e.target.value)}
            value={value}
        />
    </div>
);

export default Color;