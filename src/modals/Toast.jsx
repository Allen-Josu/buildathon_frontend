import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

const ToastNotification = ({ open, setOpen, message }) => {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="bg-white rounded-lg shadow-lg p-3 grid grid-areas-title-description items-center"
        open={open}
        onOpenChange={setOpen}
        duration={2000} // Set the duration to 3 seconds
        data-state-open="animate-slide-in"
        data-state-closed="animate-fade-out"
      >
        <Toast.Title className="font-medium text-slate-800 text-sm mb-1">
          {message}
        </Toast.Title>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col gap-2 p-2 max-w-[390px] w-full z-50 outline-none" />
    </Toast.Provider>
  );
};

export default ToastNotification;
