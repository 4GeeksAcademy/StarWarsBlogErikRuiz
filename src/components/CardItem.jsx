import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../store";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getImageUrl } from "../utils/getCustomImage";

const CardItem = ({ item, type }) => {
  const navigate = useNavigate();
  const {
    store: { favorites, theme },
    actions: { addFavorite, removeFavorite },
  } = useAppContext();

  const [imageUrl, setImageUrl] = useState("");

  const isFavorite = favorites.some((fav) => fav.url === item.url);

  const toggleFavorite = () => {
    isFavorite ? removeFavorite(item) : addFavorite(item);
  };

  const getIdFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1] || parts[parts.length - 2];
  };

  const id = getIdFromUrl(item.url);

  useEffect(() => {
    getImageUrl(type, id).then(setImageUrl);
  }, [type, id]);

  return (
    <Card className={`h-100 shadow-sm ${theme === "dark" ? "bg-dark text-light" : ""}`}>
      <Card.Img
        variant="top"
        src={imageUrl}
        onError={(e) => (e.target.src = "/placeholder.jpg")}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="text-truncate">{item.name || item.title}</Card.Title>
        <div className="d-flex justify-content-between align-items-center">
          <Button
            variant={theme === "dark" ? "outline-light" : "outline-dark"}
            onClick={() => navigate(`/${type}/${id}`)}
          >
            Saber más...
          </Button>
          <Button
            variant="link"
            className="text-danger fs-5"
            onClick={toggleFavorite}
            aria-label="Toggle Favorite"
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardItem;