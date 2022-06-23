export const ProductPhoto = ({image, cardWidth}) => {
  if (!image) return null;

  const { url, altText, height, width } = image;
  const aspectRatio = height / width;
  const picWidth = cardWidth * 0.95;
  const picHeight = picWidth * aspectRatio;

  return (
    <div
      style={{
        width: `${picWidth}px`,
        height: `${picHeight}px`,
        backgroundImage: `url(${url})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
    </div>
  )
}