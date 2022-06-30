import { 
  Page,
  Card
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { sections } from "../../../assets/documentationData.json";

import { TableOfContents } from "./TableOfContents";
import { PageContents } from "./PageContents";

export const DocumentationPage = () => {
  const navigate = useNavigate();

  const [currentSection, setCurrentSection] = useState(sections[0]);
  const [currentSubsection, setCurrentSubsection] = useState(null);
  const [anchor, setAnchor] = useState(null);

  const updateSection = (sectionTitle) => {
    setCurrentSection(sections.find(({ title }) => title === sectionTitle));
  }

  useEffect(() => {
    console.log(`currentSubsection: ${currentSubsection}`);
  }, [currentSubsection]);

  useEffect(() => {
    if (!anchor) return;

    document.getElementById(anchor).scrollIntoView();
  }, [anchor]);

  return (
    <Page
      title="Documentation"
      breadcrumbs={[
        {
          content: "Back",
          accessibilityLabel: "Return to previous page",
          onAction: () => navigate(-1)
        }
      ]}
    >
      <Card>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 4fr 1fr"
          }}
        >
          <TableOfContents 
            sections={sections} 
            currentSection={currentSection.title}
            onNavClick={({ sectionTitle }) => {
              updateSection(sectionTitle)
              setCurrentSubsection(null);
            }}
            onSubnavClick={({ subsectionTitle }) => {
              setCurrentSubsection(subsectionTitle);
              setAnchor(subsectionTitle);
            }}
          />
          <div
            style={{
              padding: "10px",
              maxHeight: "600px",
              overflowY: "scroll"
            }}
          >
            <PageContents
              section={currentSection}
            />
          </div>
          <TableOfContents 
            sections={currentSection.subsections} 
            currentSection={currentSubsection}
            onNavClick={({ sectionTitle }) => {
              setCurrentSubsection(sectionTitle);
              setAnchor(sectionTitle);
            }}
            onSubnavClick={({ subsectionTitle }) => {
              setAnchor(subsectionTitle);
            }}
          />
        </div>
      </Card>
    </Page>
  )
}