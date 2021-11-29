import { useEffect, useState, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeInDown, fadeInLeft, shake, zoomInUp } from 'react-animations';
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { MenuContext } from '../../components/context/menucontext'
import firebase from 'firebase/app';
import "firebase/firestore";
import { Helmet } from "react-helmet";
import Modal from 'react-modal';

const Zmage = dynamic(
    () => import('react-zmage'),
    { ssr: false }
)


// Animations
const fadeInAnimation = keyframes`${fadeIn}`;
const fadeInLeftAnimation = keyframes`${fadeInLeft}`;
const fadeInDownAnimation = keyframes`${fadeInDown}`;
const shakeAnimation = keyframes`${shake}`;
const zoomInUpAnimation = keyframes`${zoomInUp}`;


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
    display: flex;
    flex-direction: column;
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
      justify-content: space-between;
      margin-right: 40px;
      margin-bottom: 20px;

`
const BtnsLeft = styled.div`
      display: flex;
`
const BtnYellow = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    text-align: center;
    margin-right: 15px;
    font-size: 20px;
    color: white;
    background: #C9A114;
    border-radius: 3px;
    padding: 20px 40px;
    text-transform: uppercase;

    & :hover {
		opacity: 0.9;
    }
    
    @media (max-width: 600px) {
       font-size: 14px;
       padding: 10px;
    }
`

const BtnContato = styled.div`
	  cursor: pointer;
	  background:  ${props => props.theme.colors.nydark};
	  border-radius: 3px;
      padding: 20px 40px;
      text-align: center;

    & :hover {
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
	  color: ${props => props.theme.colors.grey3};
	  text-align: center;
      font-weight: 500;

      @media (max-width: 600px) {
        display: none;
     }
`
const Right = styled.div`
    padding-top: 20px;
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
      animation: 1.5s ${fadeInLeftAnimation};
   
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

      & :hover {
          opacity: 0.8;
      }
   
`
// const Cover = styled.img`
// 	object-fit: cover;
// 	height: 100%;
// 	width: 100%;
// `

const FecharModalBtn = styled.div`
	display: flex;
	cursor: pointer;
	font-family: ${props => props.theme.font};
	justify-content: center;
	text-transform: uppercase;
    background:  ${props => props.theme.colors.nydark};
	color: white;
	padding: 15px;
`
const Iframe = styled.iframe`
	width: 80vw;
	height: 70vh;
	max-width: 1200px;
`

const layout1Set = [
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny1.jpg?alt=media&token=5783fa7c-ca72-4658-9fe3-cfa78e58f990", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny5.jpg?alt=media&token=3e13276f-d4be-4a6c-a03d-0ff9ff9492f9", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny7.jpg?alt=media&token=d3f3075c-1024-4328-a908-743f04d1960c", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny2.jpg?alt=media&token=4452b438-4f9b-447c-b627-c859fbbf9481", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny3.jpg?alt=media&token=96c28647-85f2-4b58-811b-2f855d7e9f3b", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny4.jpg?alt=media&token=97fba357-eb2f-42d9-bb5e-fb085c148204", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny8.jpg?alt=media&token=46c85484-f3e3-4e1e-9d59-7cc1674a01f5", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny10.jpg?alt=media&token=1d13124b-f4c4-4401-80ee-d1b66e000147", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny11.jpg?alt=media&token=8ae95831-a0c8-41f3-b41c-4d972d5106fd", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny12.jpg?alt=media&token=cb82b268-6aa6-4bf9-828e-86dc9f43f954", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny13.jpg?alt=media&token=78546155-7ba6-4417-9169-b671895e11f2", alt: "New York" },
]
const layout2Set = [
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny14.jpg?alt=media&token=f4f3a6ed-1010-4adf-83a5-dbfcd2369944", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny15.jpg?alt=media&token=032172f5-f03b-4925-96b1-d6cbbdca668e", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny16.jpg?alt=media&token=5c3f9b1a-60e4-4c42-baf4-1ce800c88b60", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny18.jpg?alt=media&token=f6861be0-49bd-401b-99b8-29facc5bff97", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny19.jpg?alt=media&token=bdb0406c-a4c1-4e1d-851a-6028ec7f2db9", alt: "New York" },
    { src: "https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny20.jpg?alt=media&token=0abc84c5-6b6c-427d-a1e3-b00c4b08a236", alt: "New York" },
]

