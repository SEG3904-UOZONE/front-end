export const GetMeetingDates = (course: any, index: number) => {
    if (index == 0) {
        return(
            <>{course.startDate.split('-').join('/')} <br/> {course.endDate.split('-').join('/')}</>
        )
    }
}