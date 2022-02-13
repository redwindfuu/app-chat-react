import React from 'react'
import {Row , Col } from 'antd'
import ChatWindow from '../../../components/ChatWindow'
import Sidebar from '../../../components/Sidebar'
function ChatRoom() {
  return (
    <div>
      <Row>
        <Col span={6}> <Sidebar/> </Col>
        <Col span={18}> <ChatWindow/> </Col>
      </Row>
    </div>
  )
}

export default ChatRoom
