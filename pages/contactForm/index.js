import { useState, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeInDown } from 'react-animations';
import { MenuContext } from '../../components/context/menucontext'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import firebase from '../../firebase';
import { Helmet } from "react-helmet";

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
const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledInput = styled.input`
  margin-top: 2vh;
  width: 20vw;
  height: 2.5vh;
  font-family: ${props => props.theme.font};

`

const StyledTextArea = styled.textarea`
  margin-top: 2vh;
  margin-bottom: 1.5vh;
  width: 20vw;
  height: 7vh;
  font-family: ${props => props.theme.font};

`
const Contato = () => {

  const menuCtxValue = useContext(MenuContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    const db = firebase.firestore().collection("contatosRecebidos")
    event.preventDefault();

    db.add({
      name: name,
      email: email,
      message: message,
    })
      .then(() => {
        alert("Recebemos sua mensagem, em breve entraremos em contato. ");
      })
      .catch((error) => {
        alert(error.message);
      });

    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <MainStyle>
      <Helmet>
        <title>New York City Village - Barão Geraldo - Campinas</title>
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
          <StyledFormWrapper>
            <h1>ENTRE EM CONTATO COM O NEW YORK</h1>
            <StyledFormWrapper>
              <StyledForm>
                <label htmlFor='name' />
                <StyledInput
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor='email' />
                <StyledInput
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='message' />
                <StyledTextArea
                  placeholder="Mensagem"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></StyledTextArea>
                <Btn onClick={handleSubmit}>Enviar</Btn>
              </StyledForm>
            </StyledFormWrapper>
          </StyledFormWrapper>

        </Left>

        <Right>
          <Cover src='https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fnewyork%205.jpg?alt=media&token=dbe318aa-fe43-4169-9e56-5941744af54d' />
        </Right>

      </Columns>



    </MainStyle>
  )
};
export default Contato


