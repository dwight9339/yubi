export const ContentItem = ({ item }) => {
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
    return null; // To do: handle images
  }
}