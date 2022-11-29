import { useState } from "react"



const ImageViewer = ({ src, height=null, width=null }) => {
    const [isLoading, setIsLoading] = useState(true)

    const showImage = () => {
        setIsLoading(false)
    }

    return (
        <div style={{ height, width, display: 'flex', alignItems: 'center', justifyContent: 'center', position:'relative' }}>
            { isLoading && (
                <div style={{ position: 'absolute' }}>
                    <div className="small-loader" style={loaderStyles} />
                </div>
            ) }
            <img src={src} height={height} width={width} onLoad={showImage} style={{ visibility: isLoading ? 'hidden' : 'visible' }} />
        </div>
    )
}

const loaderStyles = {
    width: '24px',
    height: '24px',
    border: '3px solid black',
    borderBottomColor: 'transparent',
    borderRadius: '50%',
    animation: 'rotation 1s linear infinite'
}

export default ImageViewer