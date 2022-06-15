import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Layout, Row, Col, Select, Pagination, Button } from "antd";
import ListUsers from "../components/ListUsers";
import { useEffect, useState } from "react";
import getListUsers from "./api/getData";
import Loading from "../components/Loading";
const { Header, Footer, Sider, Content } = Layout;

const { Option } = Select;
const Home = () => {
  const [data, setData] = useState(null);
  const [previousData, setPreviousData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [nat, setNat] = useState([
    "AU",
    "BR",
    "CA",
    "CH",
    "DE",
    "DK",
    "ES",
    "FI",
    "FR",
    "GB",
    "IE",
    "IR",
    "NO",
    "NL",
    "NZ",
    "TR",
    "US",
  ]);
  const [national, setNational] = useState("AU");
  const onChange = (page) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCount(count + 10);
      setPage(page);
    }, 500);
  };
  const selectNat = (val) => {
    setNational(val);
  };

  useEffect(() => {
    getListUsers(page, count, national).then((data) => {
      setData(data.data);
    });
  }, [national, page]);

  return (
    <Layout>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        {data === null ? (
          <Loading />
        ) : (
          <>
            <Content style={{ margin: "24px 16px 0" }}>
              <div
                style={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Select
                  defaultValue={[nat[0]]}
                  style={{
                    width: 200,
                  }}
                  onSelect={selectNat}
                >
                  {nat.map((data, i) => (
                    <Option key={i} value={data}>
                      {data}
                    </Option>
                  ))}
                </Select>
              </div>
              <Row>
                <ListUsers userData={data} />
              </Row>
            </Content>
            {loading && <Loading />}
            <Footer style={{ textAlign: "center" }}>
              <Button onClick={onChange}>Load More...</Button>
            </Footer>
          </>
        )}
      </Layout>
    </Layout>
  );
};
export default Home;
