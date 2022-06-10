import React, { useState } from "react";

function DarkModeButton({ setDarkMode, darkMode }) {
    const [animation, startAnimation] = useState(false)

    function darkAnimation() {
        setDarkMode(!darkMode)
        startAnimation(true)
    }

    return (
        <button onClick={darkAnimation} onAnimationEnd={() => startAnimation(false)}
            className={animation ? 'darkanimation darkmode' : 'darkmode'}>
            {
                darkMode ? (<svg xmlns="http://www.w3.org/2000/svg" className="darkicon" fill="none" viewBox="0 0 24 24" stroke="#8E2DE2" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="darkicon" fill="none" viewBox="0 0 24 24" stroke="#0AA1DD" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>)
            }
        </button>
    )
}

export default DarkModeButton;