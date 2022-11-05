export const GetCourseUnits = (course: any, index: number) => {
    if (index == 0) {
        return(
            <>{course.units.toFixed(2)}</>
        )
    }
}