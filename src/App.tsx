import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSpring, a, config } from "@react-spring/web";

import "./App.css";

function App() {
	const [size, setSize] = useState(100);
	const [spacing, setSpacing] = useState(5);
	console.log(spacing);
	return (
		<div className="w-screen h-screen overflow-hidden bg-blue-200">
			<div className="flex gap-4 bg-gray-100">
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
			</div>
			<div className="grid h-full place-content-center">
				<Box size={size} spacing={spacing} />
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
}

interface Position {
	x: number;
	y: number;
	z: number;
}

const Box = ({ size, spacing }: BoxProps) => {
	const dots = useMemo(() => {
		let arr = [];
		for (let x = 0; x <= size; x += size / spacing) {
			for (let y = 0; y <= size; y += size / spacing) {
				for (let z = -size / 2; z <= size / 2; z += size / spacing) {
					arr.push({ x, y, z });
				}
			}
		}
		return arr;
	}, [size, spacing]);

	return (
		<div
			className="grid overflow-hidden bg-blue-300 place-content-center"
			style={{ width: `${size * 2}px`, height: `${size * 2}px` }}
		>
			<div
				className="transform-gpu cube"
				style={{
					transformStyle: "preserve-3d",
					width: `${size}px`,
					height: `${size}px`,
					transformOrigin: `center center ${size / 2}`,
				}}
			>
				{dots.map((pos) => (
					<Dot position={pos} boxSize={size} />
				))}
			</div>
		</div>
	);
};

const Dot = ({
	position,
	boxSize,
}: {
	position: Position;
	boxSize: number;
}) => {
	const size = "w-2 h-2";

	const color = useMemo(() => {
		return 230 + (position.z / boxSize) * 50;
	}, [position.z, boxSize]);

	return (
		<>
			<div
				className={`absolute ${size} bg-white rounded-full transform-gpu`}
				style={{
					transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`,
					backgroundColor: `rgb(${color}, ${color}, ${color})`,
				}}
			/>
			<div
				className={`absolute ${size} bg-white rounded-full transform-gpu`}
				style={{
					transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateX(90deg)`,
					backgroundColor: `rgb(${color}, ${color}, ${color})`,
				}}
			/>
			<div
				className={`absolute ${size} bg-white rounded-full transform-gpu`}
				style={{
					transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateY(90deg)`,
					backgroundColor: `rgb(${color}, ${color}, ${color})`,
				}}
			/>
		</>
	);
};

const useMousePosition = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		window.addEventListener("mousemove", (e) =>
			setPosition({ x: e.clientX, y: e.clientY }),
		);
		return () =>
			window.removeEventListener("mousemove", (e) =>
				setPosition({ x: e.clientX, y: e.clientY }),
			);
	}, []);
	return position;
};

export default App;
