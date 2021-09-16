import React, { useMemo, useState } from "react";

import "./App.css";

function App() {
	const [size, setSize] = useState(100);
	const [spacing, setSpacing] = useState(5);
	const [speed, setSpeed] = useState(10);
	const [radius, setRadius] = useState(10);
	console.log(spacing);
	return (
		<div className="w-screen h-screen overflow-hidden bg-blue-300">
			<div className="flex justify-center gap-4 bg-gray-100">
				<LabelledRange
					label="Size"
					min={50}
					max={400}
					value={size}
					onChange={setSize}
				/>
				<LabelledRange
					label="Spacing"
					min={2}
					max={10}
					value={spacing}
					onChange={setSpacing}
				/>
				<LabelledRange
					label="Speed"
					min={0.5}
					max={75}
					value={speed}
					onChange={setSpeed}
				/>
				<LabelledRange
					label="Radius"
					min={6}
					max={30}
					value={radius}
					onChange={setRadius}
				/>
			</div>
			<div className="grid h-full place-content-center">
				<Box size={size} spacing={spacing} speed={speed} radius={radius} />
			</div>
		</div>
	);
}

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
		<div className="flex flex-col items-center">
			<label htmlFor={label}>{label}</label>
			<input
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

interface BoxProps {
	size: number;
	spacing: number;
	speed: number;
	radius: number;
}

interface Position {
	x: number;
	y: number;
	z: number;
}

const Box = ({ size, spacing, speed, radius }: BoxProps) => {
	const dots = useMemo(() => {
		let arr = [];
		for (let x = 0; x <= size + (size / spacing - 1); x += size / spacing) {
			for (let y = 0; y <= size + (size / spacing - 1); y += size / spacing) {
				for (
					let z = -size / 2;
					z <= size / 2 + (size / spacing - 1);
					z += size / spacing
				) {
					arr.push({ x, y, z });
				}
			}
		}
		return arr;
	}, [size, spacing]);

	return (
		<div
			className="grid overflow-hidden place-content-center"
			style={{ width: `${size * 2}px`, height: `${size * 2}px` }}
		>
			<div
				className="transform-gpu cube"
				style={
					{
						transformStyle: "preserve-3d",
						width: `${size}px`,
						height: `${size}px`,
						transformOrigin: `center center ${size / 2}`,
						"--speed": `${100 / speed}s`,
					} as React.CSSProperties
				}
			>
				{dots.map((pos) => (
					<Dot position={pos} boxSize={size} radius={radius} />
				))}
			</div>
		</div>
	);
};

const Dot = ({
	position,
	boxSize,
	radius,
}: {
	position: Position;
	boxSize: number;
	radius: number;
}) => {
	const color = useMemo(() => {
		return 230 + (position.z / boxSize) * 50;
	}, [position.z, boxSize]);

	return (
		<>
			<div
				className="absolute rounded-full transform-gpu hover:scale-150"
				style={{
					backgroundColor: `rgb(${color}, ${color}, ${color})`,
					width: radius / 2,
					height: radius / 2,
					translate: `${position.x}px ${position.y}px ${position.z}px`,
				}}
			/>
			<div
				className="absolute rounded-full transform-gpu hover:scale-150"
				style={{
					backgroundColor: `rgb(${color}, ${color}, ${color})`,
					width: radius / 2,
					height: radius / 2,
					translate: `${position.x}px ${position.y}px ${position.z}px`,
					rotate: "x 90deg",
				}}
			/>
			<div
				className="absolute rounded-full transform-gpu hover:scale-150"
				style={{
					backgroundColor: `rgb(${color}, ${color}, ${color})`,
					width: radius / 2,
					height: radius / 2,
					translate: `${position.x}px ${position.y}px ${position.z}px`,
					rotate: "y 90deg",
				}}
			/>
		</>
	);
};

export default App;
