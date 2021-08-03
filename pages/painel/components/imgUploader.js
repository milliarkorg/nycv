import React, {useState, useEffect} from 'react';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import firebase from 'firebase/app';
import "firebase/storage";
import styled from 'styled-components'
import { toast } from 'react-toastify';


const Label = styled.div`
    margin: 0px 0px 0px 0px;
    font-size: 14px;
    color: grey;
    margin-bottom: 5px;
`
const ImgList = styled.div`
    display: flex;
    margin-bottom: 20px;
    width: 100%;
    flex-wrap: wrap;
`
const ImgBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`
const Img = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin-right: 10px;
`
const ImgDel = styled.div`
   cursor: pointer;
   background: black;
   font-size: 13px;
   color: white;
   text-align: center;
   margin-right: 10px;
   padding: 5px 0px;
`
const ImgDelDisabled = styled.div`
    cursor: default;
    background: grey;
    font-size: 13px;
    color: black;
    text-align: center;
    margin-right: 10px;
    padding: 5px 0px;
`
const Hr = styled.hr`
    margin-top: 25px;
    margin-bottom: 40px;
`



const ImgUploader = ({ storageRef, arrayImg, singleImg, dbref, dbWrite, dbDelete, startUpload, finishUpload, uploadFlag }) => {

    //States do File Uploader
    const [progress, setProgress] = useState(0);
    const [ImgState, setImgState] = useState(arrayImg || singleImg);



    useEffect(() => {

      setImgState(arrayImg || singleImg)

    }, [arrayImg || singleImg])

   


    const handleUploadStart = () => {
        startUpload() // Serve para atualizar a flag do lado de fora do componente
        setProgress( 0 );
    }


    const handleProgress = progress => setProgress(progress);


    const handleUploadError = error => {
        console.error(error);
    };


    const handleUploadSuccess = filename => {
        setProgress(100)

        firebase.storage().ref(storageRef).child(filename).getDownloadURL().then( url => {

            dbWrite(url)
        })
    };


    const deleteImg = (url) => {
        startUpload()
        // setIsUploading(true);

        let imgRef = firebase.storage().refFromURL(url);

        // Delete the file
        imgRef.delete().then(function() {
            startUpload()
            // File deleted successfully from storage
            toast.warning('Imagem Deletada');
            
            // Deletando do DB
            dbDelete(url)
        })
        .catch(function(error) {
            console.error(error)
        // Uh-oh, an error occurred!
        });
    }


    return (
        <>
       
            
            {arrayImg ?
           
            <ImgList>
                {ImgState && ImgState.map((item) => 
                    <ImgBox key={item.src}>
                        <Img src={item.src} alt={'pensionato'}/>
                        {!uploadFlag ? 
                            <ImgDel onClick={() => deleteImg(item.src)}>Remover</ImgDel>
                            :
                            <ImgDelDisabled>Remover</ImgDelDisabled>
                        }
                    </ImgBox>
                )}
            </ImgList>
            
            :

            <ImgList>
                    {ImgState && 
                    <ImgBox>
                        <Img src={ImgState} alt={'pensionato'}/>
                    
                        {!uploadFlag ? 
                            <ImgDel onClick={() => deleteImg(singleImg)}>Remover</ImgDel>
                            :
                            <ImgDelDisabled>Remover</ImgDelDisabled>
                        }
                    </ImgBox>
                    }
            </ImgList>
            }
            

            {!uploadFlag ?
                <CustomUploadButton
                    accept="image/*"
                    name="avatar"
                    randomizeFilename
                    // filename={(file) => file.name }
                    storageRef={firebase.storage().ref(storageRef)}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                    style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4}}
                >
                    Selecione a Imagem
                </CustomUploadButton>
            :
                <p>Aguarde...</p>
            }
            

            <Hr />
        </>
    )
}

export default ImgUploader






