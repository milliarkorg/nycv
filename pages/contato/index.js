import { useEffect, useState, useContext } from 'react'
import styled , { keyframes } from 'styled-components'
import { fadeIn, fadeInDown } from 'react-animations';
import { MenuContext } from '../../components/context/menucontext'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import firebase from 'firebase/app';
import "firebase/firestore";
import {Helmet} from "react-helmet";

const Zmage = dynamic(
	() => import('react-zmage'),
	{ ssr: false }
)

// Animations
const fadeInAnimation = keyframes`${fadeIn}`;
const fadeInDownAnimation = keyframes`${fadeInDown}`;


const MainStyle = styled.div`
    background: white;
	min-height: calc(100vh - (${props => props.theme.layout.navHeight} + ${props => props.theme.layout.footerHeight}));
    color: ${props => props.theme.colors.grey7};
    background: ${props => props.theme.colors.grey2};
    font-family: ${props => props.theme.font};

    @media (max-width: 600px) {

      }
`
const Columns = styled.div`
	display: flex;
	width: 100%;
    height: calc(100vh - (${props => props.theme.layout.navHeight} + ${props => props.theme.layout.footerHeight}));
    
    @media (max-width: 600px) {
        flex-direction: column;
    }
`
const Left = styled.div`
	width: 70%;
    background: white;
    height: 100%;

    
    
    @media (max-width: 600px) {
        width: 100%;
    }
`
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px;
	margin-bottom: 20px;
`
const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    width: 400px;
    align-items: center;
    font-weight: bold;
    color: ${props => props.theme.colors.grey5};
    margin-right: 70px;

    

    @media (max-width: 600px) {
        display: none;
    }
`
const MenuItem = styled.div`
    cursor: pointer;
    font-size: 14px;
    
`
const Logo = styled.img`
	cursor: pointer;
    width: 100px;
    
    @media (max-width: 600px) {
        width: 80px;
        height: 60px;
    }
`
const MenuBtn = styled.img`
    display: none;

    @media (max-width: 600px) {
        display: block;
        cursor: pointer;
        width: 30px;
    }
`
const Body = styled.div`
    margin-left: 40px;

    @media (max-width: 600px) {
        margin-left: 20px;
        margin-right: 10px;
    }


`

const Right = styled.div`
	width: 30%;
    background: black;
    
    @media (max-width: 600px) {
        display: none;

    }
`
const Cover = styled.img`
	object-fit: cover;
	height: 100%;
    width: 100%;
    animation: 2s ${fadeInAnimation};
`

const MainTitle = styled.div`
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    font-family: ${props => props.theme.font};
    margin-top: 100px;
    color: ${props => props.theme.colors.grey7};
    margin-bottom: 10px;

    @media (max-width: 600px) {
        font-size: 14px;
       }
`

const Txt1 = styled.div`
    font-size: 15px;
    text-align: center;
    margin-bottom: 50px;
    color: ${props => props.theme.colors.grey7};

    @media (max-width: 600px) {
        font-size: 16px;
       }
`

const Btn = styled.div`
    cursor: pointer;
    width: 250px;
    color: white;
    background: #C9A114;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 13px;
    font-family: ${props => props.theme.font};
    padding: 20px 10px 20px 10px;
    text-align: center;
    margin: 10px auto;
    animation: 2s ${fadeInDownAnimation};
`



const Contato = () => {

    const menuCtxValue = useContext(MenuContext);


    return (
		<MainStyle>
			<Helmet>
				<title>New York City village - Barão Geraldo - Campinas</title>
			</Helmet>

			<Columns>
				<Left>
					<Header>
                        <Link href='/'>
						    <Logo src='https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/logo%2Flogo.png?alt=media&token=85cf1b26-3d30-4a14-9e43-acf5e39a93a0' />
                        </Link>
                        <Menu>
                            <Link href='/acomodacoes'>
                                <MenuItem>Acomodações</MenuItem>
                            </Link>
                            <Link href='/localizacao'>
                                <MenuItem>Localização</MenuItem>
                            </Link>
                            <Link href='/estrutura'>
                                <MenuItem>Estrutura</MenuItem>
                            </Link>
                        </Menu>
                        <MenuBtn onClick={() => menuCtxValue.openMenu(true)} src='https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/icons%2Fmenu_24px_outlined.svg?alt=media&token=b1386e09-291b-4dd2-b6e0-0d83716a8f47' />
					</Header>
					

                    <Body>
                        <>
                            <MainTitle>ENTRE EM CONTATO COM O NEW YORK</MainTitle>
                            <Txt1>(11) 98881-3871</Txt1>

                            <a href={`tel:+55-11-988813871`}>
                                <Btn>Ligar</Btn>
                            </a>
                    
                            <a href={`https://wa.me/5511988813871?text=Olá,%20estou%20entrando%20em%20contato%20pelo%20site`} rel="noopener nofollower" target="_blank">
                            <Btn>Whatsapp</Btn>
                            </a>
                        
                            <a href={`mailto:claudiapaioletti@gmail.com`}>
                            <Btn>Email</Btn>
                            </a>
                        </>
                    </Body>

				</Left>

				<Right>
                    <Cover src='https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fnewyork%205.jpg?alt=media&token=dbe318aa-fe43-4169-9e56-5941744af54d' />
				</Right>
			
			</Columns>



		</MainStyle>
    )
  }
  
  export default Contato