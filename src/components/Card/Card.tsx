import React from "react";

interface CardProps {
  children: React.ReactNode;
  ExitIcon?: any;
  dialog?: boolean;
  className?: string;
  onExitIconClick?: any;
  responsiveOverride?: string;
}

interface CardTitle {
  children: React.ReactNode;
  small?: boolean;
  className?: string;
}

interface CardDescription {
  children: React.ReactNode;
  className?: string;
}

const Card = ({
  children,
  ExitIcon,
  onExitIconClick,
  className = "",
  dialog = false,
  responsiveOverride = "",
}: CardProps) => {
  function handleOnExitIconClick(e: any) {
    e?.preventDefault();
    e?.stopPropagation();
    onExitIconClick?.();
  }

  return (
    <div
      className={`relative pt-6 md:pt-12 ${
        dialog
          ? " px-6 pb-6 md:w-550px md:px-12 xl:mt-0"
          : " px-4 pb-4 sm:px-6 sm:pb-6 md:w-630px md:px-14"
      } md:bg-black-800 h-fit w-full rounded-32px md:pb-[52px] ${className} ${responsiveOverride}`}
    >
      {ExitIcon && (
        <button
          className="bg-black-900 absolute right-4 flex h-8 w-8 items-center rounded-full p-1 xs:right-6 sm:top-6 sm:right-24 md:h-10 md:w-10 md:p-2"
          onClick={handleOnExitIconClick}
        >
          <ExitIcon className="m-auto flex h-full w-full text-gray-400" />
        </button>
      )}
      {children}
    </div>
  );
};

const Title = ({ children, small = false, className = "" }: CardTitle) => {
  return (
    <p
      className={`${
        !small && "font-extrabold md:text-4xl"
      } mb-2 text-[22px] font-bold capitalize tracking-wide text-white md:text-2xl md:leading-9 ${className}`}
    >
      {children}
    </p>
  );
};

const Description = ({ children, className = "" }: CardDescription) => {
  return (
    <p
      className={`text-grey-400 w-auto text-[14px] font-medium tracking-wide md:text-base ${className}`}
    >
      {children}
    </p>
  );
};

function Separator({ className = "" }: { className?: string }) {
  return <hr className={` ${className} border-black-600 my-8`} />;
}

Card.Title = Title;
Card.Description = Description;
Card.Separator = Separator;

export default Card;
