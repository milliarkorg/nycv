import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import PensionatosEdit from './pensionatosEdit';
import SideBar from '../components/sidebar'
import firebase from 'firebase/app';
// require("firebase/firestore");
import "firebase/firestore";

const Main2Columns = styled.div`
	display: grid;
	grid-template-columns: 1fr 5fr;
	grid-template-rows: auto;
    grid-template-areas:
    "sidebar body";
    min-height: 100vh;
    padding: 10px;
    background: ${props => props.theme.colors.grey3};
    font-family: ${props => props.theme.font};
`

const Body = styled.div`
  grid-area: body;
  background: ${props => props.theme.offwhite2};
  /* min-height: 100vh; */
`

const BodyHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
`
const TitleBody = styled.div`
    font-size: 16px;
    text-transform: uppercase;
    color: ${props => props.theme.colors.grey7};
    font-weight: 500;
    margin-bottom: 10px;
`
const AddBtn = styled.div`
    cursor: pointer;
    font-size: 12px;
    text-transform: uppercase;
    color: ${props => props.theme.colors.grey9};
    font-weight: bold;
    margin-bottom: 10px;
`
const GridBox = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-auto-rows: auto;
    padding: 10px;
    /* min-height: 100vh; */
`
const Item = styled.div`
    cursor: pointer;
    width: 100%;
    min-height: 85px;
    background: ${props => props.theme.colors.grey1};
    padding: 10px;
`
const ItemTitle = styled.div`
    
`
const ItemCat = styled.div`
    font-weight: bold;
    text-transform: capitalize;
`





const PensionatosDash = () => {

    const [items, setItems] = useState([]);
    const [itemData, setItemData] = useState({ titulo: '', id: '', dia: '', desc: '', published: false, local: '', link: '', oferta: '' });
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
		const Ref = firebase.firestore().collection("perfis")
			
        let temp = []
		Ref.get().then((snapshot) => {
			snapshot.forEach((doc) => {
				temp.push(doc.data())
			});
			setItems(temp)
        })
        
        // Listen to realtime data changes
        Ref.onSnapshot(function(snapshot) {
            let temp2 = []
            snapshot.forEach((doc) => {
				temp2.push(doc.data())
			});
			setItems(temp2)
        });
    
    }, []);


    
    
    const handleItemClick = (itemData) => {
        setItemData(itemData)
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }
    
    const handleNewItem = () => {
        setItemData({ titulo: '', id: '', dia: '', desc: '', published: false, local: '', link: '', oferta: ''})
        setModalOpen(true)

    }
    
    

    return (
        <>
            

            <Main2Columns>
						<SideBar />
                        
						<Body>
                            <BodyHeader>
                                <TitleBody>Pensionatos</TitleBody>
                                {/* <AddBtn onClick={() => handleNewItem()}>+ Adicionar</AddBtn> */}
                            </BodyHeader>

                            <GridBox>
                                    <>
                                    {items.map(item => (
                                        <Item key={item.id} onClick={() => handleItemClick(item)}>
                                            <ItemTitle>{item.title}</ItemTitle>
                                            {/* <ItemCat>{item.dia} {!item.published && <strong style={{color: 'darkred'}}> - Draft</strong>}</ItemCat> */}
                                        </Item>
                                    ))}
                                    </>
                            </GridBox>
						</Body>
			</Main2Columns>

           

            <PensionatosEdit modalOpen={modalOpen} itemData={itemData} setModalOpen={() => setModalOpen()} closeModal={() => closeModal()} />
            
        </>
    )

}

export default PensionatosDash;