import { 
  Collapsible,
  TextStyle,
  Navigation
} from "@shopify/polaris";

export const TableOfContents = ({ sections, updateSelection }) => {
  if (!sections) sections = [];

  return (
    <Navigation>
      <Navigation.Section 
        items={
          sections.map(({ title }) => {
            return {
              label: title,
              accessibilityLabel: `Open ${title} section`,
              onClick: () => updateSelection(title)
            }
          })
        }
      />
    </Navigation>
  )
}