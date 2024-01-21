import { useState } from 'react';
import './FilterPanel.css';

const FilterPanel = ({ changeFilter }) => {
    const statuses = ['all', 'in-progress', 'completed'];
    const [activeFilter, setActiveFilter] = useState('all');

    const handleFilterClick = (status) => {
        setActiveFilter(status);
        changeFilter(status);
    }
	return (
		<div className="filter-panel">
			<ul className="filter-panel__list">
                {statuses.map(status => {
					return (
                        <li key={status} >
							<button
                                className={`filter-panel__button ${activeFilter === status ? 'filter-panel__button--active' : ''}`}
                                onClick={() => handleFilterClick(status)}
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
