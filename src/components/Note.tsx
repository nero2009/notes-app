import { DragEvent } from 'react';
import { NoteObject } from '../types';

interface Props {
	note: NoteObject;
	onDragEnd: (e: DragEvent<HTMLDivElement>, id: string) => void;
	onStartDragNote: (e: DragEvent<HTMLDivElement>, id: string) => void;
}

function Note({ note, onDragEnd, onStartDragNote }: Props) {
	return (
		<div
			key={note.id}
			draggable='true'
			onDragEnd={(e) => onDragEnd(e, note.id)}
			className='note'
			onDragStart={(e) => onStartDragNote(e, note.id)}
			style={{ left: note.position.left, top: note.position.top, background: note.color }}
		>
			<p>{note.text}</p>
		</div>
	);
}

export default Note;
