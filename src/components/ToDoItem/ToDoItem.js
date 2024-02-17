import { useState } from 'react';
import './ToDoItem.css';

const ToDoItem = ({ task, onRemoveTask, onCompleteTask, onEditTask, onHoverTaskHandler }) => {
	const [editedTitle, setEditedTitle] = useState(task.title);
	const [editedDuration, setEditedDuration] = useState(task.duration);
	const [isEdit, setIsEdit] = useState(false);

    const handleEditBtnClick = () => { setIsEdit(!isEdit) }
	
    const handleEditTask = () => { onEditTask(editedTitle, editedDuration) };

	const handleBlur = () => { handleEditTask() };

	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			handleEditTask();
		}
	};

	const handleMouseEnter = () => { onHoverTaskHandler(true) };
	
	const handleMouseLeave = () => { onHoverTaskHandler(false) };

	const handleCompleteTask = () => {
		onCompleteTask();
		onHoverTaskHandler(false);
	};

	return (
		<li
			className={`todo-item ${task.completed ? 'completed' : ''}`}
			key={task.id}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="todo-item__title">
				{isEdit ? (
					<input
                        className="edit-input"
						type="text"
						value={editedTitle}
						onInput={e => setEditedTitle(e.currentTarget.value)}
						onBlur={handleBlur}
						onKeyPress={handleKeyPress}
					/>
				) : (
					task.title
				)}
				<span>at {task.date}</span>
			</div>
			<div className="todo-item__duration">
				{isEdit ? (
					<input
                        className="edit-input"
						type="number"
						value={editedDuration}
						onInput={e => setEditedDuration(parseInt(e.currentTarget.value))}
                        onBlur={handleBlur}
                        onKeyPress={handleKeyPress}
					/>
				) : (
					`${task.duration}h`
				)}
			</div>
			<label className="task-done" htmlFor="task-done">
				<input
					type="checkbox"
					name="task-done"
					checked={task.completed}
					onChange={handleCompleteTask}
				/>
				<span onClick={onCompleteTask}></span>
			</label>
			<button
				className="todo-item__remove"
				type="button"
				onClick={onRemoveTask}
			>
				<svg
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M2 6H22M10 11V16M14 11V16M4 6H20L18.42 20.22C18.3658 20.7094 18.1331 21.1616 17.7663 21.49C17.3994 21.8184 16.9244 22 16.432 22H7.568C7.07564 22 6.60056 21.8184 6.23375 21.49C5.86693 21.1616 5.63416 20.7094 5.58 20.22L4 6ZM7.345 3.147C7.50675 2.80397 7.76271 2.514 8.083 2.31091C8.4033 2.10782 8.77474 2 9.154 2H14.846C15.2254 1.99981 15.5971 2.10755 15.9176 2.31064C16.2381 2.51374 16.4942 2.80381 16.656 3.147L18 6H6L7.345 3.147V3.147Z"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
			<button
				className={`todo-item__edit ${task.isHover || isEdit ? 'todo-item__edit--active' : ''}`}
				type="button"
				onClick={handleEditBtnClick}
			>
				{isEdit ? (
					<svg
						viewBox="0 0 71 56"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M69.5783 0.996505C70.3592 1.69135 70.8323 2.66775 70.8936 3.71118C70.955 4.75462 70.5997 5.77975 69.9057 6.56135L27.8401 53.8881C27.47 54.3045 27.016 54.6378 26.5079 54.866C25.9997 55.0943 25.449 55.2123 24.892 55.2123C24.335 55.2123 23.7842 55.0943 23.2761 54.866C22.768 54.6378 22.3139 54.3045 21.9439 53.8881L0.91111 30.2247C0.25689 29.4378 -0.0658077 28.4273 0.0111851 27.4068C0.0881778 26.3863 0.558832 25.4357 1.32372 24.7558C2.08861 24.0759 3.08784 23.72 4.11032 23.7631C5.1328 23.8063 6.09845 24.2453 6.8033 24.9872L24.89 45.3338L64.0135 1.31991C64.7089 0.539627 65.6856 0.0672874 66.729 0.00664916C67.7724 -0.0539891 68.7972 0.302032 69.5783 0.996505Z"
						/>
					</svg>
				) : (
					<svg
						viewBox="0 0 72 71"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M50.5034 1.14984C51.2032 0.450265 52.1522 0.0572662 53.1417 0.0572662C54.1312 0.0572662 55.0802 0.450265 55.78 1.14984L70.7065 16.0764C71.4061 16.7762 71.7991 17.7252 71.7991 18.7147C71.7991 19.7042 71.4061 20.6532 70.7065 21.353L22.1952 69.8643C21.4955 70.5642 20.5465 70.9575 19.5569 70.9577H4.63033C3.64063 70.9577 2.69147 70.5646 1.99165 69.8647C1.29184 69.1649 0.898682 68.2158 0.898682 67.2261V52.2995C0.898893 51.3099 1.29219 50.3609 1.99205 49.6612L39.3085 12.3448L50.5034 1.14984ZM41.9468 20.2596L8.36197 53.8444V63.4944H18.012L51.5968 29.9096L41.9468 20.2596ZM56.8733 24.6331L62.7917 18.7147L53.1417 9.06466L47.2233 14.983L56.8733 24.6331Z"
						/>
					</svg>
				)}
			</button>
		</li>
	);
};

export default ToDoItem;
