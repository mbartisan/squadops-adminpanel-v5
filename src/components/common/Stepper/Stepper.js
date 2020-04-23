import React from "react";
import MUIStepper from "@material-ui/core/Stepper";
import MUIStep from "@material-ui/core/Step";
import MUIStepLabel from "@material-ui/core/StepLabel";
import StepConnector from "./StepConnector";
import StepIcon from "./StepIcon";

export const Stepper = (props) => {
    const { activeStep, steps } = props;
    if (!steps) return null;
    return <MUIStepper alternativeLabel activeStep={activeStep} connector={<StepConnector />} style={{ borderRadius: '6px', marginBottom: '10px', paddingTop: '34px' }}>
        {steps.map(({label}) => (
            <MUIStep key={label}>
                <MUIStepLabel StepIconComponent={StepIcon}>{label}</MUIStepLabel>
            </MUIStep>
        ))}
    </MUIStepper>
};
export default Stepper;
