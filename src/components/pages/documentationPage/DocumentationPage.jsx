import { 
  Page,
  Card,
  TextContainer
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { sections } from "../../../assets/documentationData.json";
import { useEffect } from "react";

import { TableOfContents } from "./TableOfContents";
import { PageContents } from "./PageContents";

export const DocumentationPage = () => {
  const navigate = useNavigate();

  const [currentSection, setCurrentSection] = useState(sections[0]);
  const [selectedSubsection, setSelectedSubsection] = useState(null);

  // useEffect(() => {
  //   console.log(JSON.stringify(currentSection));
  // }, [currentSection]);

  const updateSection = (sectionTitle) => {
    setSelectedSubsection(null);
    setCurrentSection(sections.find((section) => section.title === sectionTitle));
  }

  const updateSubsection = (subsectionTitle) => {
    setSelectedSubsection(subsectionTitle);
  }

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
            gridTemplateColumns: "1fr 3fr 1fr"
          }}
        >
          <TableOfContents 
            sections={sections} 
            updateSelection={updateSection}
          />
          <PageContents
            section={currentSection}
            selectedSubsection={selectedSubsection}
          />
          <TableOfContents 
            sections={currentSection.subsections} 
            updateSelection={updateSubsection}
          />
        </div>
      </Card>
    </Page>
  )
}