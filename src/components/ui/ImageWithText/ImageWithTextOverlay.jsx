import React from 'react';

const ImageWithTextOverlay = ({ imageUrl, text }) => {
	const containerStyle = {
		position: 'relative',
		width: '100%',
		overflow: 'hidden',
		height: '100%',
	};

	const imageStyle = {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	};

	const overlayStyle = {
		position: 'absolute',
		top: '0',
		left: '0',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	};

	const textStyle = {
		color: '#fff',
		fontSize: '8vw',
		fontWeight: '900',
		fontFamily: 'system-ui, sans-serif',
		textTransform: 'uppercase',
		textShadow: 'rgba(0, 0, 0, 1) 9px 10px 20px',
		letterSpacing: '7px',
		opacity: '0.5',
	};

	return (
		<div style={containerStyle}>
			<img src={imageUrl} alt="Background" style={imageStyle} />
			<div style={overlayStyle}>
				<div style={textStyle}>
					{text}
				</div>
			</div>
		</div>
	);
};

export default ImageWithTextOverlay;
