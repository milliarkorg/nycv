import { useEffect, useState, useContext} from 'react'
import styled , { keyframes } from 'styled-components'
import { fadeIn, fadeInDown, fadeInLeft } from 'react-animations';
import { MenuContext } from '../../components/context/menucontext'
import Link from 'next/link'
// import Drawer from 'rc-drawer';
import { slide as Menu } from 'react-burger-menu'



const fadeInDownAnimation = keyframes`${fadeInDown}`;



const Enclosure = styled.div`
    display: none;

    @media (max-width: 600px) {
        display: inherit;
    }
`

const MenuItem = styled.div`
    cursor: pointer;
    font-family: ${props => props.theme.font};
    font-size: 18px;
    margin-bottom: 15px;
    text-transform: uppercase;
    animation: 1s ${fadeInDownAnimation};
`
const Slogan = styled.div`
    margin-top: 20px;
	font-size: 16px;
	font-style: italic;
	align-self: center;
	// padding-right: 30px;
	color: ${props => props.theme.colors.grey5};
`



// Menu Styles
var menuStyles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '22px',
      height: '22px',
      right: '20px',
      top: '36px'
    },
    bmBurgerBars: {
      background: '#3C444D'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#3C444D',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.4)'
    }
  }




const SideMenu = () => {
    
  const menuCtxValue = useContext(MenuContext);

  const handleStateChange = (state) => {
        menuCtxValue.openMenu(state.isOpen)
    }


    return (
    <Enclosure>
        <Menu
            isOpen={menuCtxValue.isOpen}
            onStateChange={(state) => handleStateChange(state)}
            styles={ menuStyles }
            width={ '300px' }
            right
            customBurgerIcon={ false }
            disableAutoFocus
        >


            <Link href='/'>
                <MenuItem onClick={() => menuCtxValue.openMenu(false)}>Homepage</MenuItem>
            </Link>
            <Link href='/acomodacoes'>
                <MenuItem onClick={() => menuCtxValue.openMenu(false)}>Acomodações</MenuItem>
            </Link>
            <Link href='/localizacao'>
                <MenuItem onClick={() => menuCtxValue.openMenu(false)}>Localização</MenuItem>
            </Link>
            <Link href='/estrutura'>
                <MenuItem onClick={() => menuCtxValue.openMenu(false)}>Estrutura</MenuItem>
            </Link>
            <Link href='/contato'>
                <MenuItem onClick={() => menuCtxValue.openMenu(false)}>Contato</MenuItem>
            </Link>


            

            <Slogan>Quando a arte encontra o lugar perfeito, surge o residencial que você sempre quis.</Slogan>
           
        </Menu>
    </Enclosure>
  
    )
}


export default SideMenu;
