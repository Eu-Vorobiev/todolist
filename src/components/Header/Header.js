import { useState, useContext } from 'react';
import ThemeContext from '../ThemeContext/ThemeContext';
import ChangeBackground from '../ChangeBackground/ChangeBackground';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import CurrentDate from '../CurrentDate/CurrentDate';
import './Header.css';

const Header = () => {
	const [hoverChangeBg, setHoverChangeBg] = useState(false);
    const [userBackground, setUserBackground] = useState(localStorage.getItem('background'));
	const { toggleTheme } = useContext(ThemeContext);

	const handleMouseEnter = () => {
		setTimeout(() => {
			setHoverChangeBg(true);
		}, 200);
	};

	const handleMouseLeave = () => setHoverChangeBg(false);
    
	const changeBG = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64String = reader.result;
            localStorage.setItem('background', base64String);
            setUserBackground(base64String);
        };
    };

	const resetBg = () => {
		localStorage.removeItem('background');
		setUserBackground(null);
	};

	return (
		<header
			className="header"
			{...(userBackground ? { style: { backgroundImage: `url(${userBackground})` } } : {})}
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
