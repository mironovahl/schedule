import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import SettingsContext from '../../context/settings-context';

import './header.scss';
import Logo from '../../../public/img/logo.png';

type TProps = { title: string };

const Header: React.FC<TProps> = (props: TProps) => {
  const { title } = props;
  const { user, changeContext } = useContext(SettingsContext);

  const handleUserChange = (): void => {
    if (user === 'student') changeContext({ user: 'mentor' });
    if (user === 'mentor') changeContext({ user: 'student' });
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/"><img src={Logo} alt="RS School logo" /></Link>
      </div>
      <div className="header__title">
        <b>{title}</b>
      </div>
      <Button type="dashed" size="large" onClick={handleUserChange}>
        <span>{user}</span>
      </Button>
    </header>
  );
};

export default Header;
