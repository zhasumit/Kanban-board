import { useState, useMemo } from "react";
import PlusIcon from "../icons/PlusIcon";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

function KanbanBoard() {
	const [columns, setColumns] = useState<Column[]>([]);
	const columsId = useMemo(() => columns.map((col) => col.id), [columns]);

	const [tasks, setTasks] = useState<Task[]>([]);

	const [activeColumn, setActiveColumn] = useState<Column | null>(null);
	const [activeTask, setActiveTask] = useState<Task | null>(null);

	// New Hook to sense the delete button from overall dragability
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 3,
				// 3px lag allowed
			},
		})
	);

	return (
		<div
			className=" 
				m-auto 
				flex 
				min-h-[93vh] 
				w-full 
				items-center 
				overflow-x-auto 
				overflow-y-hidden 
				px-[40px]"
		>
			{/* add context of dragging */}
			<DndContext
				sensors={sensors}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				onDragOver={onDragOver}
			>
				<div className="m-auto flex gap-4">
					<div className="flex gap-4">
						<SortableContext items={columsId}>
							{columns.map((col) => (
								<ColumnContainer
									key={col.id}
									column={col}
									deleteColumn={deleteColumn}
									updateColumn={updateColumn}
									createTask={createTask}
									tasks={tasks.filter(
										(task) => task.columnId === col.id
									)}
									deleteTask={deleteTask}
									updateTask={updateTask}
								/>
							))}
						</SortableContext>
					</div>
					<button
						onClick={() => {
							createNewColumn();
						}}
						className="h-[50px] 
					w-[300px] 
					min-w-[300px] 
					cursor-pointer 
					rounded-lg
					bg-mainBackgroundColor 
					border-2  
					items-center
					border-coloumnBackgroundColor 
					p-2 ring-green-500/3 hover:ring-2
					flex
					gap-2
					hover:bg-gray-900
					hover:text-green-400
					hover:border-green-950
					active:bg-gray-950
					border-x-coloumnBackgroundColor

					"
					>
						<PlusIcon />
						Add Coloumn
					</button>
				</div>

				{createPortal(
					<DragOverlay>
						{activeColumn && (
							<ColumnContainer
								column={activeColumn}
								deleteColumn={deleteColumn}
								updateColumn={updateColumn}
								createTask={createTask}
								tasks={tasks.filter(
									(task) => task.columnId === activeColumn.id
								)}
								deleteTask={deleteTask}
								updateTask={updateTask}
							/>
						)}
						{activeTask && (
							<TaskCard
								task={activeTask}
								deleteTask={deleteTask}
								updateTask={updateTask}
							/>
						)}
					</DragOverlay>,
					document.body
				)}
			</DndContext>
		</div>
	);

	function createNewColumn() {
		const columnToAdd: Column = {
			id: generateId(),
			title: `Column ${columns.length + 1}`,
		};
		setColumns([...columns, columnToAdd]);
	}

	function onDragStart(event: DragStartEvent) {
		if (event.active.data.current?.type === "Column") {
			setActiveColumn(event.active.data.current.column);
			return;
		}

		if (event.active.data.current?.type === "Task") {
			setActiveTask(event.active.data.current.task);
			return;
		}
	}

	function onDragEnd(event: DragEndEvent) {
		setActiveColumn(null);
		setActiveTask(null);

		const { active, over } = event;
		if (!over) return;
		const activeColumnId = active.id;
		const overColumnId = over.id;

		if (activeColumnId === overColumnId) return;
		{
			/* Swap the coloums otherwise */
		}
		setColumns((columns) => {
			const activeColumnIndex = columns.findIndex(
				(col) => col.id === activeColumnId
			);

			const overColumnIndex = columns.findIndex(
				(col) => col.id === overColumnId
			);

			return arrayMove(columns, activeColumnIndex, overColumnIndex);
		});
	}

	function onDragOver(event: DragOverEvent) {
		const { active, over } = event;
		if (!over) return;
		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return;

		const isActiveAtask = active.data.current?.type === "Task";
		const isOverAtask = over.data.current?.type === "Task";

		if (!isActiveAtask) return;

		// task over another task
		if (isActiveAtask && isOverAtask) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((t) => t.id === activeId);
				const overIndex = tasks.findIndex((t) => t.id === overId);

				tasks[activeIndex].columnId = tasks[overIndex].columnId;
				return arrayMove(tasks, activeIndex, overIndex);
			});
		}

		const isOverAColumn = over.data.current?.type === "Column";
		// task over another coloumn
		if (isActiveAtask && isOverAColumn) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((t) => t.id === activeId);

				tasks[activeIndex].columnId = overId;
				return arrayMove(tasks, activeIndex, activeIndex); // for array renderr of the tasks
			});
		}
	}

	function createTask(columnId: Id) {
		const newTask: Task = {
			id: generateId(),
			columnId,
			content: `Task ${tasks.length + 1}`,
		};
		setTasks([...tasks, newTask]);
	}

	function deleteTask(id: Id) {
		const newTasks = tasks.filter((task) => task.id !== id);
		setTasks(newTasks);
	}

	function updateTask(id: Id, content: string) {
		const newTasks = tasks.map((task) => {
			if (task.id !== id) return task;
			return { ...task, content };
		});
		setTasks(newTasks);
	}

	function updateColumn(id: Id, title: string) {
		const newColumns = columns.map((col) => {
			if (col.id !== id) return col;
			return { ...col, title };
		});
		setColumns(newColumns);
	}

	function deleteColumn(id: Id) {
		const filteredColumns = columns.filter((col) => col.id !== id);
		setColumns(filteredColumns);

		const newTasks = tasks.filter((t) => t.columnId !== id);
		setTasks(newTasks);
	}
	function generateId() {
		return Math.floor(Math.random() * 10001);
	}
}

export default KanbanBoard;
