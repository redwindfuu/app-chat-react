import { Modal, Form, Select, Avatar, Spin } from "antd";
import React, { useState } from "react";
import { addDocument } from "../../service/firestore";
import { AppContext } from "../../Utils/App";
import { AuthContext } from "../../Utils/Auth";
import {
  collection,
  updateDoc,
  doc,
  limit,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config/firebase/config";
import { debounce } from "lodash";

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  // Search: abcddassdfasdf

  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  React.useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
          <Select.Option key={opt.value} value={opt.value} title={opt.label}>
            <Avatar size="small" src={opt.photoURL}>
              {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
            </Avatar>
            {` ${opt.label}`}
          </Select.Option>
        ))}
    </Select>
  );
}

async function fetchUserList(search, curMembers) {
  let collectionRef = collection(db, "users");
  const results = query(
    collectionRef,
    where("keywords", "array-contains", search?.toLowerCase()),
    orderBy("displayName"),
    limit(20)
  );

  const unsubscribe = await getDocs(results);
  const document = [];
  unsubscribe.forEach((doc) => {
    document.push({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    });
  });
  return document.filter((opt) => !curMembers.includes(opt.value));
}
export default function InviteMemberModal() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = React.useContext(AppContext);
  const {
    user: { uid },
  } = React.useContext(AuthContext);
  const [form] = Form.useForm();
  const [value, setValue] = useState([]);
  const handleOk = async () => {
    form.resetFields();
    setValue([]);
    const roomRef = doc(db, "rooms", selectedRoomId);
    await updateDoc(roomRef, {
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });
    setIsInviteMemberVisible(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setValue([]);
    setIsInviteMemberVisible(false);
  };
  return (
    <Modal
      title="Mời thêm thành viên"
      visible={isInviteMemberVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <DebounceSelect
          mode="multiple"
          name="search-user"
          label="Tên các thành viên"
          value={value}
          placeholder="Nhập tên thành viên"
          fetchOptions={fetchUserList}
          onChange={(newValue) => setValue(newValue)}
          style={{ width: "100%" }}
          curMembers={selectedRoom.members}
        />
      </Form>
    </Modal>
  );
}
