import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import LoadingSpinner from "~/components/LoadingSpinner";
type Props = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ id, isOpen, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog open={isOpen} onClose={onClose} key={id}>
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel>
          <div role="status" className={isLoading ? "" : "hidden"}>
            <LoadingSpinner />
          </div>
          <Transition
            show={true}
            appear={true}
            enter="transition ease duration-700 transform"
            enterFrom="opacity-0 translate-y-64"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease duration-300 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-100 -translate-y-64"
          >
            <iframe
              src={`https://open.spotify.com/embed/album/${id}`}
              onLoad={() => setIsLoading(false)}
              className={`${
                isLoading ? "hidden " : ""
              }w-[320px] md:w-[700px] lg:w-[800px] h-[600px]`}
            />
          </Transition>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
