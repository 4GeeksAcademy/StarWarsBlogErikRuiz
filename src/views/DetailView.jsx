import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

const DetailView = () => {
  const { type, uid } = useParams(); // ejemplo: type = "people", uid = "1"
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
        const result = await res.json();
        setData(result.result);
      } catch (err) {
        console.error("Error fetching detail:", err);
      }
    };
    fetchDetail();
  }, [type, uid]);

  if (!data) return <div className="text-center mt-5">Loading...</div>;

  const imageUrl = `https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`;

  return (
    <Container className="mt-5">
      <Card className="p-3">
        <Row>
          <Col md={5}>
            <Card.Img
              src={imageUrl}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.jpg";
              }}
              alt={data.properties?.name || "Star Wars Image"}
            />
          </Col>
          <Col md={7}>
            <Card.Body>
              <Card.Title>{data.properties?.name}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {data.description}
              </Card.Text>
              <ul className="list-unstyled">
                {Object.entries(data.properties).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DetailView;