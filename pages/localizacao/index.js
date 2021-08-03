import { useEffect, useState, useContext } from 'react'
import styled , { keyframes } from 'styled-components'
import { MenuContext } from '../../components/context/menucontext'
import { fadeIn, fadeInDown } from 'react-animations';
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
    margin-right: 10px;
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
      font-size: 18px;
      line-height: 22px;
	  margin-bottom: 30px;
      color: ${props => props.theme.colors.grey5};
      max-width: 700px;
      text-align: justify;

      @media (max-width: 600px) {
        font-size: 16px;
     }
`
const EndRow = styled.div`
     display: flex;
     justify-content: space-between;
     max-width: 700px;   
     margin-bottom: 30px;
     align-items: center;
     
`
const EndText = styled.div`
    font-size: 22px;
    color: ${props => props.theme.colors.nydark};

    @media (max-width: 600px) {
        font-size: 16px;
     }
`
const EndBtn = styled.div`
    cursor: pointer;
    background: #C9A114;
    border-radius: 3px;
    padding: 10px 20px;
    color: white;

    @media (max-width: 600px) {
        font-size: 15px;
        padding: 10px 5px;
        text-align: center;
     }
`

const Right = styled.div`
	width: 30%;
    background: black;
    animation: 2s ${fadeInAnimation};

    @media (max-width: 600px) {
        width: 100%;
        height: 400px;
    }
`
const Cover = styled.img`
	object-fit: cover;
	height: 100%;
	width: 100%;
`
const RedoColumns = styled.div`
      display: flex;
      justify-content: space-between;
      max-width: 700px;

     
`
const Column = styled.div`

    @media (max-width: 600px) {
        margin-right: 3px;
    }

`
const RedondTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 30px;

    @media (max-width: 600px) {
        font-size: 16px;
    }
`
const RedoBox = styled.div`
    margin-bottom: 30px;
`
const RedoItem = styled.div`
    font-weight: bold;

    @media (max-width: 600px) {
        font-size: 14px;
    }
`
const RedoSubItem = styled.div`

    @media (max-width: 600px) {
        font-size: 14px;
    }

`









const redoFacul = [
    {local: 'Unicamp', dist:'600m | 2 min de carro | 8 min a pé'},
    {local: 'Facamp', dist:'2300m | 6 min de carro | 31 min a pé'},
    {local: 'Puccamp', dist:'3700m | 7 min de carro | 49 min a pé'}
]
const redoMercado = [
    {local: 'Dia%', dist:'700m | 2 min de carro | 8 min a pé'},
    {local: 'Pão de Açúcar', dist:'1100m | 5 min de carro | 14 min a pé'},
    {local: 'Pague Menos', dist:'1400m | 5 min de carro | 18 min a pé'}
]
const redoEmpresa = [
    {local: 'Venturus', dist:'xm | 2 min de carro | 8 min a pé'},
    {local: 'Eldorado', dist:'xm | 6 min de carro | 31 min a pé'},
    {local: 'Boldrini', dist:'xm | 7 min de carro | 49 min a pé.'},
    {local: 'Medley', dist:'xm | 7 min de carro | 49 min a pé.'},
    {local: 'Centro Médico', dist:'xm | 7 min de carro | 49 min a pé.'},
    {local: 'Samsung', dist:'xm | 7 min de carro | 49 min a pé.'},
    {local: 'CPQD', dist:'xm | 7 min de carro | 49 min a pé.'}
]




const Localizacao = () => {

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
                        <Title>Localização</Title>

                        <Desc>
                        O New York é um imóvel bem peculiar, quem vê sua fachada já se impressiona com os containers compondo o segundo andar do imóvel, ele está localizado entre as Avenidas Professor Atílio Martini (Av. 2) e Doutor Romeu Tórtima (Av. 1), sendo que fica mais próximo de Av. 2 do que da Av. 1 e também mais próximo da Unicamp do que do centro de Barão Geraldo.
                        </Desc>

                        <EndRow>
                            <EndText>Rua Dr. Luverci Pereira de Souza, 1430</EndText>
                            <a href='https://www.google.com/maps/place/R.+Luverci+Pereira+de+Souza,+1430+-+Cidade+Universit%C3%A1ria,+Campinas+-+SP,+13083-730/@-22.821714,-47.0756518,17z/data=!3m1!4b1!4m5!3m4!1s0x94c8c6b47297038f:0xa406f2cdd275899c!8m2!3d-22.821714!4d-47.0734631'>
                                <EndBtn>Abrir no Mapa</EndBtn>
                            </a>
                        </EndRow>

                        <RedondTitle>Nas Redondezas</RedondTitle>

                        <RedoColumns>
                            <Column>
                                <RedoBox>
                                    {redoFacul.map(item => 
                                        <>
                                        <RedoItem>{item.local}</RedoItem>
                                        <RedoSubItem>{item.dist}</RedoSubItem>
                                        </>
                                    )}
                                </RedoBox>
                                <RedoBox>
                                    {redoMercado.map(item => 
                                        <>
                                        <RedoItem>{item.local}</RedoItem>
                                        <RedoSubItem>{item.dist}</RedoSubItem>
                                        </>
                                    )}
                                </RedoBox>
                            </Column>

                            <Column>
                                <RedoBox>
                                    {redoEmpresa.map(item => 
                                        <>
                                        <RedoItem>{item.local}</RedoItem>
                                        <RedoSubItem>{item.dist}</RedoSubItem>
                                        </>
                                    )}
                                </RedoBox>
                            </Column>
                           
                           
                        </RedoColumns>

                        {/* <ButtonRow>
                            <BtnContato>
                                <BtnTitle>Entre em Contato</BtnTitle>
                                <BtnSubTitle>e agende sua visita</BtnSubTitle>
                            </BtnContato>
                        </ButtonRow> */}
                    </Body>

				</Left>

				<Right>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10622.700647050211!2d-47.07989642869378!3d-22.82131756108572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c6b47297038f%3A0xa406f2cdd275899c!2sR.%20Luverci%20Pereira%20de%20Souza%2C%201430%20-%20Cidade%20Universit%C3%A1ria%2C%20Campinas%20-%20SP%2C%2013083-730!5e0!3m2!1sen!2sbr!4v1581959288420!5m2!1sen!2sbr" width="100%" height="100%" frameborder="0" ></iframe>
				</Right>
			
			</Columns>



		</MainStyle>
    )
  }
  
  export default Localizacao