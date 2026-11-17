import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface LogoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const LogoutModal = ({ open, onOpenChange, onConfirm }: LogoutModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="gap-4 p-6 sm:max-w-lg">
      <DialogHeader className="gap-4">
        <DialogTitle className="text-2xl">Log out of your account?</DialogTitle>
        <DialogDescription className="text-base">
          Your session will end on this device.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button
            variant="outline"
            className="h-10 px-3 py-2 text-base font-normal border-slate-200 bg-white text-primary"
          >

            Cancel
          </Button>
        </DialogClose>
        <Button onClick={onConfirm} className="h-10  px-3 py-2 text-base font-normal">
          Log Out
          
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export { LogoutModal };
