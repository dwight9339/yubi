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

export const PageContents = ({ section }) => {
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
        padding: "10px"
      }}
    >
      <TextContainer>
        <Heading id={section.title}>{section.title}</Heading>
        {section.contents && section.contents.map((item, i) => {
          return <ContentItem 
            item={item} 
            key={i} 
            sectionWidth={sectionWidth}
          />;
        })}
      </TextContainer>
      {section.subsections && section.subsections.map((subsection, i) => {
        return (
          <PageContents section={subsection} key={i} />
        );
      })}  
    </div>
  )
}