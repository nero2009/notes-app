import { ChangeEvent, DragEvent, useState } from 'react';
import { v4 } from 'uuid';
import CreateNote from './components/CreateNote';
import Note from './components/Note';
import './App.css';
import Trash from './components/Trash';
import { NoteObject } from './types';
import { NOTE_COLORS } from './constants';

function App() {
	const [notes, setNotes] = useState<NoteObject[]>([]);
	const [text, setText] = useState<string>('');
	const [activeDraggedNoteID, setActiveDraggedNoteID] = useState<string | undefined>(undefined);
	const [isInDeleteArea, setIsInDeleteArea] = useState<boolean>(false);

	const handleAddNote = () => {
		if (text.length <= 0) {
			return;
		}
		const noteObject: NoteObject = {
			id: v4(),
			text: text,
			position: {
				top: 100,
				left: 1000,
			},
			color: generateNoteColor(),
		};
		setNotes((notes) => [...notes, noteObject]);
		setText('');
	};

	const generateNoteColor = () => {
		return NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];
	};

	const handleDeleteNote = (id: string) => {
		setNotes((notes) => [...notes.filter((note) => note.id !== id)]);
	};

	const handleUpdateNotePosition = (id: string, left: number, top: number) => {
		const index = notes.findIndex((note) => note.id === id);
		const newNotes = [...notes];
		newNotes[index].position = { left, top };
		setNotes(newNotes);
	};

	const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const newText = e.target.value;
		setText(newText);
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.stopPropagation();
		e.preventDefault();
	};

	const handleDropNote = (e: DragEvent<HTMLDivElement>, id: string) => {
		handleUpdateNotePosition(id, e.pageX, e.pageY);
	};

	const handleDropNoteInTrash = () => {
		if (!activeDraggedNoteID) {
			throw new Error('No actively dragged note');
		}
		let id = activeDraggedNoteID;
		handleDeleteNote(id);
		setIsInDeleteArea(false);
	};

	const handleDragOverDeleteArea = () => {
		setIsInDeleteArea(true);
	};

	const handleStartDragNote = async (e: DragEvent<HTMLDivElement>, id: string) => {
		setActiveDraggedNoteID(id);
	};

	const handleDragLeave = async () => {
		setIsInDeleteArea(false);
	};

	return (
		<div className='app'>
			<div className='note-input-container'>
				<h1>Notes ({notes.length})</h1>
				<CreateNote onAddNote={handleAddNote} onTextChange={handleTextChange} text={text} />
			</div>
			<div className='notes' onDragOver={handleDragOver}>
				<h2>Notes</h2>
				{notes.map((note) => {
					return <Note key={note.id} note={note} onDragEnd={handleDropNote} onStartDragNote={handleStartDragNote} />;
				})}
				<Trash
					onDropNoteInTrash={handleDropNoteInTrash}
					isInDeleteArea={isInDeleteArea}
					onDragOverDeleteArea={handleDragOverDeleteArea}
					onDragLeave={handleDragLeave}
				/>
			</div>
		</div>
	);
}

export default App;
