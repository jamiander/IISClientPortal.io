import { Breakpoint, Container, Dialog, IconButton, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Company, Initiative } from "../../Store/CompanySlice";
import CloseIcon from '@mui/icons-material/Close';

interface BaseInitiativeModalProps {
  children: ReactNode
  open: boolean
  onClose: () => void
  cypressData: {
    modal: string
    closeModalButton: string
  }
  title?: string
  company?: Company
  initiative?: Initiative
  maxWidth?: false | Breakpoint | undefined
}


export function BaseInitiativeModal(props: BaseInitiativeModalProps)
{
  return (
    <Container>
      <Dialog
        open={props.open}
        onClose={() => props.onClose()}
        fullWidth
        maxWidth={props.maxWidth}
        data-cy={props.cypressData.modal}
        sx={{}}
      >
        <div className="flex col-span-4 bg-[#69D5C3] py-6 px-5">
          <div className="w-full flex justify-between">
            <div className="space-y-2 w-3/4">
              <Typography variant="h4">{props.title}</Typography>
              <Typography variant="h6" className="text-5xl font-bold w-full">{props.company?.name}</Typography>
              <Typography variant="body1" className="text-3xl w-full">{props.initiative?.title}</Typography>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex justify-end">
                <IconButton data-cy={props.cypressData.closeModalButton} onClick={() => props.onClose()}>
                  <CloseIcon/>
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <Container className="m-4" maxWidth={props.maxWidth}>
          {props.children}
        </Container>
      </Dialog>
    </Container>
  )
}
