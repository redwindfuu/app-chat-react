import { UserAddOutlined } from "@ant-design/icons";
import { Tooltip, Button, Avatar, Form, Input, Alert } from "antd";
import React from "react";
import styled from "styled-components";
import Message from "../Message";

import { AppContext } from "../../Utils/App";
import { addDocument } from "../../service/firestore";
import { AuthContext } from "../../Utils/Auth";
import useFirestore from "../../hooks/useFirestore";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
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

const ContentStyled = styled.div`
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
  const [form] = Form.useForm();
  const { selectedRoom, members, setIsInviteMemberVisible } =
    React.useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = React.useContext(AuthContext);
  const [inputValue, setInputValue] = React.useState("");
  const handleInvite = () => {
    setIsInviteMemberVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleOnSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      roomId: selectedRoom.id,
      photoURL,
      displayName,
    });
    form.resetFields(['message']);
  };

  const conditions = React.useMemo(() => ({
    fieldName: 'roomId',
    operator: '==',
    compareValue: selectedRoom.id,
  }),[selectedRoom.id])
  const message = useFirestore('messages', conditions);


  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectedRoom.name}</p>
              <span className="header__description">
                {selectedRoom.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                type="text"
                onClick={handleInvite}
              >
                Mời
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {members.map((member) => (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {
                message.map( mes=>
                  <Message
                    key={mes.id}
                    text={mes.text}
                    photoURL={mes.photoURL}
                    displayName={mes.displayName}
                    createdAt={mes.createdAt}
                  />
                )
              }
              
            </MessageListStyled>
            <FormStyled form = {form}>
              <Form.Item name="message">
                <Input

                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  bordered={false}
                  autoComplete="off"
                  placeholder="Nhập tin nhấn .."
                />
              </Form.Item>
              <Button type="primary" onClick={handleOnSubmit} >Gửi</Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }}
        ></Alert>
      )}
    </WrapperStyled>
  );
}
