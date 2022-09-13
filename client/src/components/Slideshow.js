import { useState, useEffect } from "react";

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const slides = [
    {
      url: "https://s3.ap-southeast-1.amazonaws.com/prod-asset/images/4ba93fdc.jpg",
      title: "title-1",
    },
    {
      url: "https://imageio.forbes.com/specials-images/imageserve/61672f58a50684588c3c20ed/0x0.jpg?format=jpg&width=1200",
      title: "title-2",
    },
    {
      url: "https://images.complex.com/complex/images/c_scale,f_auto,q_auto,w_1920/fl_lossy,pg_1/utgfcacoxl6hwd2bj2ay/10-most-influential-nba-players-2022-original-nonw?fimg-ssr-default",
      title: "title-3",
    },
  ];

  const slideStyles = {
    width: "100%",
    height: "100%",
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[currentIndex].url})`,
    transitionDuration: "1s",
  };

  const slideHoverStyles = {
    transitionDuration: "3s",
    transform: "scale(1.03)",
  };

  const sliderStyles = {
    height: "100%",
    position: "relative",
    overflow: "hidden",
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    cursor: "pointer",
    zIndex: 1,
  };

  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    cursor: "pointer",
    zIndex: 1,
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;

    setCurrentIndex(newIndex);
  };

  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "90%",
    left: "50%",

    zIndex: 1,
  };

  const dotStyles = {
    margin: "0 3px",
    cursor: "pointer",
    fontSize: "25px",
    color: "#000",
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div style={sliderStyles}>
      <div style={leftArrowStyles} onClick={goToPrevious}>
        ❰
      </div>
      <div style={rightArrowStyles} onClick={goToNext}>
        ❱
      </div>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={isHover ? { ...slideStyles, ...slideHoverStyles } : slideStyles}
      ></div>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            style={{
              ...dotStyles,
              color: currentIndex === slideIndex ? "#fff" : "#001219",
            }}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
