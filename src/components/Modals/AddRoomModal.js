import { Modal, Form, Input } from "antd";
import React from "react";
import { addDocument } from "../../service/firestore";
import { AppContext } from "../../Utils/App";
import { AuthContext } from "../../Utils/Auth";

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } =
    React.useContext(AppContext);
  const {
    user: { uid },
  } = React.useContext(AuthContext);
  const [form] = Form.useForm();
  const handleOk = () => {
    
    addDocument("rooms", { ...form.getFieldValue(), members: [uid] });
    form.resetFields()
		setIsAddRoomVisible(false);
  };
  const handleCancel = () => {
    setIsAddRoomVisible(false);
  };
  return (
    <Modal
      title="Tạo Phòng"
      visible={isAddRoomVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Tên Phòng" name="name">
          <Input placeholder="Nhập tên Phòng"></Input>
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nhập Mô tả"></Input.TextArea>
        </Form.Item>
      </Form>
    </Modal>
  );
}
