import React from 'react';
import "../scss/app.scss"
import { Navbar } from './navbar'
import TextArea from './textarea';
import Footer from './footer';
import { useRef, useState, useEffect } from 'react'


function App() {
  const [text, setText] = useState('');


  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = " ";
    document.body.className = theme;
  }, [theme]);
  return (

    <><Navbar toggleTheme={toggleTheme} isDark={theme === 'dark'} text={text} setText={setText} />
      <TextArea text={text} setText={setText} />
      <Footer />
    </>



  )


}
export default App;