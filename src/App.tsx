import React, { useMemo, useState } from "react";

import "./App.css";

function App() {
	const [size, setSize] = useState(100);
	const [spacing, setSpacing] = useState(5);
	const [speed, setSpeed] = useState(10);
	const [radius, setRadius] = useState(10);
	const [animation, setAnimation] = useState("rotate");
	const [wireframe, setWireframe] = useState(false);
	console.log(spacing);
	return (
		<div className="w-screen h-screen overflow-hidden bg-blue-300">
			<div className="flex flex-wrap items-center justify-center gap-4 bg-gray-100">
				<LabelledRange
					label="Size"
					min={50}
					max={400}
					value={size}
					onChange={setSize}
				/>
				<LabelledRange
					label="Spacing"
					min={1}
					max={9}
					value={spacing}
					onChange={setSpacing}
				/>
				<LabelledRange
					label="Speed"
					min={0.5}
					max={50}
					value={speed}
					onChange={setSpeed}
				/>
				<LabelledRange
					label="Radius"
					min={6}
					max={40}
					value={radius}
					onChange={setRadius}
				/>
				<select
					className="p-2 bg-gray-200 rounded"
					onChange={(e) => setAnimation(e.target.value)}
				>
					<option value="rotate">Rotate All</option>
					<option value="rotateXY">Rotate XY</option>
					<option value="rotateXZ">Rotate XZ</option>
					<option value="rotateYZ">Rotate YZ</option>
					<option value="rotateX">Rotate X</option>
					<option value="rotateY">Rotate Y</option>
					<option value="rotateZ">Rotate Z</option>
				</select>
				<div>
					<input
						type="checkbox"
						id="Wireframe"
						onChange={() => setWireframe((prev) => !prev)}
						checked={wireframe}
					/>
					<label htmlFor="Wireframe"> Wireframe?</label>
				</div>
			</div>
			<div className="grid h-full place-content-center">
				<Box
					size={size}
					spacing={spacing}
					speed={speed}
					radius={radius}
					animation={animation}
					wireframe={wireframe}
				/>
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

interface BoxProps {
	animation: string;
	size: number;
	spacing: number;
	speed: number;
	radius: number;
	wireframe: boolean;
}

interface Position {
	x: number;
	y: number;
	z: number;
}

const Box = ({
	size,
	spacing,
	speed,
	radius,
	animation,
	wireframe,
}: BoxProps) => {
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
			className="transform-gpu cube"
			style={
				{
					width: `${size}px`,
					height: `${size}px`,
					transformOrigin: `center center ${size / 2}`,
					"--speed": `${100 / speed}s`,
					"--animation": animation,
				} as React.CSSProperties
			}
		>
			{dots.map((pos) => (
				<Dot position={pos} boxSize={size} radius={radius} />
			))}
			{wireframe && <Wireframe size={size} />}
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
		<div
			className="absolute rounded-full transform-gpu"
			style={{
				translate: `${position.x}px ${position.y}px ${position.z}px`,
				transformStyle: "preserve-3d",
				width: radius / 2,
				height: radius / 2,
				backgroundColor: `rgb(${color}, ${color}, ${color})`,
			}}
		>
			<div
				className="absolute w-full h-full rounded-full transform-gpu"
				style={{ backgroundColor: "inherit", rotate: "x 90deg" }}
			/>
			<div
				className="absolute w-full h-full rounded-full transform-gpu"
				style={{ backgroundColor: "inherit", rotate: "y 90deg" }}
			/>
		</div>
	);
};

const Wireframe = ({ size }: { size: number }) => {
	return (
		<>
			<div
				className="absolute border-2"
				style={{ translate: `0  0 ${size / 2}px`, width: size }}
			></div>
			<div
				className="absolute border-2"
				style={{
					translate: `0  0 ${-size / 2}px`,
					width: size + 10,
					height: size + 10,
				}}
			></div>
			<div
				className="absolute border-2"
				style={{
					translate: `0 ${size / 2}px 0`,
					rotate: "x 90deg",
					width: size + 10,
					height: size + 10,
				}}
			></div>
			<div
				className="absolute border-2"
				style={{
					translate: `0 ${-size / 2}px 0`,
					rotate: "x 90deg",
					width: size + 10,
					height: size + 10,
				}}
			></div>
			<div
				className="absolute border-2"
				style={{
					translate: `${size / 2}px`,
					width: size + 10,
					height: size + 10,
					rotate: "y 90deg",
				}}
			></div>
			<div
				className="absolute border-2"
				style={{
					translate: `${-size / 2}px`,
					width: size + 10,
					height: size + 10,
					rotate: "y 90deg",
				}}
			></div>
		</>
	);
};

export default App;
