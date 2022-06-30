import { useEffect } from "react"
import { 
  Heading,
  Subheading,
  TextContainer,
  TextStyle
} from "@shopify/polaris"
import { 
  useState,
  useRef,
  useLayoutEffect
} from "react";

import { ContentItem } from "./ContentItem";

export const PageContents = ({ section, selectedSubsection }) => {
  if (!section) return null;

  const ref = useRef(null);
  
  const [sectionWidth, setSectionWidth] = useState(0);

  useLayoutEffect(() => {
    setSectionWidth(ref.current.offsetWidth);
  }, []);


  return (
    <div
      ref={ref}
      style={{
        padding: "15px"
      }}
    >
      <TextContainer>
        <Heading>{section.title}</Heading>
        {section.contents && section.contents.map((item, i) => {
          return <ContentItem 
            item={item} 
            key={i} 
            sectionWidth={sectionWidth}
          />;
        })}
      </TextContainer>
      {section.subsections && section.subsections.map(({ title, contents }, i) => {
        return (
          <div 
            key={i}
            style={{
              marginTop: "20px"
            }}
          >
            <TextContainer>
              <Subheading>{title}</Subheading>
              {contents.map((item, j) => {
                return <ContentItem 
                  item={item} 
                  key={j} 
                  sectionWidth={sectionWidth}
                />;
              })}
            </TextContainer>
          </div>
        );
      })}  
    </div>
  )
}