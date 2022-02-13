import { UserAddOutlined } from '@ant-design/icons';
import { Tooltip , Button , Avatar , Form , Input } from 'antd';
import React from 'react';
import styled from 'styled-components'
import Message from '../Message'

import { AppContext } from '../../Utils/App';

const HeaderStyled =  styled.div`
  display : flex;
  justify-content : space-between;
  height : 56px;
  padding: 0 16px;
  align-items : center;
  border-bottom: 1px solid rgb(230 , 230, 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
      font-size: 12px;
    }
  }
`;


const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled =  styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;
const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export default function ChatWindow() {
  const { selectedRoom , members , setIsInviteMemberVisible} =
    React.useContext(AppContext);
  
  const handleInvite = () => {
    setIsInviteMemberVisible(true)
  }
  const handleInput = () => {
    
  }
  
  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className='header__info'>
          <p className='header__title'>{selectedRoom.name}</p>
          <span className='header__description'>{selectedRoom.description}</span>
        </div>
        <ButtonGroupStyled>
          <Button 
            icon={<UserAddOutlined/>} 
            type="text"
            onClick={handleInvite}
          >
            Mời
          </Button>
          <Avatar.Group size='small' maxCount={2}>
            {members.map((member) => (
                    <Tooltip title={member.displayName} key={member.id}>
                      <Avatar src={member.photoURL}>
                        {member.photoURL
                          ? ''
                          : member.displayName?.charAt(0)?.toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  ))}
          </Avatar.Group>
        </ButtonGroupStyled>
      </HeaderStyled>
      <ContentStyled>
      <MessageListStyled >
        <Message
            key="{mes.id}"
            text="{mes.text}"
            photoURL="{mes.photoURL}"
            displayName="{mes.displayName}"
            createdAt="{mes.createdAt}"
        />
      </MessageListStyled>
            <FormStyled>
              <Form.Item name='message'>
                <Input
                  onChange={handleInput}
                  bordered = {false}
                  autoComplete = 'off'
                  placeholder='Nhập tin nhấn ..'
                />
              </Form.Item>
              <Button type='primary' >
                Gửi
              </Button>
            </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  );
}
