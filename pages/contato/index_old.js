
import styled from 'styled-components'



const MainStyle = styled.div`
    background: white;
	min-height: 500px;
    padding: 20px 30px;
    color: ${props => props.theme.color};
    font-family: ${props => props.theme.font};

    @media (max-width: 600px) {
        padding: 20px 10px;
    }
`
const MainTitle = styled.div`
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    font-family: ${props => props.theme.font};
    margin-top: 20px;
    color: ${props => props.theme.colors.grey7};
    margin-bottom: 10px;

    @media (max-width: 600px) {
        font-size: 18px;
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
const Section = styled.div`
    /* display: flex; */
    /* flex-direction: column; */
    background: ${props => props.theme.colors.offwhite2};
    /* background: ${props => props.theme.colors.yellow}; */
    /* background: #FDF0F0; */
    padding: 20px;
    margin-bottom: 20px;
`
const Btn = styled.div`
    cursor: pointer;
    display: flex;
    color: ${props => props.theme.colors.yellow};
    text-transform: uppercase;
    font-weight: bold;
    font-size: 13px;
    // background: ${props => props.theme.colors.yellow};
    border: 2px solid ${props => props.theme.colors.yellow};
    font-family: ${props => props.theme.font};
    /* color: white; */
    padding: 15px 20px 15px 20px;
    text-align: center;
    margin: 20px 20px 20px 0px;
`
const BtnModal = styled.div`
    cursor: pointer;
    width: 250px;
    color: ${props => props.theme.colors.yellow};
    color: white;
    background: ${props => props.theme.colors.yellow};
    text-transform: uppercase;
    font-weight: bold;
    font-size: 13px;
    border: 2px solid ${props => props.theme.colors.yellow};
    font-family: ${props => props.theme.font};
    padding: 20px 10px 20px 10px;
    text-align: center;
    margin: 10px auto;
`
const BtnBox = styled.div`
    display: flex;
`
const ModalTxt = styled.div`
    font-size: 18px;
    margin: auto;
    text-align: center;
`


const Contato = () => {
    return(
        <MainStyle>

            <MainTitle>ENTRE EM CONTATO COM ...</MainTitle>
            <Txt1>(19) 99999-9999</Txt1>

            <a href={`tel:+55-19-9999999999`}>
                <BtnModal>Ligar</BtnModal>
            </a>
        
       
            <a href={`https://wa.me/5519999999999?text=Olá,%20estou%20entrando%20em%20contato%20pelo%20site`} rel="noopener nofollower" target="_blank">
            <BtnModal>Whatsapp</BtnModal>
            </a>
        
        
            <a href={`mailto:morandoembaraoy@gmail.com`}>
            <BtnModal>Email</BtnModal>
            </a>
    

        </MainStyle>

    )
}

export default Contato
