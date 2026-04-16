import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useUnAuthenticate } from "@/features/products/hook";

export function AlertUnauthenticatedDialog({
  id,
  open,
  setOpen,
}: {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const {
    mutate: unAuthenticate,
    isPending: unAuthenticatePending,
  } = useUnAuthenticate();

  const handleUnAuthenticate = () => {
    unAuthenticate(
      { id },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Your listing will be unauthenticated.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={unAuthenticatePending}>
            Cancel
          </AlertDialogCancel>

          {/* ✅ prevent auto close */}
          {/* <AlertDialogAction asChild> */}
            <Button
              onClick={handleUnAuthenticate}
              disabled={unAuthenticatePending}
            >
              {unAuthenticatePending ? "Loading..." : "Continue"}
            </Button>
          {/* </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
