import React, { useState } from "react";

function DarkModeButton({setDarkMode, darkMode}) {
    const [animation,startAnimation] = useState(false)

    function darkAnimation(){
        setDarkMode(!darkMode)
        startAnimation(true)
    }

    return (
        <button onClick={darkAnimation} onAnimationEnd={() => startAnimation(false)} 
        className={animation?'darkanimation darkmode':'darkmode'}>
            <img src={darkMode?'moondarktheme.jpg':'moonlighttheme.jpg'}/>
        </button>
    )
}

export default DarkModeButton;