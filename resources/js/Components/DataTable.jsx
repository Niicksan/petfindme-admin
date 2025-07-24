import { useState } from 'react';
import { router } from '@inertiajs/react';
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TablePagination,
	TableHead,
	TableRow,
	Typography,
	IconButton,
	Menu,
	MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function DataTable({
	title,
	columns,
	data,
	rowActions = [],
	onRowClick,
	rowStyle = () => ({})
}) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [menuItemId, setMenuItemId] = useState(null);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleMenuOpen = (event, itemId) => {
		setAnchorEl(event.currentTarget);
		setMenuItemId(itemId);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setMenuItemId(null);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleActionClick = (action, item) => {
		handleMenuClose();
		if (action.onClick) {
			action.onClick(item);
		}
	};

	return (
		<Box sx={{ p: 2 }}>
			<Typography variant="h4" gutterBottom>
				{title}
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow sx={{ backgroundColor: '#f5f5f5' }}>
							{columns.map((column) => (
								<TableCell key={column.key} align={column.align || 'left'}>
									{column.label}
								</TableCell>
							))}
							{rowActions.length > 0 && (
								<TableCell align="right">Actions</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((item) => (
								<TableRow
									key={item.id}
									sx={{
										...rowStyle(item),
										'& > *': { borderBottom: 'none' },
										mb: 1,
										cursor: onRowClick ? 'pointer' : 'default',
									}}
									onClick={() => onRowClick && onRowClick(item)}
								>
									{columns.map((column) => (
										<TableCell key={column.key} align={column.align || 'left'}>
											{column.render ? column.render(item[column.key], item) : item[column.key]}
										</TableCell>
									))}
									{rowActions.length > 0 && (
										<TableCell align="right">
											<IconButton
												aria-label="more"
												aria-controls={`menu-${item.id}`}
												aria-haspopup="true"
												onClick={(e) => {
													e.stopPropagation();
													handleMenuOpen(e, item.id);
												}}
											>
												<MoreVertIcon />
											</IconButton>
											<Menu
												id={`menu-${item.id}`}
												anchorEl={anchorEl}
												open={menuItemId === item.id}
												onClose={handleMenuClose}
											>
												{rowActions.map((action) => (
													action.label === 'Activate/Deactivate' ? (
														<MenuItem
															key={item.is_active ? 'Deactivate' : 'Activate'}
															onClick={() => handleActionClick(action, item)}
														>
															{item.is_active ? 'Deactivate' : 'Activate'}
														</MenuItem>
													) : (
														<MenuItem
															key={action.label}
															onClick={() => handleActionClick(action, item)}
														>
															{action.label}
														</MenuItem>
													)))}
											</Menu>
										</TableCell>
									)}
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
	);
} 