interface Props {
	onDropNoteInTrash: () => void;
	isInDeleteArea: boolean;
	onDragOverDeleteArea: () => void;
	onDragLeave: () => void;
}

function Trash({ onDropNoteInTrash, isInDeleteArea, onDragOverDeleteArea, onDragLeave }: Props) {
	return (
		<div
			className='droppable'
			onDrop={onDropNoteInTrash}
			style={{ background: isInDeleteArea ? 'green' : 'red' }}
			onDragEnter={onDragOverDeleteArea}
			onDragLeave={onDragLeave}
		>
			<p>Delete</p>
		</div>
	);
}

export default Trash;
