import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

interface ModalProps {
  onClose: () => void;
  open: boolean;
  children: React.ReactNode;
  containerVPositionStyle?: string;
}

export default function Modal({
  onClose,
  open,
  children,
  containerVPositionStyle = "md:-mt-20",
}: ModalProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='fixed inset-0 z-50 overflow-y-auto' onClose={onClose}>
        <div
          className={`flex items-center justify-center min-h-screen px-2 md:px-4 ${containerVPositionStyle}`}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='fixed inset-0 md:opacity-90 bg-black-900' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='inline-block h-screen align-middle' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'>
            <div className='inline-block overflow-visible text-left text-white transition-all transform shadow-xl'>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
