import { useMemo, useEffect } from "react";

export const ProductPhoto = ({url, altText}) => {

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        backgroundImage: `url(${url})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
    </div>
  )
}