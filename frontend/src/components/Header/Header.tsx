import { StyledHeader } from '@/components/Header/Header.styled';
import { PAPER_PLANE_ICON } from '@/constants/images';
import Image from 'next/image';

function Header() {
  return (
    <StyledHeader>
      <Image
        className="paper-plane-icon"
        src={PAPER_PLANE_ICON}
        width={50}
        height={50}
        alt="teste"
      />

      <ul className="header-menu-list">
        <li className="header-menu-list-item selected">Voluntários</li>
        <li className="header-menu-list-item">Eventos</li>
        <li className="header-menu-list-item">Calendário</li>
      </ul>
    </StyledHeader>
  );
}

export default Header;
