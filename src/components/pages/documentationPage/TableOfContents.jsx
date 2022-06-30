import { 
  Collapsible,
  TextStyle,
  Navigation
} from "@shopify/polaris";

export const TableOfContents = ({ 
  sections, 
  currentSection,
  onNavClick, 
  onSubnavClick 
}) => {
  if (!sections) sections = [];

  return (
    <Navigation location="/">
      <Navigation.Section 
        items={
          sections.map(({ title: sectionTitle, subsections }) => {
            return {
              label: sectionTitle,
              accessibilityLabel: `Open ${sectionTitle} section`,
              matches: false,
              selected: currentSection ? sectionTitle === currentSection : false,
              url: `/`,
              onClick: () => onNavClick({sectionTitle}),
              subNavigationItems: subsections?.map(({ title: subsectionTitle }) => {
                return {
                  label: subsectionTitle,
                  disabled: false,
                  selected: false,
                  matches: false,
                  url: `/`,
                  onClick: () => onSubnavClick({sectionTitle, subsectionTitle})
                };
              })
            }
          })
        }
      />
    </Navigation>
  )
}