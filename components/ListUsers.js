import { Card, Col } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import moment from "moment";
import ModalDetail from "./ModalDetail";

const { Meta } = Card;
const formatTime = "DD/MM/YYYY HH:mm:ss";

const ListUsers = ({ userData }) => {
  const [sendOpen, setSendOpen] = useState(false);
  const [idDetail, setIdDetail] = useState(null);
  console.log(idDetail);
  const detailData = userData.find((data) => {
    return data.id.value === idDetail;
  });

  const closeModals = () => {
    setSendOpen(false);
  };

  return (
    <>
      {userData?.map((data, i) => (
        <Col xs={24} sm={12} md={8} xl={6} style={{ marginTop: 50 }} key={i}>
          <Card
            title={`${data.name.title} ${data.name.first} ${data.name.last}`}
            key={i}
            onClick={() => {
              setSendOpen(true), setIdDetail(data.id.value);
            }}
            hoverable
            style={{
              width: 300,
              textAlign: "center",
              cursor: "pointer",
            }}
            cover={
              <Image
                width={240}
                height={200}
                src={data.picture.large}
                alt={data.name.first}
                quality={1}
              />
            }
            actions={[
              <div key={i}>
                <span>Age</span>
                <b style={{ paddingLeft: 5 }}>
                  {moment(Date.now()).format("YYYY") -
                    moment(data.dob.date).format("YYYY")}
                </b>
              </div>,
            ]}
          >
            <Meta
              title={data.location.city}
              description={data.email}
              style={{ justifyContent: "center" }}
            />
            <br></br>
            <span>{moment(data.dob.date).format(formatTime)}</span>
          </Card>
          <ModalDetail
            openModal={sendOpen}
            closeModal={closeModals}
            detailData={detailData}
          />
        </Col>
      ))}
    </>
  );
};

export default ListUsers;