const layout3Set = [
    { src: "https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/fotos_site%2Fbicicletario.jpeg?alt=media&token=38bb06fa-ee28-420f-a366-65dbb05cb15e", alt: "bicicletario" },
    { src: "https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/fotos_site%2Fchurrasqueira.jpeg?alt=media&token=d8dd698f-c641-4738-aba7-9c39619ff91a", alt: "churrasqueira" },
    { src: "https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/fotos_site%2Fpiscina_sauna.jpeg?alt=media&token=45a0006a-54fc-4465-8079-f84806217c63", alt: "piscina_sauna" },
    { src: "https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/fotos_site%2Fsauna.jpeg?alt=media&token=0e457df7-6107-4746-b873-ca5b1a2f3497", alt: "sauna" },
    { src: "https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/fotos_site%2Fsolarium.jpeg?alt=media&token=418daaa3-073b-4fb0-a5b3-e06c48cf200e", alt: "solarium" },
    { src: "https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/fotos_site%2Fsolarium1.jpeg?alt=media&token=70251262-4973-42f4-b9a8-31e11858b5bf", alt: "solarium" },
]


const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};




const Acomodacoes = () => {

    const [modalOpen, setModalOpen] = useState();
    const [type, setType] = useState();
    const menuCtxValue = useContext(MenuContext);



    const openModal = (type) => {
        setModalOpen(true)
        setType(type)
    }

    const closeModal = () => {
        setModalOpen(false)

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


                    <Body>
                        <Title>Acomodações</Title>

                        <Desc>
                            Quando a arte encontra o lugar perfeito, surge o residencial que você sempre quis.<br /><br />

                            Compacto, sem ser pequeno; bem localizado, sem ser caro; elegante, sem ser exagerado - o New York City Village conta com apartamentos contemporâneos com todo o requinte e sofisticação que você merece: ar condicionado; Smart TV em LED; refrigerador duplex; micro-ondas; pias esculpidas em mármore; móveis planejados; bancada para estudo; projeto luminotécnico diferenciado e paisagismo.<br /><br />

                            No empreendimento: segurança total com controle de acesso e circuito fechado de televisão; piscina; sauna; espaço gourmet; área de convivência; bicicletário; solarium; estacionamento e muito, muito verde. Rateio e luz a parte. <br /><br />
                        </Desc>

                        <ButtonRow>
                            <BtnsLeft>
                                <BtnYellow onClick={() => openModal('tour')}>Tour Virtual</BtnYellow>
                                <BtnYellow onClick={() => openModal('video')}>Videos</BtnYellow>
                            </BtnsLeft>
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
                        <AcomodTitle>Layout 1</AcomodTitle>
                        <AcomodCover
                            src='https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny1.jpg?alt=media&token=5783fa7c-ca72-4658-9fe3-cfa78e58f990' alt='new york'
                            set={layout1Set}
                            preset='desktop'
                        />
                    </AcomodItem>
                    <AcomodItem>
                        <AcomodTitle>Layout 2</AcomodTitle>
                        <AcomodCover
                            src='https://firebasestorage.googleapis.com/v0/b/morando-em-barao.appspot.com/o/lofts%2Fcristiano-new-york%2Fny14.jpg?alt=media&token=f4f3a6ed-1010-4adf-83a5-dbfcd2369944' alt='new york'
                            set={layout2Set}
                            preset='desktop'
                        />
                    </AcomodItem>
                    <AcomodItem>
                        <AcomodTitle>Acomodações</AcomodTitle>
                        <AcomodCover 
                            src='https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/fotos_site%2Fsolarium1.jpeg?alt=media&token=70251262-4973-42f4-b9a8-31e11858b5bf' alt='solarium' 
                            set={layout3Set}
                            preset='desktop'
                        />
                    </AcomodItem>
                </Right>

            </Columns>



            <Modal
                isOpen={modalOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Example Modal"
            >

                {type === 'video' && <Iframe src='https://www.youtube.com/embed/0RCSWyr2FAk'></Iframe>}
                {type === 'tour' && <Iframe src='https://ocurus.com/view/MTYxOQ=='></Iframe>}

                <FecharModalBtn onClick={() => setModalOpen(false)}>Fechar</FecharModalBtn>

            </Modal>



        </MainStyle>
    )
}

export default Acomodacoes