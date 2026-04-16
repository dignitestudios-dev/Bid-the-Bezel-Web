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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteProduct, useUnAuthenticate } from "@/features/products/hook";

export function AlertDeleteDialog({
  id,
  open,
  setOpen,
}: {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { mutate, isPending: deleteProductPending } = deleteProduct();

  const handleDelete = () => {
    mutate(
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
            Your product will be deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteProductPending}>
            Cancel
          </AlertDialogCancel>

     
            <Button
              onClick={handleDelete}
              disabled={deleteProductPending}
            >
              {deleteProductPending ? "Loading..." : "Continue"}
            </Button>
       
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
