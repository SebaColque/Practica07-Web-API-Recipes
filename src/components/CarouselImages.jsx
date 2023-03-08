import { useEffect, useState } from "react";
import styled from "styled-components";

const CarouselImg = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 50%;
  opacity: 0;
  transition: 0.5s;
  box-shadow: 0 0 10px 0 rgb(105, 130, 105);
  &.loaded {
    opacity: 1;
  }
`;

export default function Carousel({images}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        selectNewImage(selectedIndex, images);
      }, 3000);
      return () => clearInterval(interval);
    });

  const selectNewImage = (index, images, next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next ? selectedIndex < images.length - 1 : selectedIndex > 0;
      const nextIndex = next ? (condition ? selectedIndex + 1 : 0) : condition ? selectedIndex - 1 : images.length - 1;
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
  };

  const previous = () => {
    selectNewImage(selectedIndex, images, false);
  };

  const next = () => {
    selectNewImage(selectedIndex, images);
  };

  return (
    <>
      <CarouselImg
        // src={require(`assets/img/${selectedImage}`).default}
        src={selectedImage}
        alt="Gentleman"
        className={loaded ? "loaded" : ""}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}