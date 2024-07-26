import React from 'react';

const Template = ({generalData = {}, educationData = {}, experienceData = {}}) => {
    return (
        <> 
        <div className="mainTemplate">
            <h2>Template</h2>
            <p>{generalData.firstName}</p>
        </div>
        </>
    )
}

export default Template;