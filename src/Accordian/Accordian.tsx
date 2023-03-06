import { useState } from "react";
// import { AccordionData } from "../types";
import AccordionItem from "./AccordianItem";

function Accordion({ items }: { items: any[] }) {
  const [currentIdx, setCurrentIdx] = useState<boolean>(false);
  const btnOnClick = () => {
    setCurrentIdx((currentValue) => (!currentValue));
  };

  return (
    <ul className="accordion">
      <AccordionItem
        data={items}
        isOpen={currentIdx}
        btnOnClick={() => setCurrentIdx(!currentIdx)}
      />
    </ul>
  );
}

export default Accordion;
