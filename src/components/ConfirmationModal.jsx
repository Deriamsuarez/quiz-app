import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";

const ConfirmationModal = ({ open, setOpen, score }) => {
  const isSuccess = score >= 70;

  return (
    <Transition.Root show={open}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                      isSuccess ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {isSuccess ? (
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <XCircleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {isSuccess ? "Congratulations!" : "Keep Trying!"}
                    </Dialog.Title>
                    <p className="text-sm">{`You have scored ${score.toFixed(2)}. `}</p>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {isSuccess
                          ? "Congratulations, you have successfully completed the course."
                          : "Unfortunately, your score did not meet the minimum requirements. Please try again."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isSuccess
                        ? "bg-green-600 hover:bg-green-500 focus-visible:outline-green-600  "
                        : "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600  "
                    }`}
                    onClick={() => {
                      setOpen(false);
                      window.location.reload();
                      //! Aquí se debe colocar que hará la plataforma al terminar el modal
                    }}
                  >
                    {isSuccess ? "Go to the next section" : "Try again"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ConfirmationModal;
