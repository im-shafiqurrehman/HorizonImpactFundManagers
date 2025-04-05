import { Box, Modal } from "@mui/material";
import { FC } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
  refetch?: any;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
  refetch
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] rounded-[8px] shadow outline-none"
      >
        <Component setRoute={setRoute} setOpen={setOpen} refetch={refetch} />
      </Box>
    </Modal>
  );
};

export default CustomModal;