/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Box, Paper, Checkbox, Typography, TablePagination, Chip, useTheme } from '@mui/material';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';

import EnhancedToolBar from 'components/tables/mods/header/EnhancedToolBar';
import { ToggleButton , CustomChip } from 'components/ui';
import { BackofficeLoader } from 'components/Loaders';
import Message from 'components/Screens/Message';

import { getArticles, getUsers } from 'services/queries/public_queries';
import { changeModStatus } from 'services/queries/admin_queries';

import avatar from '../../../../images/avatar.png';
import './ModsTable.css';

const ModsTable = () => {
	const { palette } = useTheme();
	const queryClient = useQueryClient();

	const [ toggleValue, setToggleValue ] = useState(null);
	const [ selectedIds, setSelectedIds ] = useState([]);

	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);

	const {
		isLoadingArticles,
		isErrorArticles,
		data: articles,
	} = useQuery({
		queryKey: [ 'articles' ],
		queryFn: getArticles,
	});

	const {
		isLoading,
		isError,
		data: rows,
	} = useQuery({
		queryKey: [ 'users' ],
		queryFn: getUsers,
	});

	const mutation = useMutation({
		mutationFn: changeModStatus,
		onMutate: async (updatedObj) => {
			await queryClient.cancelQueries({ queryKey: [ 'users', updatedObj._id ] });
			const previousObj = queryClient.getQueryData([ 'users', updatedObj._id ]);
			queryClient.setQueryData([ 'users', updatedObj._id ], updatedObj._id);

			return {
				previousObj,
				updatedObj, 
			};
		},
		onError: (err, updatedObj, context) => {
			queryClient.setQueryData([ 'users', context.updatedObj._id ], context.previousObj);
		},
		onSettled: (updatedObj) => {
			queryClient.invalidateQueries({ queryKey: [ 'users', updatedObj._id ] });
		},
	});

	const handleSelectOne = (event, id) => {
		const selectedIndex = selectedIds.indexOf(id);
		let newSelectedIds = [];

		if (selectedIndex === -1) {
			newSelectedIds = newSelectedIds.concat(selectedIds, id);
		} else if (selectedIndex === 0) {
			newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
		} else if (selectedIndex === selectedIds.length - 1) {
			newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelectedIds = newSelectedIds.concat(
				selectedIds.slice(0, selectedIndex),
				selectedIds.slice(selectedIndex + 1)
			);
		}

		setSelectedIds(newSelectedIds);
	};

	const handleSelectAll = (event) => {
		if (event.target.checked) {
			const newSelectedIds = rows.map((row) => row._id);
			setSelectedIds(newSelectedIds);
		} else {
			setSelectedIds([]);
		}
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleDeleteSelected = () => {
		// eslint-disable-next-line no-unused-vars
		const newRows = rows?.filter((row) => !selectedIds?.includes(row._id));
		setSelectedIds([]);
		// TODO: Handle deletion of selected rows
	};

	const handleToggle = (user) => {
		const promise = new Promise((resolve, reject) => {
			if (!user) {
				reject('Error user');
			} else {
				resolve('Execute API call next');
			}
		});

		promise
			.then(() => {
				setToggleValue(user._id);
			})
			.then(() => mutation.mutate(user))
			.catch(() => {
				throw new Error('Error mutation');
			});
	};

	const isSelected = (id) => selectedIds.indexOf(id) !== -1;
	const filteredRows = rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	return (
		<Box sx={{
			width: '100%',
			mt: 2, 
		}}>
			<Paper
				sx={{
					width: '100%',
					backgroundColor: palette?.white?.main,
					boxShadow: 'none',
					position: 'relative',
					height: '100%',
				}}>
				<EnhancedToolBar
					numSelected={selectedIds.length}
					selectedIds={selectedIds}
					setSelectedIds={setSelectedIds}
				/>
				{isLoading && <BackofficeLoader />}
				{isError && <Message code={'DEFAULT_ERROR'} img={true} />}
				{rows && (
					<>
						<div style={{
							width: '100%',
							padding: 'inherit',
							margin: 0,
							marginBottom: '100px',
							overflowX: 'auto',
						}}>
							<table>
								<thead>
									<tr className="custom__table-row" id="table-head">
										<th>
											<Checkbox
												indeterminate={selectedIds.length > 0 && selectedIds.length < rows.length}
												checked={selectedIds.length === rows.length}
												onChange={handleSelectAll}
												inputProps={{ 'aria-label': 'select all desserts' }}
											/>
										</th>
										<th>Name</th>
										<th>Email</th>
										<th>Handle</th>
										<th>Total Posts</th>
										<th>Moderator</th>
										<th>Account status</th>
									</tr>
								</thead>
								<tbody>
									{filteredRows?.map((row) => {
										const isItemSelected = isSelected(row._id);
										const userArticles = articles?.filter(
											(userArticle) => userArticle.id_profile == row.id_profile._id
										);
									
										return (
											<tr tabIndex={-1} key={row._id}>
												<td>
													<Checkbox
														checked={selectedIds.indexOf(row._id) !== -1}
														onChange={(event) => handleSelectOne(event, row._id)}
														selected={isItemSelected}
													/>
												</td>
												<td className="mod-id">
													{!row.id_profile?.file?.public_id ? <img src={avatar} alt="moderator avatar" /> : <AdvancedImage cldImg={new CloudinaryImage(row.id_profile?.file?.public_id, { cloudName: 'dbj8kfftk' })} />}
													<Typography variant="body1">{row.id_profile?.name}</Typography>
												</td>
												<td>
													<Typography variant="body1">{row.email}</Typography>
												</td>
												<td>
													<Typography variant="body1">{row.id_profile?.handle}</Typography>
												</td>
												<td>
													{userArticles?.length || 0}
												</td>
												<td>
													<ToggleButton
														value={row.isMod}
														selected={row.isMod}
														onChange={() => handleToggle(row)}
													/>
												</td>
												<td>
													<Typography variant="body1">
														{row.accountValidated ? (
															<CustomChip label="Confirmed" color={'blue'} />
														) : (
															<CustomChip label="Pending" color={'red'} />
														)}
													</Typography>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
						<TablePagination
							sx={{
								fontSize: '0.75rem',
								'& p': { marginBottom: '0 !important' }, 
							}}
							rowsPerPageOptions={[ 5, 10, 25 ]}
							component="div"
							count={rows?.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</>
				)}
			</Paper>
		</Box>
	);
};

export default ModsTable;
