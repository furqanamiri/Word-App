import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha
} from 'react-google-recaptcha-v3';
export function GoogleCaptcha() {
  const { captchaIsDone, setCaptchaIsDone } = useState(false);
  function onChange() {
    setCaptchaIsDone(true)
    console.log('captcha works')
  }
  const key = "6LdyDKkkAAAAANj7mmTaSe5Lly2525v83YNcy1cT"
  return (<>
    <ReCAPTCHA
      sitekey={key}
      onChange={onChange}
    />
  </>

  );
}