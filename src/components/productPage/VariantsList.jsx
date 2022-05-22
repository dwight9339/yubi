

export const VariantsList = ({ variants }) => {
  return <ul>{variants.map(variant => <li>{variant.title}</li>)}</ul>
}