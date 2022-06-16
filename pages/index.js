import { Layout, Row, Select } from "antd";
import { useEffect, useState } from "react";
import getListUsers from "./api/getData";
import dynamic from "next/dynamic";
const ListUsersComponent = dynamic(() => import("../components/ListUsers"));
const LoadingComponent = dynamic(() => import("../components/Loading"));
const { Header, Footer, Content } = Layout;
const { Option } = Select;

const getScrollDownPercentage = (window) => {
  const pageHeight = window.document.documentElement.scrollHeight;
  const clientHeight = window.document.documentElement.clientHeight;
  const scrollPos = window.pageYOffset;
  const currentPosition = scrollPos + clientHeight;
  const percentageScrolled = currentPosition / pageHeight;
  return percentageScrolled;
};

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
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

  const selectNat = (val) => {
    setData(null);
    setPage(1);
    setNational(val);
  };

  const handleScroll = () => {
    let percentageScrolled = getScrollDownPercentage(window);
    if (percentageScrolled > 0.9) {
      const nextPage = page + 1;
      setPage(nextPage);
    }
  };

  useEffect(() => {
    getListUsers(page, national).then((getData) => {
      window.onscroll = handleScroll;
      setData(getData.data);
    });
  }, [national]);

  useEffect(() => {
    if (data?.length > 0) {
      setLoading(true);
      setTimeout(() => {
        getListUsers(page, national).then((getData) => {
          window.onscroll = handleScroll;
          setLoading(false);
          setData([...data, ...getData.data]);
        }, 850);
      });
    }
  }, [page]);

  return (
    <Layout>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
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
          <Footer style={{ textAlign: "center" }} />
        </>
      </Layout>
    </Layout>
  );
};
export default Home;
