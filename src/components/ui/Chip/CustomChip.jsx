import React from 'react';
import { Chip, styled } from '@mui/material';

const CustomChip = ({ color, label }) => {
	const BlueChip = styled(Chip)(({ theme }) => ({
		textTransform: 'unset',
		backgroundColor: theme.palette.blue.light,
		color: theme.palette.blue.main,
	}));

	const RedChip = styled(Chip)(({ theme }) => ({
		textTransform: 'unset',
		backgroundColor: theme.palette.primary.lighter,
		color: theme.palette.primary.main,
	}));

	const getColoredChip = () => {
		switch (color) {
			case 'blue':
				return <BlueChip label={label} />;
			case 'red':
				return <RedChip label={label} />;
			default:
				return <Chip label={label} />;
		}
	};

	return getColoredChip(color);
};

export default CustomChip;