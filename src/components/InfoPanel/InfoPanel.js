import './InfoPanel.css';

const InfoPanel = ({ tasks, totalTime }) => {
	return (
		<div className="info-panel">
			<span>Total tasks: {tasks.length}</span>
			<span>Total time: {totalTime}h</span>
		</div>
	);
};

export default InfoPanel;
