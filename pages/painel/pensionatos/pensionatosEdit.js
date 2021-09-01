/* import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
// import { Button, Icon, Modal, Popup } from 'semantic-ui-react'
import firebase from 'firebase/app';
import "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import ImgUploader from '../components/imgUploader'


const ModalStyled = styled(Modal)`
    background: white;
    font-family: ${props => props.theme.font};

   &&& {
       p {
        font-size: 16px;
        line-height: 28px;
        margin-top: 10px;
        margin-bottom: 10px;
        font-family: ${props => props.theme.font}
       }
   }
`

const Title = styled.div`
   margin-bottom: 50px;
`
const Input = styled.input`
   font-size: 14px;
    height: 30px;
    width: 100%;
    margin: 0px 0px 10px 0px;
`
const TextArea = styled.textarea`
    font-size: 14px;
    height: 150px;
    width: 100%;
    margin: 0px 0px 10px 0px;
`
const Label = styled.div`
    margin: 0px 0px 0px 0px;
    font-size: 14px;
    color: grey;
    margin-bottom: 5px;
`

const Select = styled.select`
   height: 30px;
    width: 100%;
    margin: 0px 0px 10px 0px;
`
const ModalColumns = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: 0.9fr 1fr;
    width: 100%;
`
const EditPanel = styled.div`
    width: 100%;
`
const FormBox = styled.div`
    max-width: 100%;
    margin-left: 30px;
`
// const ImgList = styled.div`
//     display: flex;
//     margin-bottom: 20px;
//     width: 100%;
//     flex-wrap: wrap;
// `
// const ImgBox = styled.div`
//     display: flex;
//     flex-direction: column;
//     margin-bottom: 10px;
// `
// const Img = styled.img`
//     width: 150px;
//     height: 150px;
//     object-fit: cover;
//     margin-right: 10px;
// `
// const ImgDel = styled.div`
//    cursor: pointer;
//    background: black;
//    font-size: 13px;
//    color: white;
//    text-align: center;
//    margin-right: 10px;
//    padding: 5px 0px;
// `
const ButtonBox = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
`
const Button = styled.div`
    padding: 20px 25px;
    color: white;
    background: black;
    margin-right: 5px;
`


const PensionatosEdit = ({ modalOpen, itemData, setModalOpen, closeModal }) => {

    const [Data, setData] = useState(itemData);
    const [delPopupOpen, setDelPopupOpen] = useState(false);
    const [uploadingImg, setUploadingImg] = useState(false);


    useEffect(() => {
        if (typeof (window) !== 'undefined') {
            Modal.setAppElement('body')
        }

    }, [])


    useEffect(() => {
        setData(itemData);

    }, [itemData])


    // Esse Efect serve para atualizar o banco de dados sem precisar clicar em atualizar, após edição de fotos.
    useEffect(() => {

        if (uploadingImg === true) {
            update()
        }

    }, [Data])






    const update = () => {

        firebase.firestore().collection("perfis").doc(Data.id).set({ ...Data }).then(function () {
            toast.success('Atualização Enviada');
            setUploadingImg(false)
        }).catch(function (error) {
            console.log(error)
            toast.error('Erro :' + error);
        });

    }


    const dbWrite = (url) => {
        setData({ ...Data, fotos: [...Data.fotos, { src: url, alt: 'pensionato' }] })

    }


    const dbDelete = (url) => {
        let newFotos = Data.fotos.filter(item => item.src != url)
        setData({ ...Data, fotos: newFotos })
    }

    const dbWriteBanner = (url) => {
        setData({ ...Data, imgBanner: url })

    }
    const dbDeleteBanner = (url) => {
        setData({ ...Data, imgBanner: '' })
    }

    const modalStyles = {
        content: {
            // position: 'absolute',
            padding: '40px',
            marginTop: '40px',
            marginRight: 'auto',
            marginLeft: 'auto',
            width: '80%',
            maxHeight: 'calc(90vh - 40px)',
            overflow: 'auto',

        }
    };

    Modal.defaultStyles.overlay.backgroundColor = '#000000';


    return (

        <ModalStyled
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            style={modalStyles}
            onRequestClose={() => closeModal()}
        >
            <>

                <Title>Editar/Enviar Pensionatos</Title>
                <div>

                    <EditPanel>
                        {Data &&
                            <FormBox>

                                <Label>Titulo</Label>
                                <Input value={Data.title} onChange={(e) => setData({ ...Data, title: e.target.value })} /> <br />

                                <Label>ID</Label>
                                <Input disabled value={Data.id} onChange={(e) => setData({ ...Data, id: e.target.value })} /> <br />

                                <Label>Ordenação</Label>
                                <Input value={Data.ordem} type='number' min='0' onChange={(e) => setData({ ...Data, ordem: e.target.value })} /> <br />

                                <Label>Resumo</Label>
                                <TextArea value={Data.resumo} maxLength="280" onChange={(e) => setData({ ...Data, resumo: e.target.value })} /> <br />

                                <Label>Descrição</Label>
                                <TextArea value={Data.desc} onChange={(e) => setData({ ...Data, desc: e.target.value })} /> <br />


                                <Label>Banner Página Inicial</Label>
                                <ImgUploader
                                    // data={Data.banner}
                                    // arrayImg={}
                                    singleImg={Data.imgBanner}
                                    dbref={'inicial'}
                                    storageRef={'inicial'}
                                    dbWrite={(url) => dbWriteBanner(url)}
                                    dbDelete={(url) => dbDeleteBanner(url)}
                                    startUpload={() => setUploadingImg(true)}
                                    // startUpload={() => console.log('StartUpload')}
                                    finishUpload={() => setUploadingImg(false)}
                                    uploadFlag={uploadingImg}
                                />


                                <Label>Imagens</Label>
                                <ImgUploader
                                    // data={Data.fotos}
                                    arrayImg={Data.fotos}
                                    // singleImg={Data.imgBanner}
                                    storageRef={Data.id}
                                    dbref={'perfis'}
                                    dbWrite={(url) => dbWrite(url)}
                                    dbDelete={(url) => dbDelete(url)}
                                    startUpload={() => setUploadingImg(true)}
                                    // startUpload={() => console.log('StartUpload')}
                                    finishUpload={() => setUploadingImg(false)}
                                    uploadFlag={uploadingImg}

                                />


                            </FormBox>
                        }
                    </EditPanel>





                </div>

                <ButtonBox>


                    <Button onClick={() => update()}>
                        Atualizar
                    </Button>
                    <Button onClick={() => setModalOpen(false)}>
                        Fechar
                    </Button>
                </ButtonBox>

                <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_LEFT} />
            </>

        </ModalStyled>
    )
}

export default PensionatosEdit; */