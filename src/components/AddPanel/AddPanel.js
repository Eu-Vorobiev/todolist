import './AddPanel.css';

export default function AddPanel({ title, duration, titleHandler, durationHandler, onAddTask, onKeyPressHandler, firstInputFocusRef }) {
    return (
        <div className="todo-add">
            <label htmlFor="task">
                <input
                    type="text"
                    name="task"
                    placeholder="Task"
                    value={title}
                    onChange={titleHandler}
                    onKeyUp={onKeyPressHandler}
                    ref={firstInputFocusRef}
                />
            </label>
            <label htmlFor="duration">
                <input
                    type="number"
                    name="duration"
                    placeholder="0"
                    autoComplete='off'
                    value={duration}
                    onChange={durationHandler}
                    onKeyUp={onKeyPressHandler}
                />
            </label>
            <button type="button" onClick={onAddTask}>+</button>
        </div>
    );
}