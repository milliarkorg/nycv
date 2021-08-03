import { useEffect, useState, useContext } from 'react'
import styled , { keyframes } from 'styled-components'
import { fadeIn, fadeInDown, fadeInLeft } from 'react-animations';
import { MenuContext } from '../components/context/menucontext'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import firebase from 'firebase/app';
import "firebase/firestore";
import {Helmet} from "react-helmet";

// const Zmage = dynamic(
// 	() => import('react-zmage'),
// 	{ ssr: false }
// )


// Animations 

const fadeInAnimation = keyframes`${fadeIn}`;
const fadeInDownAnimation = keyframes`${fadeInDown}`;
const fadeInLeftAnimation = keyframes`${fadeInLeft}`;






const MainStyle = styled.div`
    background: white;
	min-height: calc(100vh - (${props => props.theme.layout.navHeight} + ${props => props.theme.layout.footerHeight}));
    color: ${props => props.theme.colors.grey7};
    background: ${props => props.theme.colors.grey2};
    font-family: ${props => props.theme.font};

    @media (max-width: 600px) {
		min-height: calc(100vh - (${props => props.theme.layout.navHeightMob} + ${props => props.theme.layout.footerHeightMob}));

    }
`
const Columns = styled.div`
	display: flex;
	width: 100%;
	height: calc(100vh - (${props => props.theme.layout.navHeight} + ${props => props.theme.layout.footerHeight}));

	@media (max-width: 600px) {

	}
	  
`
const Left = styled.div`
	width: 50%;
	background: white;
	
	@media (max-width: 600px) {
		position: relative;
		width: 100%;
		// background-image: url('https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/home-page%2Fnewyork%20-cover.jpg?alt=media&token=854ab967-e073-4057-b6a2-86aca9d35afb')
		
		&:before {
			content: "";
			position: absolute;
			top: 0; left: 0;
			width: 100%; height: 100%;
			background-image: url(https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/home-page%2Fnewyork%20-cover.jpg?alt=media&token=854ab967-e073-4057-b6a2-86aca9d35afb);
			// filter: grayscale(100%);
			filter: opacity(0.1) grayscale(100%);
		}
	}
`
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px;
	margin-bottom: 50px;

	@media (max-width: 600px) {
		position: relative;
	}
`
const Logo = styled.img`
	cursor: pointer;
	width: 190px;
	animation: 2s ${fadeInAnimation};

	@media (max-width: 600px) {
		width: 100px;
		height: 80px;
	}
`
const Slogan = styled.div`
	width: 350px;
	font-size: 20px;
	font-style: italic;
	align-self: center;
	padding-right: 10px;
	color: ${props => props.theme.colors.grey5};
	animation: 1s ${fadeInDownAnimation};

	@media (max-width: 600px) {
		font-size: 14px;
		max-width: 200px;
	}
`

const MenuBody = styled.div`
	  padding: 20px;
	  margin-bottom: 20px;
	  margin-left: 20px;

	  @media (max-width: 600px) {
		position: relative;
	}
`
const ItemBox = styled.div`
	cursor: pointer;
	  height: 100px;
	  width: 300px;
	  animation: 1s ${fadeInLeftAnimation};
`
const MenuTitle = styled.div`
	  font-size: 30px;
	  font-weight: 500;
	  margin-bottom: 7px;
	  font-family: ${props => props.theme.font};
	  color: ${props => props.theme.colors.nydark};
	  text-transform: uppercase;

	  &:hover {
		background: ${props => props.theme.colors.nydark};
		color: white;
		animation: 1s ${fadeInAnimation} ;
	  }

	  @media (max-width: 600px) {
		font-size: 26px;
	}

`
const MenuSubTitle = styled.div`
	  font-size: 14px;
	  text-transform: uppercase;
	  color: ${props => props.theme.colors.grey3};
	  font-weight: 500;
`
const ButtonRow = styled.div`
	  display: flex;
	  margin-left: 40px;

	  @media (max-width: 600px) {
		position: relative;
	}
`
const BtnContato = styled.div`
	cursor: pointer;
	background:  ${props => props.theme.colors.nydark};
	border-radius: 3px;
	padding: 20px 40px;
	animation: 2s ${fadeInDownAnimation};

	& :hover {
		opacity: 0.9;
	}	  
`
const BtnTitle = styled.div`
	text-transform: uppercase;
	  font-size: 20px;
	  color: white;
	  font-weight: 500;

	  @media (max-width: 600px) {
		font-size: 16px;
	}
