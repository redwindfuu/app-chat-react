import React from 'react';
import {Avatar, Typography , Button} from 'antd'
import styled from 'styled-components'
import {signOut} from 'firebase/auth'
import {auth} from '../../config/firebase/config';
import { AuthContext } from '../../Utils/Auth'
const SwapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82 , 38 , 83);

    .username{
        color : white;
        margin-left: 5px;
    }
`

export default function UserInfo() {
  
  const {user :{
    displayName,
    photoURL
  }} = React.useContext(AuthContext)
  const handleLogout = () => {
    signOut(auth)
  }
  return (
    <SwapperStyled>
        <div>
            <Avatar src={photoURL}> {photoURL ? '' : displayName?.charAt(0)?.toLowerCase()} </Avatar>
            <Typography.Text className="username">{displayName}</Typography.Text>
        </div>
        <Button onClick={handleLogout} ghost> Đăng xuất  </Button>
    </SwapperStyled>
  );
}
