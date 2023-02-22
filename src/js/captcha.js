import React from 'react';
import "../scss/catpcha.scss"
function Captcha() {
  var captchatext = ""
  const captcha = () => {
    let retVal = "";
    let charset = "0123456789"
    let length = 4;
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    captchatext = retVal;

  }



  return (<>{captcha()}<div className='captchadiv'>
    <p>Captcha</p>
    <div className='captcha'>{captchatext}</div>
    <div><button onClick={captcha()}></button></div></div>
  </>);



}
export default Captcha;