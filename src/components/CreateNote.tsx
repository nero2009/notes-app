import { ChangeEvent } from 'react';

interface Props {
	text: string;
	onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	onAddNote: () => void;
}

function CreateNote({ text, onTextChange, onAddNote }: Props) {
	const handleAddNote = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		onAddNote();
	};

	return (
		<form onSubmit={handleAddNote} className='note-form'>
			<textarea className='note-input' value={text} onChange={onTextChange} rows={10} placeholder='Write a Note.....' />
			<button className='note-button'>Add notes</button>
		</form>
	);
}

export default CreateNote;
