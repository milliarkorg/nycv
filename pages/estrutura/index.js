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

//Animations
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
        height: auto;
    }
	  
`
const Left = styled.div`
	width: 70%;
    background: white;
    
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
     animation: 2s ${fadeInAnimation};

     @media (max-width: 600px) {
        margin-left: 20px;
        margin-right: 10px;
    }
`
const Title = styled.div`
	  font-size: 30px;
	  font-weight: 500;
	  margin-bottom: 7px;
	  font-family: ${props => props.theme.font};
	  color: ${props => props.theme.colors.nydark};
      text-transform: uppercase;
      
      @media (max-width: 600px) {
        font-size: 22px;
    }
`
const Desc = styled.div`
	  font-size: 22px;
	  margin-bottom: 30px;
      color: ${props => props.theme.colors.grey5};
      max-width: 700px;
      text-align: justify;

      @media (max-width: 600px) {
        font-size: 16px;
     }
`

const ButtonRow = styled.div`
      display: flex;

      @media (max-width: 600px) {
        padding-bottom: 10px;
     }
`
const BtnContato = styled.div`
	  cursor: pointer;
	  background:  ${props => props.theme.colors.nydark};
	  border-radius: 3px;
      padding: 20px 40px;
      
      & :hover{
          opacity: 0.9;
      }

      @media (max-width: 600px) {
        padding: 10px;
     }
`
const BtnTitle = styled.div`
	text-transform: uppercase;
	  font-size: 20px;
	  color: white;
      font-weight: 500;
      
      @media (max-width: 600px) {
        font-size: 14px;
     }
`
const BtnSubTitle = styled.div`
	  font-size: 14px;
	  color: white;
	  color: ${props => props.theme.colors.grey3};
	  text-align: center;
      font-weight: 500;
      
      @media (max-width: 600px) {
        display: none;
     }
`
const Right = styled.div`
    padding-top: 50px;
    overflow: auto;
    width: 30%;
    background:  ${props => props.theme.colors.nydark};

    @media (max-width: 600px) {
        width: 100%;
        overflow: visible;
    }
`
const AcomodItem = styled.div`
      margin-bottom: 30px;
      animation: 1.5s ${fadeInDownAnimation};
   
`
const AcomodTitle = styled.div`
      margin-left: 10px;
    font-size: 18px;
    color: white;
    margin-bottom: 15px;
    // text-align: center;
    font-weight: 500;
    text-transform: uppercase;
`
const AcomodCover = styled(Zmage)`
      width: 100%;
      height: 250px;
      object-fit: cover;
     
      & :hover{
        opacity: 0.9;
        }
`
const Cover = styled.img`
	object-fit: cover;
	height: 100%;
	width: 100%;
`


const piscinaSet = [
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny21.jpg?alt=media&token=8bbc6869-f6c8-43d9-8df1-213bc689d9f2", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny22.jpg?alt=media&token=955fc235-3776-4e24-9304-56bad13034e6", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny23.jpg?alt=media&token=9124c458-6444-4979-9272-4e86b28376b6", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny27.jpg?alt=media&token=3742db3f-e700-40b0-b58c-4f13b88e4de1", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny29.jpg?alt=media&token=781165ec-8780-406c-af4b-0d405f684710", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny32.jpg?alt=media&token=11529175-343d-40f5-81a4-d547235cfe02", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny34.jpg?alt=media&token=e5c84bc7-6206-4665-8eda-3cee64adfe55", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny37.jpg?alt=media&token=4cc6226a-0d8a-44a6-a598-3ac224a436f2", alt: "New York" },
   
]
const churrasqueiraSet = [
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny26.jpg?alt=media&token=4cc4ba93-7aa2-4586-bf5f-eb39f30d270d", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny24.jpg?alt=media&token=521e04c6-e539-47b8-9873-99e9ae4e6a32", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny36.jpg?alt=media&token=d2000cfa-b96f-4827-94cf-5334d6bceabc", alt: "New York" },
    
]
const garagemSet = [
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny28.jpg?alt=media&token=a536fc04-3aa9-400d-8d76-bb965738b259", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny30.jpg?alt=media&token=2387d2d3-e3a9-4985-b61b-497011370a1d", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny31.jpg?alt=media&token=d8b65d93-cc35-46e6-9322-2d65c58f7e79", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny33.jpg?alt=media&token=a099a3f8-8342-41bb-b169-7c6920317bcb", alt: "New York" },
    
]




const Estrutura = () => {

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
                        <Title>Estrutura</Title>

                        <Desc>
                        Quando a arte encontra o lugar perfeito, surge o residencial que você sempre quis.<br /><br />

                        Compacto, sem ser pequeno; bem localizado, sem ser caro; elegante, sem ser exagerado - o New York City Village conta com apartamentos contemporâneos com todo o requinte e sofisticação que você merece: ar condicionado; Smart TV em LED; refrigerador duplex; micro-ondas; pias esculpidas em mármore; móveis planejados; bancada para estudo; projeto luminotécnico diferenciado e paisagismo.<br /><br />

                        No empreendimento: segurança total com controle de acesso e circuito fechado de televisão; piscina; sauna; espaço gourmet; área de convivência; bicicletário; solarium; estacionamento e muito, muito verde. Rateio e luz a parte.<br /><br />
                        </Desc>

                        <ButtonRow>
                            <Link href='/contato'>
                                <BtnContato>
                                    <BtnTitle>Entre em Contato</BtnTitle>
                                    <BtnSubTitle>e agende sua visita</BtnSubTitle>
                                </BtnContato>
                            </Link>
                        </ButtonRow>
                    </Body>

				</Left>

				<Right>
                    <AcomodItem>
                        <AcomodTitle>Piscina</AcomodTitle>
                        <AcomodCover 
                            src='https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny21.jpg?alt=media&token=8bbc6869-f6c8-43d9-8df1-213bc689d9f2' alt='new york' 
                            set={piscinaSet}
                            preset='desktop'
                        />
                    </AcomodItem>
                    <AcomodItem>
                        <AcomodTitle>Churrasqueira</AcomodTitle>
                        <AcomodCover 
                            src='https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny26.jpg?alt=media&token=4cc4ba93-7aa2-4586-bf5f-eb39f30d270d' alt='new york' 
                            set={churrasqueiraSet}
                            preset='desktop'
                        />
                    </AcomodItem>
                    <AcomodItem>
                        <AcomodTitle>Garagens</AcomodTitle>
                        <AcomodCover 
                            src='https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny28.jpg?alt=media&token=a536fc04-3aa9-400d-8d76-bb965738b259' alt='new york' 
                            set={garagemSet}
                            preset='desktop'
                        />
                    </AcomodItem>
				</Right>
			
			</Columns>



		</MainStyle>
    )
  }
  
  export default Estrutura