import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function DataTable({
	title,
	columns,
	data,
	pagination,
	rowActions = [],
	onRowClick,
	rowStyle = () => ({})
}) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [menuItemId, setMenuItemId] = useState(null);

	// Use pagination data if available, otherwise fall back to client-side pagination
	const isServerPagination = pagination && pagination.data !== undefined;
	const currentPage = isServerPagination ? pagination.current_page - 1 : 0;
	const rowsPerPage = isServerPagination ? pagination.per_page : 10;
	const totalCount = isServerPagination ? pagination.total : data.length;

	const handleMenuOpen = (event, itemId) => {
		setAnchorEl(event.currentTarget);
		setMenuItemId(itemId);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setMenuItemId(null);
	};


	function TablePaginationActions(props) {
		const theme = useTheme();
		const { count, page, rowsPerPage, onPageChange } = props;

		const handleFirstPageButtonClick = (event) => {
			onPageChange(event, 0);
		};

		const handleBackButtonClick = (event) => {
			onPageChange(event, page - 1);
		};

		const handleNextButtonClick = (event) => {
			onPageChange(event, page + 1);
		};

		const handleLastPageButtonClick = (event) => {
			onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
		};

		return (
			<Box sx={{ flexShrink: 0, ml: 2 }}>
				<IconButton
					onClick={handleFirstPageButtonClick}
					disabled={page === 0}
					aria-label="first page"
					sx={{ pr: 0 }}
				>
					{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
				</IconButton>
				<IconButton
					onClick={handleBackButtonClick}
					disabled={page === 0}
					aria-label="previous page"
					sx={{ px: 0.5 }}
				>
					{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
				</IconButton>
				<IconButton
					onClick={handleNextButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="next page"
					sx={{ px: 0.5 }}
				>
					{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
				</IconButton>
				<IconButton
					onClick={handleLastPageButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="last page"
					sx={{ pl: 0 }}
				>
					{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
				</IconButton>
			</Box>
		);
	}

	const handleChangePage = (event, newPage) => {
		if (isServerPagination) {
			// Make a new request to the server with the new page
			const url = new URL(window.location);
			url.searchParams.set('page', newPage + 1);
			router.get(url.pathname + url.search);
		}
	};

	const handleChangeRowsPerPage = (event) => {
		const newRowsPerPage = +event.target.value;
		if (isServerPagination) {
			// Make a new request to the server with the new per_page
			const url = new URL(window.location);
			url.searchParams.set('per_page', newRowsPerPage);
			url.searchParams.set('page', 1); // Reset to first page
			router.get(url.pathname + url.search);
		}
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
						{(isServerPagination ? data : data.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage))
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
															sx={{ color: item.is_active ? 'warning.main' : 'success.main' }}
														>
															{item.is_active ? <VisibilityOffIcon sx={{ mr: 0.8 }} /> : <VisibilityIcon sx={{ mr: 0.8 }} />}
															{item.is_active ? 'Deactivate' : 'Activate'}
														</MenuItem>
													) : (
														<MenuItem
															key={action.label}
															sx={{ color: action.color }}
															onClick={() => handleActionClick(action, item)}
														>
															{action.icon}
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
				rowsPerPageOptions={[10, 25, 50, 100]}
				component="div"
				count={totalCount}
				rowsPerPage={rowsPerPage}
				page={currentPage}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				ActionsComponent={TablePaginationActions}
			/>
		</Box>
	);
} 