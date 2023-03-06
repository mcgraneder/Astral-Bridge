import React, { useCallback, useState } from "react";
import { usePopper } from "react-popper";

import type * as PopperJS from "@popperjs/core";
type TooltipProps = {
  content: React.ReactNode;
  placement?: PopperJS.Placement;
  strategy?: PopperJS.PositioningStrategy;
  contentWrapperClassName?: string;
  childrenWrapperClassName?: string;
  hidden?: boolean;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Tooltip = (props: TooltipProps) => {
  const {
    content,
    children,
    hidden = false,
    disabled = false,
    placement = "top",
    strategy = "absolute",
    contentWrapperClassName = "",
    childrenWrapperClassName = "",
  } = props;

  const [referenceElement, setReferenceElement] = useState<any>();
  const [popperElement, setPopperElement] = useState<any>();
  const [arrowElement, setArrowElement] = useState<any>();

  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      placement,
      strategy,
      modifiers: [
        { name: "offset", options: { offset: [0, 12] } },
        { name: "arrow", options: { element: arrowElement, padding: 8 } },
      ],
    }
  );

  const show = useCallback(() => {
    if (!popperElement) return;
    popperElement.setAttribute("data-show", "");
    update?.();
  }, [popperElement, update]);

  const hide = useCallback(() => {
    if (!popperElement) return;
    popperElement.removeAttribute("data-show");
  }, [popperElement]);

  if (hidden) return null;
  return (
    <>
      <span
        ref={setReferenceElement}
        onMouseEnter={show}
        onFocus={show}
        onMouseLeave={hide}
        onBlur={hide}
        className={`relative cursor-pointer ${childrenWrapperClassName}`}
      >
        {children}
      </span>

      {!disabled && content && (
        <div
          id="popper"
          ref={setPopperElement}
          style={styles.popper}
          className={`text-grey-400 bg-black-600 z-10 hidden w-max max-w-xs rounded-lg px-4 py-3 text-sm font-medium tracking-wide ${contentWrapperClassName}`}
          {...attributes.popper}
        >
          {content}
          <div ref={setArrowElement} style={styles.arrow} id="arrow"></div>
        </div>
      )}
    </>
  );
};

const Title = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={`text-primary pb-1 text-[18px] font-extrabold tracking-wide ${className}`}
    >
      {children}
    </p>
  );
};

Tooltip.Title = Title;
export default Tooltip;
