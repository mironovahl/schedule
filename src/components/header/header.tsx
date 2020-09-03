import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import './header.scss';
import Logo from '../../../public/img/logo.png';

type TProps = { title: string };

const Header: React.FC<TProps> = (props: TProps) => {
  const { title } = props;
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/"><img src={Logo} alt="RS School logo" /></Link>
      </div>
      <div className="header__title">
        <b>{title}</b>
      </div>
      <Button type="dashed" size="large">
        <span>Student/Mentor</span>
      </Button>
    </header>
  );
};

export default Header;