`
const BtnSubTitle = styled.div`
	  font-size: 14px;
	  color: white;
	  color: ${props => props.theme.colors.grey3};
	  text-align: center;
	  font-weight: 500;
`
const Right = styled.div`
	width: 50%;
	background: black;

	@media (max-width: 600px) {
		display: none;
	}
`
const Cover = styled.img`
	object-fit: cover;
	height: 100%;
	width: 100%;
	animation: 1s ${fadeInAnimation};
`


const coverArr = [
	'https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/home-page%2Fnewyork%20-cover.jpg?alt=media&token=854ab967-e073-4057-b6a2-86aca9d35afb',
	'https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/home-page%2Facomod-cover.png?alt=media&token=65131b7d-5b36-4109-8da4-2302fbc83c6c',
	'https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/home-page%2Flocation-cover.jpg?alt=media&token=09012354-dc1a-488b-b954-8691a6a3460d',
	'https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/home-page%2Festrutura-cover.jpg?alt=media&token=f951ab40-1e63-42e6-a77b-d95be69929ee',
]




const HomePage = () => {

	const [cover, setCover] = useState('padrao');
	// const menuCtxValue = useContext(MenuContext);



	useEffect(() => {

		// const Ref = firebase.firestore().collection("perfis")
			
        // let temp = []
		// Ref.get().then((snapshot) => {
		// 	snapshot.forEach((doc) => {
		// 		temp.push(doc.data())
		// 	});
		// 	setPerfis(temp)
        // })

	}, [])
	


    return (
		<MainStyle>
			<Helmet>
				<title>New York City village - Barão Geraldo - Campinas</title>
			</Helmet>

			<Columns>
				<Left>
					<Header>
						<Link href='/'>
							{/* <Logo src='https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/logo%2Flogo.png?alt=media&token=85cf1b26-3d30-4a14-9e43-acf5e39a93a0' /> */}
							<Logo src='https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/logo%2Flogo%20-%20Transparente.png?alt=media&token=9c393071-8f1d-4f81-a0ba-0daa8d3fcbce' />
						</Link>
						<Slogan>Quando a arte encontra o lugar perfeito, surge o residencial que você sempre quis.</Slogan>
					</Header>
					<MenuBody>
						<Link href='/acomodacoes'>
							<ItemBox >
								{/* <MenuTitle onMouseOver={() => setCover(coverArr[1])} onMouseLeave={() => setCover(coverArr[0])}>Acomodações</MenuTitle> */}
								<MenuTitle onMouseOver={() => setCover('acomod')} onMouseLeave={() => setCover('padrao')}>Acomodações</MenuTitle>
								<MenuSubTitle>diversos layouts que se encaixam em seu estilo de vida</MenuSubTitle>
							</ItemBox>
						</Link>
						<Link href='/localizacao'>
							<ItemBox  >
								<MenuTitle onMouseOver={() => setCover('local')} onMouseLeave={() => setCover('padrao')}>Localização</MenuTitle>
								<MenuSubTitle>unicamp - Puc- facamp - venturus - Eldorado - boldrini - medley - centro medico</MenuSubTitle>
							</ItemBox>
						</Link>
						<Link href='/estrutura'>
							<ItemBox >
								<MenuTitle onMouseOver={() => setCover('estru')} onMouseLeave={() => setCover('padrao')}>Estrutura</MenuTitle>
								<MenuSubTitle>estrutura completa com atendimento focado nas demandas do morador</MenuSubTitle>
							</ItemBox>
						</Link>
					</MenuBody>

					<ButtonRow>
						<Link href='/contato'>
							<BtnContato>
								<BtnTitle>Entre em Contato</BtnTitle>
								<BtnSubTitle>e agende sua visita</BtnSubTitle>
							</BtnContato>
						</Link>

					</ButtonRow>


				</Left>

				<Right>
					{/* <Cover src='https://firebasestorage.googleapis.com/v0/b/new-york-city-village.appspot.com/o/home-page%2Fnewyork%20-cover.jpg?alt=media&token=854ab967-e073-4057-b6a2-86aca9d35afb' /> */}
					{cover === 'padrao' && <Cover src={coverArr[0]} />}
					{cover === 'acomod' && <Cover src={coverArr[1]} />}
					{cover === 'local' && <Cover src={coverArr[2]} />}
					{cover === 'estru' && <Cover src={coverArr[3]} />}
					
				</Right>
			
			</Columns>



		</MainStyle>
    )
  }
  
  export default HomePage