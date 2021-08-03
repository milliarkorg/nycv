import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import firebase from 'firebase/app';
require("firebase/firestore");


const Main = styled.div`
	display: grid;
	grid-gap: 15px;
	grid-template-columns: 1fr 1fr 1fr;
	width: 100%;
	padding: 0px 20px;
`
const Box = styled.div`
	width: 100%;
	/* background: grey; */
	padding: 10px;
`
const BoxTitle = styled.div`
	font-size: 18px;
	font-weight: 600;
	margin-bottom: 15px;
`
const BoxBody = styled.div`
	/* font-size: 15px; */
`
const ItemBox = styled.div`
    margin-bottom: 10px;
    border-bottom: 1px solid ${props => props.theme.grey2};
    padding-bottom: 10px;
`
const GreenBall = styled.div`
    display: inline-block;
    margin-right: 5px;
    background: green;
    border-radius: 50%;
    width: 10px;
    height: 10px;
`


const MainDash = () => {

    // const [noticias, setNoticias] = useState([]);
    // const [artigos, setArtigos] = useState([]);
	// const [eventos, setEventos] = useState([]);
	const [reps, setReps] = useState([]);


    useEffect(() => {

        // Lendo as 10 últimas Noticias
		const repsRef = firebase.firestore().collection("perfis")
		let repsTemp = []
		repsRef.get().then((snapshot) => {
			snapshot.forEach((doc) => {
				repsTemp.push(doc.data())
			});
			setReps(repsTemp)
        })
        
        // Lendo as 10 últimas Noticias
		// const repsRef = firebase.firestore().collection("republicas")
		// let repsTemp = []
		// repsRef.where("published", "==", true).limit(10).orderBy('timestamp', 'desc').get().then((snapshot) => {
		// 	snapshot.forEach((doc) => {
		// 		repsTemp.push(doc.data())
		// 	});
		// 	setReps(repsTemp)
		// })
	

    }, []);




	return (
		<Main>
			<Box>
				<BoxTitle>Pensionatos</BoxTitle>
				<BoxBody>
                    {reps.map(item => <ItemBox key={item.id}>{item.title}</ItemBox>)}
				</BoxBody>
			</Box>
		</Main>
	)
}

export default MainDash