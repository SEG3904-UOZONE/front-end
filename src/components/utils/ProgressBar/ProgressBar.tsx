import './ProgressBar.scss'

const ProgressBar = (props: any) => {

    const choosenProgressBar = (option: string): any => {
        switch (option) {
            case 'step-0':
                return(
                    <div className="stepper-wrapper">
                        <div className="stepper-item">
                            <div className="step-counter">1</div>
                            <div className="step-name">Add to Cart</div>
                        </div>
                        <div className="stepper-item">
                            <div className="step-counter">2</div>
                            <div className="step-name">Add to Schedule</div>
                        </div>
                        <div className="stepper-item">
                            <div className="step-counter">3</div>
                            <div className="step-name">Confirm Courses</div>
                        </div>
                        <div className="stepper-item">
                            <div className="step-counter">4</div>
                            <div className="step-name">Enrolled</div>
                        </div>
                    </div>
                )
            case 'step-1':
                return(
                    <div className="stepper-wrapper">
                        <div className="stepper-item activated">
                            <div className="step-counter">1</div>
                            <div className="step-name">Add to Cart</div>
                        </div>
                        <div className="stepper-item">
                            <div className="step-counter">2</div>
                            <div className="step-name">Add to Schedule</div>
                        </div>
                        <div className="stepper-item">
                            <div className="step-counter">3</div>
                            <div className="step-name">Confirm Courses</div>
                        </div>
                        <div className="stepper-item">
                            <div className="step-counter">4</div>
                            <div className="step-name">Enrolled</div>
                        </div>
                    </div>
                )
            case 'step-2':
                return(
                    <div className="stepper-wrapper">
                        <div className="stepper-item completed">
                            <div className="step-counter">1</div>
                            <div className="step-name">Add to Cart</div>
                        </div>
                        <div className="stepper-item activated">
                            <div className="step-counter">2</div>
                            <div className="step-name">Add to Schedule</div>
                        </div>
                        <div className="stepper-item">
                            <div className="step-counter">3</div>
                            <div className="step-name">Confirm Courses</div>
                        </div>
                        <div className="stepper-item">
                            <div className="step-counter">4</div>
                            <div className="step-name">Enrolled</div>
                        </div>
                    </div>
                )
            case 'step-3':
                return(
                    <div className="stepper-wrapper">
                        <div className="stepper-item completed">
                            <div className="step-counter">1</div>
                            <div className="step-name">Add to Cart</div>
                        </div>
                        <div className="stepper-item completed">
                            <div className="step-counter">2</div>
                            <div className="step-name">Add to Schedule</div>
                        </div>
                        <div className="stepper-item activated">
                            <div className="step-counter">3</div>
                            <div className="step-name">Confirm Courses</div>
                        </div>
                        <div className="stepper-item">
                            <div className="step-counter">4</div>
                            <div className="step-name">Enrolled</div>
                        </div>
                    </div>
                )
            case 'step-4':
                return(
                    <div className="stepper-wrapper">
                        <div className="stepper-item completed">
                            <div className="step-counter">1</div>
                            <div className="step-name">Add to Cart</div>
                        </div>
                        <div className="stepper-item completed">
                            <div className="step-counter">2</div>
                            <div className="step-name">Add to Schedule</div>
                        </div>
                        <div className="stepper-item completed">
                            <div className="step-counter">3</div>
                            <div className="step-name">Confirm Courses</div>
                        </div>
                        <div className="stepper-item completed">
                            <div className="step-counter">4</div>
                            <div className="step-name">Enrolled</div>
                        </div>
                    </div>
                ) 
            default:
                return(
                    <div>None</div>
                )
        }
    }

    return(
        <div>{choosenProgressBar(props.step)}</div>
    )
}

export default ProgressBar