import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Spinner, Container } from "react-bootstrap";
import { useAppContext } from "../store";
import { getImageUrl } from "../utils/getCustomImage"; 

const Details = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const {
    store: { theme },
  } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
        const json = await res.json();
        setData(json.result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    getImageUrl(type, id).then(setImageUrl);
  }, [type, id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (!data) return <p className="text-center">No se encontró información.</p>;

  return (
    <Container
      className={`py-4 d-flex justify-content-center ${
        theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <Card
        style={{ width: "26rem" }}
        className={`shadow border-0 animate__animated animate__fadeIn ${
          theme === "dark" ? "bg-secondary text-light" : "bg-white text-dark"
        }`}
      >
        <Card.Img
          variant="top"
          src={imageUrl}
          onError={(e) => (e.target.src = "/placeholder.jpg")}
        />
        <Card.Body>
          <Card.Title className="text-center mb-3 fs-4 fw-bold">
            {data.properties.name || data.properties.title}
          </Card.Title>
          <Card.Text className="animate__animated animate__fadeIn">
            {Object.entries(data.properties).map(([key, value]) => (
              <div key={key} className="mb-1">
                <strong className="text-capitalize">
                  {key.replace(/_/g, " ")}:
                </strong>{" "}
                {value}
              </div>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Details;
