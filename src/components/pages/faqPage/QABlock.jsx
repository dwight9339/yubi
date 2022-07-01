import { 
  Card,
  Collapsible,
  Button,
  Heading,
  TextStyle,
  Icon,
  Stack
} from "@shopify/polaris";
import { CaretUpMinor, CaretDownMinor } from "@shopify/polaris-icons";
import { useState, useRef, useLayoutEffect } from "react";


export const QABlock = ({ item }) => {
  const ref = useRef(null);
  const { question, answer } = item;

  const [show, setShow] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  useLayoutEffect(() => {
    setCardWidth(ref.current.offsetWidth);
  }, []);

  return (
    <Card>
      <div
        style={{
          padding: "15px"
        }}
      >
        <div
          ref={ref}
          onClick={() => setShow((show) => !show)}
        >
          <Stack>   
            <Stack.Item>
              <Icon source={show ? CaretUpMinor : CaretDownMinor} />
            </Stack.Item>  
            <Stack.Item>
              <Heading>{question}</Heading>
            </Stack.Item>
          </Stack>
        </div>
        <Collapsible
          open={show}
          transition={{
            duration: "200ms",
            timingFunction: "ease-in-out"
          }}
        >
          <div
            style={{
              marginTop: "10px",
              width: `${cardWidth}px`
            }}
          >
            <TextStyle>{answer}</TextStyle>
          </div>
        </Collapsible>
      </div>
    </Card>
  )
}