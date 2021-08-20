import React from 'react';

import Avatar from '../../assets/images/avatar.png';

const Header = () => {
  return (
    <header className="container header">
      <div className="avatar-wrapper">
        <img src={Avatar} className="avatar" alt="avatar" />
      </div>
      <div className="avatar-info">
        <p className="avatar-name">CaptainStephen</p>
        <div className="avatar-role">
          <svg className="icon">
            <use xlinkHref="/img/sprite.svg#snow-mark" />
          </svg>
          <svg className="icon">
            <use xlinkHref="/img/sprite.svg#snow-mark" />
          </svg>
          <svg className="icon">
            <use xlinkHref="/img/sprite.svg#snow-mark" />
          </svg>
          <svg className="icon">
            <use xlinkHref="/img/sprite.svg#snow-mark" />
          </svg>
          <span>Offizier</span>
        </div>
      </div>
      <div className="page-title">
        <h1 className="title">Flaschenpiraten Business Account</h1>
      </div>
      <button type="button" className="btn btn--primary btn-logout">logout</button>
    </header>
  )
}

export default Header;