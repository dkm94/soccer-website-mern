/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { IconButton, Toolbar, Box, Tooltip, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

import ModalComponent from 'components/Modal/ModalComponent';

import './EnhancedToolbar.css';

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
	justifyContent: 'end',
	width: '100%',
}));

const TableTitle = styled(Typography)({
	fontSize: '1.75rem',
	fontWeight: 600,
	fontFamily: 'Avenir, Montserrat, Corbel, \'URW Gothic\', source-sans-pro, sans-serif',
	flex: '1 1 100%',
});

const TableSubtitle = styled(Typography)({ flex: '1 1 100%' });

const Selected = styled(Typography)(({ theme }) => ({
	fontSize: '1.1rem',
	flex: '1 1 100%',
}));

const AddButton = styled(Button)(({ theme }) => ({
	textTransform: 'unset',
	backgroundColor: theme.palette.blue.main,
	':hover': { backgroundColor: theme.palette.blue.main },
}));

const EnhancedToolBar = ({ numSelected, selectedIds, setSelectedIds }) => {
	const [ showModal, setShowModal ] = useState(false);
	const [ modalName, setModalName ] = useState('');

	const openModal = (componentName) => {
		setShowModal(true);
		setModalName(componentName);
	};

	return (
		<CustomToolbar
			className="moderators-header"
			sx={{
				padding: '1rem 2rem',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				marginBottom: 2,
			}}>
			<Box sx={{ width: 'fit-content' }} className="moderators-header-title">
				{numSelected > 0 ? (
					<Selected variant="body1" component="div">
						{numSelected} selected
					</Selected>
				) : (
					<>
						<TableTitle variant="h1" id="tableTitle">
              Users
						</TableTitle>
						<TableSubtitle variant="body1">
              Manage moderators status, add or delete moderators.
						</TableSubtitle>
					</>
				)}
			</Box>

			<Box sx={{ width: 'fit-content' }} className="moderators-header-button">
				{numSelected > 0 ? (
					<>
						<Tooltip title="Delete">
							<IconButton onClick={() => openModal('deleteMod')}>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
						{showModal &&
              createPortal(
              	<ModalComponent
              		onClose={() => setShowModal(false)}
              		component={modalName}
              		selectedIds={selectedIds}
              		setSelectedIds={setSelectedIds}
              	/>,
              	document.body
              )}
					</>
				) : (
					<>
						<AddButton
							variant="contained"
							startIcon={<AddIcon />}
							onClick={() => openModal('addMod')}>
              Add new moderator
						</AddButton>
						{showModal &&
              createPortal(
              	<ModalComponent onClose={() => setShowModal(false)} component={modalName} />,
              	document.body
              )}
					</>
				)}
			</Box>
		</CustomToolbar>
	);
};

export default EnhancedToolBar;
