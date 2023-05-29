const getDateDays = (date : Date) => {
    const modifiedDate = ("0" + date.getDate()).slice(-2);

    return modifiedDate
};

const getDateMonthShort = (date: Date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
    const modifiedDate = monthNames[date.getMonth()]

    return modifiedDate
}

export { 
    getDateDays,
    getDateMonthShort
}