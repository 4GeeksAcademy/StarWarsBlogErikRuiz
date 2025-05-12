let customImages = null;

export const getImageUrl = async (type, id) => {
  const correctedType = type === "people" ? "characters" : type;

  if (!customImages) {
    const res = await fetch("/custom-images.json");
    customImages = await res.json();
  }

  return (
    customImages[type]?.[id] ||
    `https://starwars-visualguide.com/assets/img/${correctedType}/${id}.jpg`
  );
};