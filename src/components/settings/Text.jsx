import React from 'react';
import { fontFamilyOptions, fontSizeOptions, fontWeightOptions } from "../../constants";
import { Select } from "@headlessui/react";

const selectConfigs = [
    {
        property: "fontFamily",
        placeholder: "Choose a font",
        options: fontFamilyOptions,
    },
    { property: "fontSize", placeholder: "30", options: fontSizeOptions },
    {
        property: "fontWeight",
        placeholder: "Semibold",
        options: fontWeightOptions,
    },
];

const Text = ({
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    fontWeight,
    setFontWeight,
}) => (
    <div className='flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3'>
        <h3 className='text-lg font-semibold uppercase'>Text</h3>

        <div className='flex flex-col gap-3'>
            <select
                key={selectConfigs[0].property}
                onChange={(e) => setFontFamily(e.target.value)}
                value={fontFamily}
            >
                {selectConfigs[0].options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className='hover:bg-primary-green hover:text-primary-black'
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <select
                key={selectConfigs[1].property}
                onChange={(e) => setFontSize(e.target.value)}
                value={fontSize}
            >
                {selectConfigs[1].options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className='hover:bg-primary-green hover:text-primary-black'
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <select
                key={selectConfigs[2].property}
                onChange={(e) => setFontWeight(e.target.value)}
                value={fontWeight}
            >
                {selectConfigs[2].options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className='hover:bg-primary-green hover:text-primary-black'
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    </div>
);


export default Text;
