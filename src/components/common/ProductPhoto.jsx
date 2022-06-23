export const ProductPhoto = ({url, altText, cardWidth}) => {
  const picWidth = cardWidth * 0.95;

  return (
    <div
      style={{
        width: `${picWidth}px`,
        height: `${picWidth}px`,
        backgroundImage: `url(${url})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
    </div>
  )
}