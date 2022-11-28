export const GetCourseClassStatus = (capacity: number, taken: number, isClosed: boolean, t:any): any => {

    if (isClosed) {
        return <span><i className="bi bi-square-fill" style={{color: "blue"}}></i> {t('common.closed')}</span>
    } else if ((capacity-taken) < 1) {
        return <span><i className="bi bi-triangle-fill" style={{color: "orange"}}></i> {t('common.wait-list')}</span>
    }
    return <span><i className="bi bi-circle-fill" style={{color: "green"}}></i> {t('common.open')}</span>
}