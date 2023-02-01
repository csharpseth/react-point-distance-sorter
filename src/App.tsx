import { useState, useEffect, useRef, useContext } from 'react';
import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import { Checkbox, DropDownMenu } from './components/InputComponents';
import { DataContext } from './contexts/DataContext';
import { ThemeContext } from './contexts/ThemeContext';
import { AcknowledgementType, DrawType, SortType } from './ts/enums';

function App() {
	
	
	const placementArea = useRef<HTMLDivElement>(null)
	const { darkMode, isMobile } = useContext(ThemeContext)
	const {
		positions,
		origin,
		order,
		Initialize,
		Clear,
		GetCoordString,
		GetRelativeDistance,
		SetDrawType,
		setUseFastDistance
	} = useContext(DataContext)
	

	useEffect(() => {
		Initialize(placementArea.current?.offsetLeft, placementArea.current?.offsetTop, placementArea.current?.offsetWidth, placementArea.current?.offsetHeight)
	}, [placementArea])

	return (
		<div className="App" id={darkMode ? 'darkBackground':''}>
			
			<HeaderComponent />

			<div className='info FadeIn' id={darkMode ? 'darkModeFont':''}>
				{!isMobile ?
				<>
				<span><b>Left Click:</b> Place Point</span>
				<span><b>Middle Mouse Click:</b> Move Origin</span>
				</>	
				:
				<>
				<span><b>One Tap:</b> Place Point</span>
				<span><b>Double Tap:</b> Move Origin</span>
				</>
				}
			</div>
			{isMobile ? 
				<span
					className='disclaimer'
					id={darkMode?'darkModeFont':''}>
						<b>DISCLAIMER:</b> Some features may not work as intended on mobile.
				</span>:''}
			<div
				className='FadeIn'
				id='placementArea'
				ref={placementArea}
			>
				<div className='interactionRegion' >
					<button
						className='clearButton'
						onClick={Clear}
					>Clear</button>
				</div>
				{origin ?
				<div
					className='point'
					id='origin'
					style={{ left: `${origin.x}px`, top: `${origin.y}px` }}
				>
				X
				</div>
				:''}

				{order && positions ? order.map((index: number, ind: number) => {
					return <div
							key={index}
							className='point'
							style={{
								left: `${positions[index].x}px`,
								top: `${positions[index].y}px`,
								backgroundColor: `rgba(${Math.round(GetRelativeDistance(index) * 255 + 50)}, ${Math.round((1 - GetRelativeDistance(index)) * 190 + 20)}, 0)`
							}}>
							{ind}
							</div>
				}):''}

				<svg>
					{order && positions ? order.map((val: number, index: number) => 
						<polyline
							key={val}
							style={{
								stroke: `rgba(${Math.round(GetRelativeDistance(val) * 255 + 50)}, ${Math.round((1 - GetRelativeDistance(val)) * 190 + 20)}, 0, 1)`
							}}
							points={GetCoordString(index, index-1)}
						/>
					): ''}
				</svg>
			</div>

			<div className='options'>
				<DropDownMenu
				title='Line Draw Type'
				options={Object.values(DrawType)}
				onChange={(val: string) => {
					SetDrawType(val)
				}} />
				<DropDownMenu
				title='Sorting Method'
				options={Object.values(SortType)}
				onChange={(val: string) => {
					
				}} />
				<DropDownMenu
				title='Use Fast Distance'
				options={Object.values(AcknowledgementType)}
				onChange={(val: string) => {
					setUseFastDistance(val === 'Yes')
				}} />
			</div>


			<FooterComponent />
		</div>
	);
}

export default App;
