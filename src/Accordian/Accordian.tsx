import { useState } from "react";
// import { AccordionData } from "../types";
import AccordionItem from "./AccordianItem";

function Accordion({ transaction }: { transaction: any }) {
  const [currentIdx, setCurrentIdx] = useState<boolean>(false);
  const btnOnClick = () => {
    setCurrentIdx((currentValue) => (!currentValue));
  };

  return (
    <ul className="accordion">
      <AccordionItem
        transaction={transaction}
        isOpen={currentIdx}
        btnOnClick={() => setCurrentIdx(!currentIdx)}
      />
    </ul>
  );
}

export default Accordion;
