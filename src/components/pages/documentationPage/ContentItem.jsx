import { ProductPhoto } from "../../common/ProductPhoto";

export const ContentItem = ({ item, sectionWidth }) => {
  const { type, data } = item;

  if (type === "list") {
    return (
      <ul>
        {data.map((item) => {
          return <li>{item}</li>
        })}
      </ul>
    );
  } else if (type === "paragraph") {
    return <p>{data}</p>;
  } else if (type === "image") {
    return (
      <div>
        <ProductPhoto
          image={data}
          cardWidth={sectionWidth}
        />
        <div
          style={{
            marginTop: "5px",
            textAlign: "center",
            fontSize: "0.85em"
          }}
        >
          {data.caption}
        </div>
      </div>
    ); 
  }
}