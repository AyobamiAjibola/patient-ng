'use client'

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const steps = [
    {
        header: 'Add a cover photo',
        subHeader: 'Please provide your name and email'
    }, 
    {
        header: 'Share the details of your fundraising with donors',
        subHeader: 'Please provide your name and email'
    }, 
    {
        header: 'Who are you fundraising for?',
        subHeader: 'Please provide your name and email'
    }, 
    {
        header: 'How much will you like to raise?',
        subHeader: 'Please provide your name and email'
    }, 
    {
        header: 'Review & Submit',
        subHeader: 'Please provide your name and email'
    }
];

const useStyles = makeStyles((theme: any) => ({
    // Custom styles for the root of each step
    stepIconRoot: {
      color: theme.palette.border.main,
      borderRadius: '50%',
      width: '25px', height: '25px'
    },
    // Custom styles for the active step
    stepIconActive: {
      color: theme.palette.primary.main, // Change color for the active step
    },
    // Custom styles for the completed step
    stepIconCompleted: {
      color: theme.palette.primary.darker,
    },
    // Custom styles for the text inside the step
    stepIconText: {
      fontSize: theme.typography.labelsm.fontSize, // Adjust font size
      fontWeight: theme.typography.labelsm.fontWeight, // Adjust font weight
    },
}));

export default function StepperVertical({ activeStep, setActiveStep }: any) {
  const [skipped, setSkipped] = useState(new Set<number>());
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 900px)');

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  // const handleNext = () => {
  //   // let newSkipped = skipped;
  //   // if (isStepSkipped(activeStep)) {
  //   //   newSkipped = new Set(newSkipped.values());
  //   //   newSkipped.delete(activeStep);
  //   // }
  //   sessionStorage.setItem('step', 'two')
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   // setSkipped(newSkipped);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    if(sessionStorage.getItem('step') === null) {
        sessionStorage.setItem('step', '0')
    }
  },[sessionStorage]);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} orientation={isMobile ? 'horizontal' : 'vertical'}>
        {steps.map((label, index) => {
        //   const stepProps: { completed?: boolean } = {};
        //   const labelProps: {
        //     optional?: ReactNode;
        //   } = {};
        //   if (isStepOptional(index)) {
        //     labelProps.optional = (
        //       <Typography variant="caption">Optional</Typography>
        //     );
        //   }
        //   if (isStepSkipped(index)) {
        //     stepProps.completed = false;
        //   }
          return (
            <Step key={label.header}>
                <StepLabel 
                   StepIconProps={{
                    classes: {
                      root: classes.stepIconRoot, // Custom class for the root of each step
                      active: classes.stepIconActive, // Custom class for the active step
                      completed: classes.stepIconCompleted, // Custom class for the completed step
                      text: classes.stepIconText, // Custom class for the text inside the step
                    },
                  }}
                >
                    <Typography
                        sx={{
                            fontSize: theme.typography.labelsm.fontSize,
                            fontWeight: theme.typography.labelsm.fontWeight
                        }}
                    >{label.header}</Typography>
                    <Typography
                        sx={{
                            fontSize: theme.typography.labelsm.fontSize,
                            color: theme.palette.secondary.light
                        }}
                    >{label.subHeader}</Typography>
                </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* {activeStep === steps.length ? (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Fragment>
      )} */}
    </Box>
  );
}
