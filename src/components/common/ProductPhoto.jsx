

export const ProductPhoto = ({url, altText}) => {
  return (
    <div
      style={{
        height: "350px",
        width: "350px",
        backgroundImage: `url(${url})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    ></div>
  )
}