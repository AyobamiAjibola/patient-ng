'use client'

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
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
  stepIconRoot: {
    color: theme.palette.border.main,
    borderRadius: '50%',
    width: '25px', height: '25px'
  },

  stepIconActive: {
    color: theme.palette.primary.main,
  },

  stepIconCompleted: {
    color: theme.palette.primary.darker,
  },

  stepIconText: {
    fontSize: theme.typography.labelsm.fontSize,
    fontWeight: theme.typography.labelsm.fontWeight,
  },
}));

export default function StepperVertical({ activeStep, setActiveStep, isShowLabel=true }: any) {
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
                    {isShowLabel && (<Typography
                      sx={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: theme.typography.labelsm.fontWeight
                      }}
                    >{label.header}</Typography>)}
                    {/* <Typography
                        sx={{
                            fontSize: theme.typography.labelsm.fontSize,
                            color: theme.palette.secondary.light
                        }}
                    >{label.subHeader}</Typography> */}
                </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
