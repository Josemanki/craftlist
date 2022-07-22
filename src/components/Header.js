import React from 'react'
import { Link } from 'react-router-dom'


  
let lang = 'en';

function setLang(langCode) {
  lang = langCode.target.id;
  console.log(langCode.target.id)
  document.getElementById('en').style.opacity = "0.5";
  document.getElementById('es').style.opacity = "0.5";
  document.getElementById('fr').style.opacity = "0.5";
  document.getElementById(langCode.target.id).style.opacity = "1";
}

function Header() {
  return (
      <header className="header">
        <div >
          <Link className="header__logo-link" to="/">
            <h1 className="header__title">Dofus</h1>
            <h1 className="header__title header__title--accent">Craftlist</h1>
          </Link>
        </div>
        <div style={{marginTop: '2px'}}>
          <div id="en" style={{display: 'inline-block', opacity: 1}} onClick={setLang}>
            <img
                id="en"
                width="40px"
                height="20px"
                alt="English"
                src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
                />
          </div>
          <div id="fr" style={{display: 'inline-block', opacity: 0.5}} onClick={setLang}>
            <img
                id="fr"
                width="40px"
                height="20px"
                alt="France"
                src="http://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg"/>
          </div>
          
          <div id="es" style={{display: 'inline-block', opacity: 0.5}} onClick={setLang}>
            <img 
                id="es"
                width="40px"
                height="20px"
                  alt="Spanish"
                  src="https://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg"/>
          </div>
        </div>
      </header>
      
  )


}

export {lang}
export default Header
