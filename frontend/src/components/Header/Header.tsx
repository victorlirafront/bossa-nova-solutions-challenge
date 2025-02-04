import { StyledHeader } from '@/components/Header/Header.styled';
import { PAPER_PLANE_ICON } from '@/constants/images';
import Image from 'next/image';
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <StyledHeader data-aos="fade-down" data-aos-offset="0" data-aos-delay="100">
      <div className="container">
        <div className="paper-plane-wrapper" onClick={handleHomeClick}>
          <Image
            className="paper-plane-icon"
            src={PAPER_PLANE_ICON}
            width={50}
            height={50}
            alt="Avião de papel icone"
          />
          <p className="home">Home</p>
        </div>

        <ul className="header-menu-list">
          <li className="header-menu-list-item selected" onClick={handleHomeClick}>
            Voluntários
          </li>
        </ul>
      </div>
    </StyledHeader>
  );
}

export default Header;
