import { useState, useContext, useCallback, useMemo, useRef, useEffect } from 'react';
import ThemeContext from '../ThemeContext/ThemeContext';
import ChangeBackground from '../ChangeBackground/ChangeBackground';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import CurrentDate from '../CurrentDate/CurrentDate';
import './Header.css';

const Header = () => {
	const [hoverChangeBg, setHoverChangeBg] = useState(false);
	const [userBackground, setUserBackground] = useState(localStorage.getItem('background'));
	const [showBGMessage, setShowBGMessage] = useState(false);
	const [countdown, setCountdown] = useState(3);
	const { toggleTheme } = useContext(ThemeContext);
	const timerRef = useRef(null);

	const handleMouseEnter = useCallback(() => {
		setShowBGMessage(true);
		setCountdown(3);
		timerRef.current = setInterval(() => {
			setCountdown(prevCountdown => prevCountdown - 1);
		}, 1000);
	}, []);

	const handleMouseLeave = useCallback(() => {
		clearTimeout(timerRef.current);
		setHoverChangeBg(false);
		setShowBGMessage(false);
		setCountdown(3);
	}, []);

	const changeBG = useCallback(event => {
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

	const headerStyle = useMemo(
		() => userBackground ? { style: { backgroundImage: `url(${userBackground})` } } : {},
		[userBackground]
	);

	useEffect(() => {
		if (countdown === 0) {
			setShowBGMessage(false);
			setHoverChangeBg(true);
			clearTimeout(timerRef.current);
		}
	}, [countdown]);

	return (
		<header
			className="header"
			{...headerStyle}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{showBGMessage && (
				<p className="header__change-bg-message" style={{ opacity: 1 }}>Keep mouse here {countdown} more second{ countdown > 1 && 's'} to change the background</p>
			)}
			<ChangeBackground
				hoverChangeBg={hoverChangeBg}
				changeBG={changeBG}
				resetBg={resetBg}
			/>
			<ThemeToggler toggleTheme={toggleTheme} />
			<CurrentDate />
		</header>
	);
};

export default Header;
