
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoTutorialDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoTutorialDialog = ({ isOpen, onClose }: VideoTutorialDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-dark">Platform Instructies</DialogTitle>
          <DialogDescription className="text-gray">
            Deze video geeft je een uitgebreide rondleiding door ons platform.
          </DialogDescription>
        </DialogHeader>
        <div className="relative pb-[65.03918022905366%] h-0 rounded-lg overflow-hidden mt-4">
          <iframe
            src="https://www.loom.com/embed/0291890e632d4457b24026775ec554e8?sid=e77bc24b-060e-4bf0-aae9-927abc3bebf4"
            frameBorder="0"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full shadow-md"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};
