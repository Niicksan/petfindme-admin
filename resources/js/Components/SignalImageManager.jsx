import { useState, useEffect } from 'react';
import {
	Box,
	Paper,
	Typography,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ImageIcon from '@mui/icons-material/Image';

function formatFileSize(bytes) {
	if (!bytes || bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function getFileNameFromPath(path) {
	if (!path) return 'Unknown';
	const parts = path.split('/');
	return parts[parts.length - 1] || 'Unknown';
}

export const SignalImageManager = ({ images = [], onChange }) => {
	const [localImages, setLocalImages] = useState(images);
	const [draggedIndex, setDraggedIndex] = useState(null);
	const [dragOverIndex, setDragOverIndex] = useState(null);

	useEffect(() => {
		setLocalImages(images);
	}, [images]);

	const commit = (next) => {
		const withOrder = next.map((image, index) => ({
			...image,
			order: index,
		}));
		setLocalImages(withOrder);
		onChange(withOrder);
	};

	const handleDragStart = (e, index) => {
		setDraggedIndex(index);
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', e.currentTarget);
	};

	const handleDragOver = (e, index) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
		if (draggedIndex !== index) {
			setDragOverIndex(index);
		}
	};

	const handleDragLeave = () => {
		setDragOverIndex(null);
	};

	const handleDrop = (e, dropIndex) => {
		e.preventDefault();
		e.stopPropagation();

		if (draggedIndex === null || draggedIndex === dropIndex) {
			setDraggedIndex(null);
			setDragOverIndex(null);
			return;
		}

		const newImages = [...localImages];
		const draggedImage = newImages[draggedIndex];
		newImages.splice(draggedIndex, 1);
		newImages.splice(dropIndex, 0, draggedImage);

		setDraggedIndex(null);
		setDragOverIndex(null);
		commit(newImages);
	};

	const handleDelete = (index) => {
		const next = localImages.filter((_, i) => i !== index);
		commit(next);
	};

	const handleAddImage = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.multiple = true;

		input.onchange = (e) => {
			const files = Array.from(e.target.files || []);
			const newImageObjects = files.map((file) => ({
				id: `new-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
				path: file.name,
				size: file.size,
				isNew: true,
				file,
				preview: URL.createObjectURL(file),
			}));
			commit([...localImages, ...newImageObjects]);
		};

		input.click();
	};

	return (
		<Box>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
				<Typography variant="subtitle1">Images</Typography>
				<Button
					variant="outlined"
					startIcon={<AddPhotoAlternateIcon />}
					onClick={handleAddImage}
					size="small"
				>
					Add images
				</Button>
			</Box>

			{localImages.length === 0 ? (
				<Paper
					variant="outlined"
					sx={{
						p: 4,
						textAlign: 'center',
						backgroundColor: '#fafafa',
						minHeight: 100,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Typography variant="body2" color="text.secondary">
						No images. Use &quot;Add images&quot; to upload one or more files.
					</Typography>
				</Paper>
			) : (
				<Paper variant="outlined">
					<List sx={{ p: 0 }}>
						{localImages.map((image, index) => {
							const imageUrl = image.preview || (image.path ? `/storage/${image.path}` : null);
							const fileName = getFileNameFromPath(image.path);
							const fileSize = formatFileSize(image.size);
							const isDragging = draggedIndex === index;
							const isDragOver = dragOverIndex === index;

							return (
								<Box key={String(image.id)}>
									<ListItem
										sx={{
											backgroundColor: isDragOver ? 'action.hover' : 'transparent',
											opacity: isDragging ? 0.5 : 1,
											cursor: 'move',
											'&:hover': {
												backgroundColor: 'action.hover',
											},
										}}
										draggable
										onDragStart={(e) => handleDragStart(e, index)}
										onDragOver={(e) => handleDragOver(e, index)}
										onDragLeave={handleDragLeave}
										onDrop={(e) => handleDrop(e, index)}
									>
										<DragHandleIcon
											sx={{
												color: 'text.secondary',
												cursor: 'grab',
												mr: 1,
												'&:active': {
													cursor: 'grabbing',
												},
											}}
										/>
										<ListItemAvatar>
											<Avatar
												variant="rounded"
												sx={{
													width: 80,
													height: 80,
													bgcolor: 'grey.200',
												}}
												src={imageUrl}
											>
												<ImageIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={fileName}
											secondary={fileSize}
											sx={{
												color: 'text.secondary',
												fontWeight: 500,
												ml: 1,
											}}
										/>
										<IconButton
											edge="end"
											aria-label="delete"
											onClick={() => handleDelete(index)}
											color="error"
											size="small"
										>
											<DeleteIcon />
										</IconButton>
									</ListItem>
									{index < localImages.length - 1 && <Divider />}
								</Box>
							);
						})}
					</List>
				</Paper>
			)}
		</Box>
	);
};
