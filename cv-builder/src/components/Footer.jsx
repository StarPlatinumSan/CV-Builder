import { useState, useEffect } from "react";

export default function Footer() {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

    const handleThemeChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
      }, [theme]);

    return (
        <> 
        <footer className={`footer ${theme}`}>
            <div className={`background`}>
                <div className='author'>
                    <p>By <a className='nameAuthor text' href="https://github.com/StarPlatinumSan">StarPlatinumSan</a></p>
                </div>
                <div className="btnFooter">
                    <input type="checkbox" id="lightModeButton" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} checked={theme === 'light'} onChange={handleThemeChange} />
                </div>
            </div>
        </footer>
        </> 

    )
}