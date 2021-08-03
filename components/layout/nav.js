import styled from 'styled-components'
import Link from 'next/link'



const NavStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    height: ${props => props.theme.layout.navHeight};
    font-family: ${props => props.theme.font};
    padding: 0px 20px;
    overflow: hidden;

    @media (max-width: 600px) {
        height: ${props => props.theme.layout.navHeightMob}
        // height: 100px;
    }
`
const LogoBox = styled.div`
   dispaly: flex;
   align-items: center;
   
`
const ItemsBox = styled.div`
   display: flex;
   align-items: center;
`
const LogoStyle = styled.div`
    font-family: ${props => props.theme.font};
    cursor: pointer;
    font-weight: 500;
    width: 200px;
    // height: 100px;
    text-transform: uppercase;
    font-size: 22px;

    @media (max-width: 600px) {
        font-size: 15px;
    }
`
const Slogan = styled.div`
    color: ${props => props.theme.colors.grey4};
    width: 300px; 
    font-style: italic;
    font-size: 15px;

    @media (max-width: 600px) {
        // display: none;
        font-size: 13px;
        width: 150px;
    }
    
`
const ItemStyle = styled.div`
    cursor: pointer;
    font-family: ${props => props.theme.font};
    text-transform: uppercase;
    background: ${props => props.background === true ? props.theme.colors.yellow : null};
    padding: 5px;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 500;
    color: ${props => props.theme.colors.grey6};
    margin: 0 10px;

    @media (max-width: 600px) {
        display: none;
        font-size: 12px;
        margin: 0 0px;
        text-align: center;
    }
`
const ContatoDesk = styled.div`
    cursor: pointer;
    font-family: ${props => props.theme.font};
    text-transform: uppercase;
    background: ${props => props.background === true ? props.theme.colors.yellow : null};
    padding: 5px;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 500;
    color: ${props => props.theme.colors.grey6};
    margin: 0 10px;

    @media (max-width: 600px) {
        display: none;
    }
`
const ContatoMobile = styled.div`
    cursor: pointer;
    font-family: ${props => props.theme.font};
    text-transform: uppercase;
    background: ${props => props.background === true ? props.theme.colors.yellow : null};
    padding: 10px 5px;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 500;
    color: ${props => props.theme.colors.grey6};
    margin: 0 10px;

    @media (max-width: 600px) {
        font-size: 12px;
    }
`



const Nav = () => {
    // const [activeItem, setActiveItem] = useState('Inicial');


    return (
            <NavStyle>
                {/* <Drawer>
                    <div>oi</div>
                </Drawer> */}
                <LogoBox>
                    <Link href='/'>
                        <LogoStyle>Logo</LogoStyle>
                    </Link>
                    <Slogan>Slogan</Slogan>
                </LogoBox>
                <ItemsBox>
                    <Link href={`/dynamic/[id]`} as={`/dynamic/oi`}>
                        <ItemStyle>Menu 1</ItemStyle>
                    </Link>
                    <Link href={`/dynamic/[id]`} as={`/dynamic/tchau`}>
                        <ItemStyle>Menu 2</ItemStyle>
                    </Link>
                    {/* <Link href='/contato'>
                        <ContatoDesk background={true}>Entre em Contato</ContatoDesk>
                    </Link> */}
                    <Link href='/contato'>
                        <ContatoMobile background={true}>Contato</ContatoMobile>
                    </Link>
                    
                </ItemsBox>
            </NavStyle>
    )
}


export default Nav;