import { Dialog, Transition } from "@headlessui/react";
import { UilTimes } from "@iconscout/react-unicons";
import { Fragment, ReactNode } from "react";

interface BottomSheetOptionsProp {
  open: boolean;
  title?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  hideCloseIcon?: boolean;
}

function BottomSheetOptions({
  open,
  setOpen,
  children,
  title,
  hideCloseIcon = false,
}: BottomSheetOptionsProp) {
  const isTitleConnect = title === "headings.connect";
  const _handleOnClose = () => setOpen(false);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[1000000000000000000000000000000] overflow-hidden"
        onClose={_handleOnClose}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom=" opacity-0"
            enterTo="opacity-100 "
            leave="ease-in duration-200"
            leaveFrom="opacity-100 "
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-bottom"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-y-[100px] opacity-0 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-[100px]"
          >
            <div className="relative inline-block w-full transform overflow-hidden rounded-t-3xl bg-darkBackground p-4 text-left align-middle font-semibold text-white transition-all">
              {title && (
                <Dialog.Title
                  as="h3"
                  className={`mb-3 text-2xl font-extrabold leading-6 ${
                    isTitleConnect
                      ? ""
                      : "text-[14px] font-semibold text-gray-500"
                  } capitalize`}
                >
                  {title}
                </Dialog.Title>
              )}
              {!hideCloseIcon && (
                <button
                  className="absolute top-4 right-4 h-8 w-8 rounded-full border border-gray-500 p-1 outline-none" // focus:outline-none
                  onClick={_handleOnClose}
                >
                  <UilTimes className="m-auto h-full w-full text-gray-500 " />
                </button>
              )}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <p className="mx-2 my-3 text-xl font-extrabold tracking-wide text-white">
      {children}
    </p>
  );
};

const Description = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-grey-400 m-2 text-sm font-medium tracking-wide">
      {children}
    </p>
  );
};

const Separator = ({ className }: { className?: string }) => {
  return <hr className={` ${className} border-black-600 my-5`} />;
};

BottomSheetOptions.Title = Title;
BottomSheetOptions.Separator = Separator;
BottomSheetOptions.Description = Description;

export default BottomSheetOptions;
