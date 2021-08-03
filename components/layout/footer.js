import styled from 'styled-components'
import Link from 'next/link'

const FooterCanvas = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: base-line;
    background: ${props => props.theme.colors.grey9}; 
    // background:  ${props => props.theme.colors.nydark};
    height: ${props => props.theme.layout.footerHeight};
    padding: 20px;
    font-family: ${props => props.theme.font};
    color: ${props => props.theme.colors.grey3}; 

    @media (max-width: 600px) {
        height: ${props => props.theme.layout.footerHeightMob}
    }
`
const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`
const Logo = styled.div`
    cursor: pointer;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;

    @media (max-width: 600px) {
		font-size: 13px;
    }
`
const Site = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    @media (max-width: 600px) {
		font-size: 13px;
    }
`
const Mb = styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: 600px) {
		font-size: 13px;
    }
`
const Slogan = styled.div`
    width: 300px;
    font-size: 15px;
    font-style: italic;
    color: ${props => props.theme.colors.grey3}; 

`


const Footer = () => {

    return (
            <FooterCanvas>
                {/* <Slogan>
                    Slogan
                </Slogan> */}
                <Menu>
                    <Link href='/'>
                        <Logo>new york</Logo>
                    </Link>
                    <Link href='/'>
                        <Site>nycv.com</Site>
                    </Link>
                    <a href='https://morandoembarao.com'>
                        <Mb>MB Studio</Mb>
                    </a>
                </Menu>
               
            </FooterCanvas>
    )
}


export default Footer;