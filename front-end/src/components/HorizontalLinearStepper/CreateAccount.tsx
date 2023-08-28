import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CpfCnpj from "../FormComponents/CpfCnpj";
import NameEmail from "../FormComponents/Email";
import Password from "../FormComponents/Password";
import { Link, useNavigate } from "react-router-dom";

const steps = [
  "Seu E-mail",
  "Seu CPF ou CNPJ",
  "Sua Senha",
];

export default function CreateAccount() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleNavigate = (path: string) => {
    return navigate(path)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    handleNavigate("/login");
  }

  return (
    <Box sx={{ width: "100%", textAlign: 'center' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit}>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2, justifyConten: "center" }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button type="submit">Criar Conta</Button>
            </Box>
          </React.Fragment>
        ) : (
          <Box
            sx={{
              height: "86vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {activeStep + 1 == 1 ? <NameEmail /> : <></>}
              {activeStep + 1 == 2 ? <CpfCnpj /> : <></>}
              {activeStep + 1 == 3 ? <Password /> : <></>}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </Box>
        )}
        <p>Já possui uma conta ? Entre <Link to={'/login'}>Aqui</Link></p>
      </form>
      
    </Box>
  );
}
