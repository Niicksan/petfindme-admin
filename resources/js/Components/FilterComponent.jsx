import React, { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import {
	Box,
	Paper,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Grid,
	Typography,
	Chip,
	Stack
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

export default function FilterComponent({
	filters = [],
	onFilterChange,
	initialFilters = {},
	title = "Filters"
}) {
	const [filterValues, setFilterValues] = useState(initialFilters);
	const [inputValues, setInputValues] = useState(initialFilters); // For immediate input updates
	const [activeFiltersCount, setActiveFiltersCount] = useState(0);
	const debounceTimeoutRef = useRef({});

	// Count active filters
	useEffect(() => {
		const count = Object.values(filterValues).filter(value =>
			value !== '' && value !== null && value !== undefined
		).length;
		setActiveFiltersCount(count);
	}, [filterValues]);

	// Debounced effect for text inputs
	useEffect(() => {
		// Clear any existing timeouts
		Object.values(debounceTimeoutRef.current).forEach(timeout => {
			if (timeout) clearTimeout(timeout);
		});

		// Set up debounced updates for text inputs
		filters.forEach(filter => {
			if (filter.type === 'text' || !filter.type) {
				const key = filter.key;
				const currentValue = inputValues[key];
				const filterValue = filterValues[key];

				// Only debounce if the input value differs from the filter value
				if (currentValue !== filterValue) {
					debounceTimeoutRef.current[key] = setTimeout(() => {
						performFilterUpdate(key, currentValue);
					}, 500); // 500ms delay
				}
			}
		});

		// Cleanup function
		return () => {
			Object.values(debounceTimeoutRef.current).forEach(timeout => {
				if (timeout) clearTimeout(timeout);
			});
		};
	}, [inputValues, filters, filterValues]);

	const performFilterUpdate = (key, value) => {
		const newFilters = { ...filterValues, [key]: value };
		setFilterValues(newFilters);

		// Update URL parameters
		const url = new URL(window.location);
		if (value === '' || value === null || value === undefined) {
			url.searchParams.delete(key);
		} else {
			url.searchParams.set(key, value);
		}

		// Reset to first page when filtering
		url.searchParams.set('page', '1');

		router.get(url.pathname + url.search, {}, {
			preserveState: true,
			preserveScroll: true
		});
	};

	const handleFilterChange = (key, value, filterType) => {
		// For text inputs, update inputValues immediately for UI responsiveness
		if (filterType === 'text' || !filterType) {
			setInputValues(prev => ({ ...prev, [key]: value }));
		} else {
			// For select inputs, update immediately
			performFilterUpdate(key, value);
		}
	};

	const handleClearFilters = () => {
		const url = new URL(window.location);
		filters.forEach(filter => {
			url.searchParams.delete(filter.key);
		});
		url.searchParams.set('page', '1');

		setFilterValues({});
		setInputValues({});

		// Clear any pending debounce timeouts
		Object.values(debounceTimeoutRef.current).forEach(timeout => {
			if (timeout) clearTimeout(timeout);
		});

		router.get(url.pathname + url.search, {}, {
			preserveState: true,
			preserveScroll: true
		});
	};

	const renderFilterField = (filter) => {
		const { key, label, type, options = [], placeholder } = filter;
		const value = filterValues[key] || '';
		const inputValue = inputValues[key] || '';

		switch (type) {
			case 'select':
				return (
					<FormControl key={key} fullWidth size="small">
						<InputLabel>{label}</InputLabel>
						<Select
							value={value}
							label={label}
							sx={{ minWidth: 200 }}
							onChange={(e) => handleFilterChange(key, e.target.value, type)}
						>
							<MenuItem value="">
								<em>All {label}s</em>
							</MenuItem>
							{options.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				);

			case 'text':
			default:
				return (
					<TextField
						key={key}
						fullWidth
						size="small"
						label={label}
						placeholder={placeholder || `Search by ${label.toLowerCase()}...`}
						value={inputValue}
						onChange={(e) => handleFilterChange(key, e.target.value, type)}
					/>
				);
		}
	};

	return (
		<Paper sx={{ mb: 2, p: 2 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<FilterListIcon />
					<Typography variant="h6">{title}</Typography>
					{activeFiltersCount > 0 && (
						<Chip
							label={activeFiltersCount}
							size="small"
							color="primary"
						/>
					)}
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					{activeFiltersCount > 0 && (
						<Button
							size="small"
							startIcon={<ClearIcon />}
							onClick={handleClearFilters}
							color="error"
						>
							Clear All
						</Button>
					)}
				</Box>
			</Box>

			<Grid container xs={12} columns={{ xs: 2, sm: 2, md: 4, lg: 4 }} spacing={2}>
				{filters.map((filter) => (
					<Grid item size={{ xs: 2, sm: 2, md: 2, lg: 1 }} key={filter.key}>
						{renderFilterField(filter)}
					</Grid>
				))}
			</Grid>

			{/* Active filters display */}
			{activeFiltersCount > 0 && (
				<Box sx={{ mt: 2 }}>
					<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
						Active filters:
					</Typography>
					<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
						{filters.map((filter) => {
							const value = filterValues[filter.key];
							if (!value || value === '') return null;

							// Convert string values to numbers for comparison if needed
							const option = filter.options?.find(opt => {
								const optValue = typeof opt.value === 'number' ? opt.value : parseInt(opt.value);
								const filterValue = typeof value === 'number' ? value : parseInt(value);
								return optValue === filterValue;
							});

							const displayValue = option ? option.label : value;
							return (
								<Chip
									key={filter.key}
									label={`${filter.label}: ${displayValue}`}
									size="small"
									onDelete={() => handleFilterChange(filter.key, '', filter.type)}
									color="primary"
									variant="outlined"
								/>
							);
						})}
					</Stack>
				</Box>
			)}
		</Paper>
	);
};