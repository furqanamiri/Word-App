import React from 'react';
import "./styles.scss"

function Captcha({ setCaptchaText, captchatext }) {



  const recaptcha = () => {

    let retVal = "";
    let charset = "0123456789"
    let length = 4;
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    setCaptchaText(retVal)

  }

  return (<><div className='captchadiv'>
    <p>Captcha</p>
    <div className='captcha'>{captchatext}</div>
    <div><button onClick={recaptcha}><img src="./svg/refresh.svg" className='refreshicon' /></button></div></div>
  </>);



}
export default Captcha;