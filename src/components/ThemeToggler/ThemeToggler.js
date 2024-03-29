import './ThemeToggler.css';

const ThemeToggler = ({ toggleTheme }) => {
	return (
		<label
			htmlFor="theme-toogler"
			className="theme-toggler"
			title="Switch the theme"
			onMouseOver={(event) => event.stopPropagation()}
			onMouseOut={(event) => event.stopPropagation()}
		>
			<input
				type="checkbox"
				name="theme-toogler"
				id="theme-toogler"
				onChange={toggleTheme}
			/>
			<span></span>
		</label>
	);
};

export default ThemeToggler;
