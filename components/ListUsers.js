import { Card, Col } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import moment from "moment";
import dynamic from "next/dynamic";
const ModalDetailComponent = dynamic(() => import("./ModalDetail"));
const LoadingComponent = dynamic(() => import("../components/Loading"));

const { Meta } = Card;
const formatTime = "DD/MM/YYYY HH:mm:ss";

const ListUsers = ({ userData }) => {
  const [sendOpen, setSendOpen] = useState(false);
  const [idDetail, setIdDetail] = useState(null);
  const detailData = userData?.find((data) => {
    return data.id.value === idDetail;
  });

  const closeModals = () => {
    setSendOpen(false);
  };

  return (
    <>
      {userData === null ? (
        <div style={{ margin: "0 auto" }}>
          <LoadingComponent />
        </div>
      ) : (
        userData?.map((data, i) => (
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
                  quality={10}
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
          </Col>
        ))
      )}
      <ModalDetailComponent
        openModal={sendOpen}
        closeModal={closeModals}
        detailData={detailData}
      />
    </>
  );
};

export default ListUsers;
