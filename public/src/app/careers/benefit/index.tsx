import React from 'react'
import './benefit.scss';

const BenefitAtTechnirvana = () => {
    return (
        <>
            <div className="benefit-main-section">
                <div className="benefit-text">Benefits at Nirvana</div>
                <div className="benefit-frame">
                    <div className="image-section">
                        <img src="benefit.png" alt="" className='benefit-img' />
                    </div>
                    <div className="content-section">
                        <span className='benefit-text-wrapper'><span className='dot'>.</span> Competitive salary</span>
                        <span className='benefit-text-wrapper'><span className='dot'>.</span>  Recreation programs</span>
                        <span className='benefit-text-wrapper'><span className='dot'>.</span>  Flexible working hours</span>
                        <span className='benefit-text-wrapper'><span className='dot'>.</span>  5 working days per week</span>
                        <span className='benefit-text-wrapper'><span className='dot'>.</span>  Employee referral rewards</span>
                        <span className='benefit-text-wrapper'><span className='dot'>.</span>  Leave policies</span>
                        <span className='benefit-text-wrapper'><span className='dot'>.</span>  Healthy lunch provided</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BenefitAtTechnirvana