import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import {Button, TextField, Typography, Stepper, Step, StepLabel, StepConnector, Box } from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

const StyledRating = withStyles({
  iconFilled: {
    color: '#b2dfdb',
  },
  iconHover: {
    color: '#00796b',
  },
})(Rating);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div className={clsx(classes.root, { [classes.active]: active, })}>
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient(316deg, #f42b03 0%, #ffbe0b 74%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient(316deg, #f42b03 0%, #ffbe0b 74%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient(316deg, #f42b03 0%, #ffbe0b 74%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient(316deg, #f42b03 0%, #ffbe0b 74%)',
  },
});

// background-color: #0499f2;
// background-image: linear-gradient(315deg, #0499f2 0%, #26f596 74%);
// background-color #ff4e00;
// background-image linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
// background-color #55efc4;
// background-image linear-gradient(315deg, #55efc4 0%, #000000 74%);
// background-color: #f42b03;
// background-image: linear-gradient(316deg, #f42b03 0%, #ffbe0b 74%);


function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <DirectionsRunIcon />,
    2: <EditIcon />,
    3: <EmojiEmotionsIcon />,
    4: <SaveIcon />,
  };

  return (
    <div className={clsx(classes.root, { [classes.active]: active, [classes.completed]: completed, })}>
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Run Summary', 'Name your run', 'Effort Level', "Save"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Today's Activity Summary`;
    case 1:
      return 'Name your Run';
    case 2:
      return 'Effort Level';
    default:
      return 'Save Activity';
  }
}

function getStepComponents(step) {
  switch (step) {
    case 0:
      return (
        <Box >
          <Typography variant="body1">Distance: 5km </Typography>
          <Typography variant="body1">Time: 00:25 min</Typography>
        </Box>
      );

    case 1:
      return (
        <Box>
          <TextField />
        </Box>
      );
    case 2:
      return (
        <Box component="fieldset" mb={3} borderColor="transparent">
          <StyledRating
            name="customized-color"
            defaultValue={5} max = {10}
            getLabelText={(value) => `${value} Effort${value !== 1 ? 's' : ''}`}
            icon={<FitnessCenterIcon fontSize="inherit" />}
          />
        </Box>
      );
    default:
      return '';
  }
}

export default function StepperWithIcons() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions} color="primary">
              Enjoy your day!
            </Typography>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions} >{getStepContent(activeStep)}</Typography>
            {getStepComponents(activeStep)}
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}