import './AddPanel.css';

const AddPanel = ({ title, duration, titleHandler, durationHandler, onAddTask, onKeyPressHandler, firstInputFocusRef }) => {
    const handleDurationChange = (event) => {
        let value = event.target.value;
        value = value.replace(/[^0-9.]/g, '');
        durationHandler({ ...event, target: { ...event.target, value } });
    };

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
                    type="text"
                    name="duration"
                    placeholder="0"
                    autoComplete='off'
                    title="Only numbers and dot"
                    value={duration}
                    onChange={handleDurationChange}
                    onKeyUp={onKeyPressHandler}
                />
            </label>
            <button type="button" onClick={onAddTask}>+</button>
        </div>
    );
}

export default AddPanel;