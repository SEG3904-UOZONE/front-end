export const GetCourseClassStatus = (capacity: number, taken: number, isClosed: boolean): any => {
        
    if (isClosed) {
        return <span><i className="bi bi-square-fill" style={{color: "blue"}}></i> Closed</span>
    } else if ((capacity-taken) < 1) {
        return <span><i className="bi bi-triangle-fill" style={{color: "orange"}}></i> Wait List</span>
    }
    return <span><i className="bi bi-circle-fill" style={{color: "green"}}></i> Open</span>
}