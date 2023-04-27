import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Dialog from "@mui/material/Dialog";
import { Company, Initiative } from "../../Store/CompanySlice";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { Fragment, RefObject, createRef, useEffect, useRef, useState } from "react";
import { cancelButtonStyle, submitButtonStyle } from "../../Styles";
import { DateInfo, DecisionData } from "../../Services/CompanyService";
import TextField from "@mui/material/TextField";
import { MakeDateString } from "../DateInput";
import { Card, CardContent } from "@mui/material";

export const DecisionModalIds = {
  modal: "decisionModal",
  addButton: "decisionModalAddButton",
  submitButton: "decisionModalSubmitButton",
  closeButton: "decisionModalCloseButton",
}

interface DecisionDataProps {
    title: string
    company: Company
    initiative: Initiative 
    isOpen: boolean
    setDecisionModalIsOpen: (value: boolean) => void
    Submit: (decisions: DecisionData[]) => void
}

export default function DecisionDataModal(props: DecisionDataProps) {

  const [selectedInitiative, setSelectedInitiative] = useState<Initiative>(props.initiative);
  const [currentDescription, setCurrentDescription] = useState("");

  useEffect(() => {
    setSelectedInitiative(props.initiative);
  },[props.isOpen])


  function EditDecision(key: number, newDescription: string, newResolution: string, newParticipants: string[], newDate: DateInfo) {
    let selectedInitiativeClone:Initiative = JSON.parse(JSON.stringify(selectedInitiative));

    selectedInitiativeClone.decisions[key].description = newDescription;
    selectedInitiativeClone.decisions[key].resolution = newResolution;
    selectedInitiativeClone.decisions[key].participants = newParticipants;
    selectedInitiativeClone.decisions[key].date = newDate;

    setSelectedInitiative(selectedInitiativeClone);
  }

  return (
      <Dialog
        id={DecisionModalIds.modal}
        open={props.isOpen}
        onClose={()=>props.setDecisionModalIsOpen(false)}
        fullWidth
        maxWidth={false}
        >
          <div>
            <h1><strong>{props.company.name}    {selectedInitiative.title}</strong></h1>
          </div>
          <div style={{margin: '5%'}}>
            <Grid container spacing={3}>
              {
              selectedInitiative.decisions.map((displayItem, key) => {
              return(
                <Grid item md={4} key={key}>
                  <Paper>
                    <Card>
                      <CardContent>
                        <TextField value={currentDescription} onChange={e => setCurrentDescription(e.target.value)}></TextField>
                        <TextField defaultValue={displayItem.resolution}></TextField>
                        <TextField defaultValue={displayItem.participants}></TextField>
                        <TextField type="date" defaultValue={displayItem.date}></TextField>
                      </CardContent>
                      <CardActions>
                        <Button>Share</Button>
                        <button className={submitButtonStyle} onClick={() => EditDecision(key, currentDescription, displayItem.resolution, displayItem.participants, displayItem.date)}>Save
                        </button>
                      </CardActions>
                    </Card>
                  </Paper>
                </Grid>
              )})}
              {
                selectedInitiative.decisions.length === 0 && "No decisions to display."
              }
            </Grid>
          </div>
          <div className="h-10 w-full flex justify-between">
            <button id={DecisionModalIds.closeButton} className={cancelButtonStyle} onClick={() => props.setDecisionModalIsOpen(false)}>Close</button>
          </div>
        </Dialog>
  );
}