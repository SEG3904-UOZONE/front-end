export const GetCourseClassStatus = (capacity: number, taken: number, isClosed: boolean): string => {
        
    if (isClosed) {
        return "Closed"
    } else if ((capacity-taken) < 1) {
        return "Pending"
    }
    return "Open"
}