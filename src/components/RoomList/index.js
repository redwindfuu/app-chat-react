import React from 'react'
import { Collapse , Typography, Button } from 'antd'
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';

import { AppContext } from '../../Utils/App';
const { Panel } = Collapse;
const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
  const { rooms, setIsAddRoomVisible , setSeletedRoomID } = React.useContext(AppContext)
  const handleAddRoom = () => {
    setIsAddRoomVisible(true)
  }
  return (
    <Collapse ghost defaultActiveKey={['1']} >
      <PanelStyled header ='Danh sách các phòng' key='1'>
          {
            rooms.map((room) => 
            <LinkStyled 
              key={room.id} 
              onClick={
                () => setSeletedRoomID(room.id)
              }
            >{room.name}</LinkStyled>
            )
          }
          <Button
            type='text'
            className='add-room'
            icon={<PlusSquareOutlined/>}
            onClick={handleAddRoom}
          >
              Thêm Phòng
          </Button>
      </PanelStyled>
    </Collapse>
  )
}
