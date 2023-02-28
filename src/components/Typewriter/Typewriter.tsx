import { useEffect, useRef, cloneElement, ReactElement, useMemo } from "react";
import { StyledTitle } from "../CSS/HomePage.styles";
import Typewriter from "./TypeWriterClass";

interface ReactTypedProps {
  strings: Array<string>;
  className?: string;
  style?: any;
  children?: ReactElement;
  typingSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
}

const ReactTyped = ({
  style,
  className,
  children,
  strings,
  ...rest
}: ReactTypedProps) => {
  const typedRef = useRef<HTMLDivElement>(null);
  const typewriter = useRef<any>(null);

  const typedOptions = useMemo(() => rest, [rest]);

  useEffect(() => {
    if (typewriter?.current) {
      typewriter?.current?.destroy?.();
    }

    typewriter.current = new Typewriter(typedRef.current, typedOptions);

    strings.forEach((string) => {
      typewriter.current.typeString(string).pauseFor(1000).deleteAll();
    });

    typewriter.current.start();
  }, [typedOptions, strings]);

  let child = <span ref={typedRef} />;

  if (children) {
    child = cloneElement(children, {
      ref: typedRef,
    });
  }

  return <StyledTitle  size={65} margin={0} weight={800} align={"center"}>{child}</StyledTitle>;
};

export default ReactTyped;
