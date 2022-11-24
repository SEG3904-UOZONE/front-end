export const GetCourseUnits = (course: any, index: number) => {
    if (index == 0) {
        return(
            <>{parseInt(course.units).toFixed(2)}</>
        )
    }
}