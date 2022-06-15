import { Layout, Row, Select, Button } from "antd";
import { useEffect, useState } from "react";
import getListUsers from "./api/getData";
import dynamic from "next/dynamic";
const ListUsersComponent = dynamic(() => import("../components/ListUsers"));
const LoadingComponent = dynamic(() => import("../components/Loading"));
const { Header, Footer, Content } = Layout;
const { Option } = Select;

const Home = () => {
  const [data, setData] = useState(null);
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
          <LoadingComponent />
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
                <ListUsersComponent userData={data} />
              </Row>
            </Content>
            {loading && <LoadingComponent />}
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
