import React from 'react';
import { ProgressBar } from "react-loader-spinner";

const SmallSpinner = () => {
    return (
        <div>
            <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor='gray'
                barColor='black'
            />
        </div>
    );
};

export default SmallSpinner;