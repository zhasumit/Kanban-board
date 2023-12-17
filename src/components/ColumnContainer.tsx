import { useMemo, useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Column, Id, Task } from "../types";
import { SortableContext, useSortable } from "@dnd-kit/sortable/";
import { CSS } from "@dnd-kit/utilities";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

// properties of the col container
interface Props {
	column: Column;
	deleteColumn: (id: Id) => void;
	updateColumn: (id: Id, title: string) => void;

	createTask: (columnId: Id) => void;
	updateTask: (id: Id, content: string) => void;
	deleteTask: (id: Id) => void;
	tasks: Task[];
}

function ColumnContainer(props: Props) {
	const {
		column,
		deleteColumn,
		updateColumn,
		createTask,
		tasks,
		deleteTask,
		updateTask,
	} = props;

	const [editMode, setEditMode] = useState(false);

	const taskIds = useMemo(() => {
		return tasks.map((task) => task.id);
	}, [tasks]);
	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: column.id,
		data: {
			type: "Column",
			column,
		},
		disabled: editMode,
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	if (isDragging) {
		{
			/* Making a custom UI for drag time */
			return (
				<div
					ref={setNodeRef}
					style={style}
					className=" 
                    bg-coloumnBackgroundColor 
                    opacity-50
                    w-[300px]
                    h-[600px]
                    rounded-md
                    flex
                    flex-col
                    border-2
                    border-blue-500/30
                    "
				></div>
			);
		}
	}
	return (
		<div
			ref={setNodeRef}
			style={style}
			className=" 
        bg-coloumnBackgroundColor 
        w-[300px]
        h-[600px]
        rounded-lg
        flex
        flex-col
        "
		>
			{/* Title */}
			{/* since we wanna drag the col container  */}
			<div
				{...attributes}
				{...listeners}
				onClick={() => {
					setEditMode(true);
				}}
				className="
                bg-gray-950
                h-[60px]
                cursor-grab
                rounded-md
                rounded-b-none
                p-3
                font-bold
                border-coloumnBackgroundColor
                border-4
                flex
                items-center
                justify-between
            "
			>
				<div className="flex gap-2">
					{!editMode && column.title}
					{editMode && (
						<input
							autoFocus
							className="
                                bg-black
                                focus:border-blue-500/25
                                border-2
                                rounded
                                outline-none
                                py-1.5
                            "
							value={column.title}
							onChange={(e) =>
								updateColumn(column.id, e.target.value)
							}
							onBlur={() => {
								setEditMode(false);
							}}
							onKeyDown={(e) => {
								if (e.key !== "Enter") return;
								setEditMode(false);
							}}
						/>
					)}
				</div>
				<button
					onClick={() => {
						deleteColumn(column.id);
					}}
					className="
                stroke-gray-500 
                hover:stroke-red-900
                hover:bg-red-300
                rounded-md
                px-1
                py-2
                "
				>
					<TrashIcon />
				</button>
			</div>

			{/* Body*/}
			<div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
				<SortableContext items={taskIds}>
					{tasks.map((task) => (
						<TaskCard
							key={task.id}
							task={task}
							deleteTask={deleteTask}
							updateTask={updateTask}
						/>
					))}
				</SortableContext>
			</div>

			{/* Footer*/}
			<button
				className="flex 
                gap-2
                items-center 
                border-coloumnBackgroundColor
                border-2
                rounded-md 
                p-3
                border-x-coloumnBackgroundColor
                hover:bg-gray-900
                hover:text-green-400
                active:bg-gray-950
            "
				onClick={() => {
					createTask(column.id);
				}}
			>
				<PlusIcon />
				Add Task
			</button>
		</div>
	);
}

export default ColumnContainer;
