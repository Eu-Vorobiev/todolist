import { useState, useContext, useCallback, useMemo } from 'react';
import ThemeContext from '../ThemeContext/ThemeContext';
import ChangeBackground from '../ChangeBackground/ChangeBackground';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import CurrentDate from '../CurrentDate/CurrentDate';
import './Header.css';

const Header = () => {
	const [hoverChangeBg, setHoverChangeBg] = useState(false);
	const [userBackground, setUserBackground] = useState(localStorage.getItem('background'));
	const { toggleTheme } = useContext(ThemeContext);

	const handleMouseEnter = useCallback(() => {
		const timer = setTimeout(() => {
			setHoverChangeBg(true);
		}, 200);
		return () => clearTimeout(timer);
	}, []);

	const handleMouseLeave = useCallback(() => setHoverChangeBg(false), []);

	const changeBG = useCallback((event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			const base64String = reader.result;
			localStorage.setItem('background', base64String);
			setUserBackground(base64String);
		};
	}, []);

	const resetBg = useCallback(() => {
		localStorage.removeItem('background');
		setUserBackground(null);
	}, []);

	const headerStyle = useMemo(() => (
		userBackground ? { style: { backgroundImage: `url(${userBackground})` } } : {}
	), [userBackground]);

	return (
		<header
			className="header"
			{...headerStyle}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<ChangeBackground hoverChangeBg={hoverChangeBg} changeBG={changeBG} resetBg={resetBg} />
			<ThemeToggler toggleTheme={toggleTheme} />
			<CurrentDate />
		</header>
	);
};

export default Header;