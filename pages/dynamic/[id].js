import { useEffect, useState} from 'react'
// import { useRouter } from 'next/router'
import styled from 'styled-components'
import ReadMore from '@crossfield/react-read-more'
import firebase from 'firebase/app';
import "firebase/firestore";
import Link from 'next/link'
import {Helmet} from "react-helmet";
import Modal from 'react-modal';
import dynamic from 'next/dynamic'

const Zmage = dynamic(
	() => import('react-zmage'),
	{ ssr: false }
  )

const MainStyle = styled.div`
    background: white;
	min-height: calc(100vh - (${props => props.theme.layout.navHeight} + ${props => props.theme.layout.footerHeight}));
    padding: 20px 30px;
    background: ${props => props.theme.colors.grey4};
    font-family: ${props => props.theme.font};

    @media (max-width: 600px) {
		min-height: calc(100vh - (${props => props.theme.layout.navHeightMob} + ${props => props.theme.layout.footerHeightMob}));
    }
`


const Perfil = (initialProps) => {



	function closeModal(){
		setModalOpen(false);
		}

	Modal.defaultStyles.overlay.backgroundColor = '#000000';

    

    return (

		<MainStyle>
			<Helmet>
				<title>Dynamic routing</title>
			</Helmet>
			
			{initialProps.id}


		</MainStyle>
    )
}


  Perfil.getInitialProps =  async (ctx) => {

	return {id: ctx.query.id}

//     let perfilDoc = firebase.firestore().collection("perfis").where('id', "==", ctx.query.id)

//     let perfil = {}
        
//     await perfilDoc.get().then((querySnapshot) => {
//         querySnapshot.forEach(function(doc) {
//             perfil = doc.data()
//         });

//     })

//     return perfil
    
  }
  
  export default Perfil