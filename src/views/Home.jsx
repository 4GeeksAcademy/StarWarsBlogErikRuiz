import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAppContext } from "../store";
import CardItem from "../components/CardItem";

const Home = () => {
  const { store, actions } = useAppContext();

  useEffect(() => {
    actions.fetchAllData();
  }, []);

  return (
    <Container className={`py-4 ${store.theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <h2 className="text-center mb-4">Personajes</h2>
      <Row className="mb-5">
        {store.characters?.map((item) => (
          <Col key={item.uid} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <CardItem item={item} type="people" />
          </Col>
        ))}
      </Row>

      <h2 className="text-center mb-4">Planetas</h2>
      <Row className="mb-5">
        {store.planets?.map((item) => (
          <Col key={item.uid} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <CardItem item={item} type="planets" />
          </Col>
        ))}
      </Row>

      <h2 className="text-center mb-4">Vehiculos</h2>
      <Row className="mb-5">
        {store.vehicles?.map((item) => (
          <Col key={item.uid} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <CardItem item={item} type="vehicles" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;