import React from 'react';
import {Row , Col , Button ,Typography as Title } from 'antd';
import { auth } from '../../../config/firebase/config'
import { signInWithPopup , FacebookAuthProvider, GoogleAuthProvider,  getAdditionalUserInfo } from 'firebase/auth';
import {addDocument , generateKeywords } from '../../../service/firestore';


const providerGG = new GoogleAuthProvider();
const providerFB = new FacebookAuthProvider();

export default function Login() {
  const handleFbLogin = async () => {
    const data = await signInWithPopup(auth,providerFB)
    const user = data.user
    const details = getAdditionalUserInfo(data)
    const isNewUser = details.isNewUser
    if(isNewUser) {
        addDocument('users', {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: details.providerId,
            keywords: generateKeywords(user.displayName?.toLowerCase()),
          });
    }
  } 
  const handleGgLogin = () => {
    
  } 
  
  return( 
    <div>
        <Row justify='center' style={{height: 800}}>
            <Col span={8} >
                <Title 
                    style={{textAlign: 'center'}}
                    level={3}
                >
                    Fun Chat
                </Title>
                <Button
                    style={{width: '100%', marginBottom: 5}}
                    onClick={handleGgLogin}

                > 
                    Login with google 
                </Button>
                <Button
                    style={{width: '100%'}}
                    onClick={handleFbLogin}
                > 
                    Login with facebook 
                </Button>
            
            </Col>
        </Row>
    </div>
  )
}
