import './FilterPanel.css';

const FilterPanel = ({ changeFilter }) => {
	const statuses = ['all', 'in-progress', 'completed'];

    const handleFilterClick = e => {
        const buttons = document.querySelectorAll('.filter-panel__button');
        buttons.forEach(button => button.classList.remove('filter-panel__button--active'));
        e.currentTarget.classList.add('filter-panel__button--active');
    }
	return (
		<div className="filter-panel">
			<ul className="filter-panel__list">
                {statuses.map(status => {
					return (
                        <li key={status} >
							<button
                                className="filter-panel__button"
                                onClick={(e) => {
                                    handleFilterClick(e)
                                    changeFilter(status)
                                }}
							>
								{status}
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default FilterPanel;
