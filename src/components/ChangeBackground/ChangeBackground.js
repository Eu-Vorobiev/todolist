import './ChangeBackground.css';

const ChangeBackground = ({ hoverChangeBg, changeBG, resetBg }) => {
	return (
		<div className={`background-switch ${hoverChangeBg ? 'active' : ''}`}>
			<label htmlFor="file">
				<input
					type="file"
					id="file"
					accept="image/*"
					onChange={e => changeBG(e)}
				/>
				<span>You can choose a new background</span>
			</label>
			<button className="background-switch__reset" onClick={resetBg}>
				Reset to default
			</button>
		</div>
	);
};

export default ChangeBackground;
