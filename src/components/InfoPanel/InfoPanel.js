import './InfoPanel.css';

function InfoPanel({tasks }) {
  return ( 
    <div className="info-panel">
      <span>Total taks: {tasks.length}</span>
      <span>Total time: </span>
    </div>
  );
}

export default InfoPanel;