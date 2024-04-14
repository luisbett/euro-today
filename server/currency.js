module.exports = async () => {
    
    //Get dates
    let dateToday = new Date()
    let dateLessThirty = new Date()
    let dateTodayDay = dateToday.getDate().toString()
    let dateTodayMonth = (dateToday.getMonth()+1).toString()
    let dateTodayYear = dateToday.getFullYear().toString()
    let dateRange = ""

    dateLessThirty.setDate(dateToday.getDate() - 30)

    let dateLessThirtyDay = dateLessThirty.getDate().toString()
    let dateLessThirtyMonth = (dateLessThirty.getMonth()+1).toString()
    let dateLessThirtyYear = dateLessThirty.getFullYear().toString()

    //Create string to be sent within API
    dateRange = dateLessThirtyYear + "-" +
                ( dateLessThirtyMonth.length < 2 ? "0" + dateLessThirtyMonth : dateLessThirtyMonth ) + "-" +
                ( dateLessThirtyDay.length < 2 ? "0" + dateLessThirtyDay : dateLessThirtyDay ) + ".." +
                dateTodayYear + "-" +
                ( dateTodayMonth.length < 2 ? "0" + dateTodayMonth : dateTodayMonth ) + "-" +
                ( dateTodayDay.length < 2 ? "0" + dateTodayDay : dateTodayDay )

    //Call API
    try {
        const res = await fetch(`https://api.frankfurter.app/${dateRange}?to=BRL`)

        const data = await res.json()

        return data
    } catch (error) {
        console.error(error)
    }
}