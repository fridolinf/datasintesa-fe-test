import { Modal } from "antd";
import React from "react";
import Image from "next/image";

const ModalDetail = ({ openModal, closeModal, detailData }) => {
  return (
    <div>
      <Modal
        title={`${detailData ? detailData.name.title : ""} ${
          detailData ? detailData.name.first : ""
        } ${detailData ? detailData.name.last : ""}`}
        centered
        visible={openModal}
        onCancel={closeModal}
        destroyOnClose={true}
        footer={null}
      >
        <div style={{ justifyContent: "center", display: "flex" }}>
          <Image
            src={detailData ? detailData.picture.thumbnail : ""}
            alt={detailData ? detailData.name.first : ""}
            width={100}
            height={100}
            quality={40}
          />
        </div>
        <h1 style={{ textAlign: "center" }}>Detail Location</h1>
        <div>
          <h2>State</h2>
          <p>City: {detailData ? detailData.location.city : ""}</p>
          <p>
            Country:
            {detailData ? detailData.location.country : ""}
          </p>
          <p>
            Postcode:
            {detailData ? detailData.location.postcode : ""}
          </p>
          <p>State: {detailData ? detailData.location.state : ""}</p>
          <hr />
          <h2>Coordinates</h2>
          <p>
            Latitude:
            {detailData ? detailData.location.coordinates.latitude : ""}
          </p>
          <p>
            Longitude:
            {detailData ? detailData.location.coordinates.longitude : ""}
          </p>
          <hr />
          <h2>Street</h2>
          <p>
            Street Number:
            {detailData ? detailData.location.street.number : ""}
          </p>
          <p>
            Street Name:
            {detailData ? detailData.location.street.name : ""}
          </p>
          <hr />
          <h2>Timezone</h2>
          <p>
            Timezone Offset:{" "}
            {detailData ? detailData.location.timezone.offset : ""}
          </p>
          <p>
            Timezone Description:{" "}
            {detailData ? detailData.location.timezone.description : ""}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDetail;
