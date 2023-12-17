import { useState } from "react";

import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types";
import { useSortable } from "@dnd-kit/sortable/";
import { CSS } from "@dnd-kit/utilities";

interface Props {
	task: Task;
	deleteTask: (id: Id) => void;
	updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
	const [mouseIsOver, setMouseIsOver] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: task.id,
		data: {
			type: "Task",
			task,
		},
		disabled: editMode,
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	const toggleEditMode = () => {
		setEditMode((prev) => !prev);
		setMouseIsOver(false);
	};

	if (isDragging) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				className="p-2.5
					opacity-40
					bg-gray-950/20
					min-h-[100px]
					max-h-[100px]
					items-center
					flex
					text-left
					rounded-xl
					border-4
					border-blue-900/60
					cursor-grab
					relative
            "
			/>
		);
	}

	if (editMode) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
				className="p-2.5
            bg-gray-950/20
            min-h-[100px]
            max-h-auto
            items-center
            flex
            text-left
            rounded-xl
            hover:ring-2
            hover:ring-inset
            hover:ring-blue-950/60
            cursor-grab
            relative
            "
			>
				<textarea
					className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
					value={task.content}
					autoFocus
					placeholder="Task content here"
					onBlur={toggleEditMode}
					onKeyDown={(e) => {
						if (e.key === "Enter" && e.shiftKey) toggleEditMode();
					}}
					onChange={(e) => updateTask(task.id, e.target.value)}
				></textarea>
			</div>
		);
	}
	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			onClick={toggleEditMode}
			className="p-2.5
            bg-gray-950/20
            min-h-[100px]
            max-h-[100px]
            items-center
            flex
            text-left
            rounded-xl
            hover:ring-2
            hover:ring-inset
            hover:ring-blue-950/60
            cursor-grab
            relative
            "
			onMouseEnter={() => {
				setMouseIsOver(true);
			}}
			onMouseLeave={() => {
				setMouseIsOver(false);
			}}
		>
			<p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
				{task.content}
			</p>
			{mouseIsOver && (
				<button
					onClick={() => {
						deleteTask(task.id);
					}}
					className=" absolute right-4 
            top-1/2 translate-y-1/3 p-2 bg-coloumnBackgroundColor
                stroke-gray-500 
                hover:stroke-red-900
                hover:bg-red-300
                rounded-md
                px-1
                py-2
                opacity-70
                hover:opacity-100
                "
				>
					<TrashIcon />
				</button>
			)}
		</div>
	);
}

export default TaskCard;
