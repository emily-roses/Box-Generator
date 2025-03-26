import React from 'react'

interface LabelledRangeProps {
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (arg0: number) => void;
}

const LabelledRange = ({
    label,
    min,
    max,
    value,
    onChange,
}: LabelledRangeProps) => {
    return (
        <div className="flex flex-col items-center w-1/3 md:w-56">
            <label htmlFor={label}>{label}</label>
            <input
                className="w-full"
                type="range"
                id={label}
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
            />
        </div>
    );
};

export default LabelledRange;
