import { useState } from 'react'

import Loader from '../Loader/Loader'

const FrameViewer = ({ srcData, height = 500, width = 800 }) => {
	const [isLoading, setIsLoading] = useState(true)

	const showFrame = () => {
		setIsLoading(false)
	}

	return (
		<div
			style={{
				height,
				width,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			{isLoading && (
				<div
					style={{ position: 'absolute' }}
					className='frame-loader-container'
				>
					<Loader icon />
				</div>
			)}
			<iframe
				onLoad={showFrame}
				style={{ visibility: isLoading ? 'hidden' : 'visible' }}
				allowtransparency='true'
				background='transparent'
				frameBorder='0'
				width={width}
				height={height}
				srcDoc={srcData}
			/>
		</div>
	)
}

export default FrameViewer
