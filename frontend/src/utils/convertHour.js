function convertHour(theHour) {

    
    let hour = Number.parseInt(theHour.split(":")[0]) - 3
    console.log(hour)

    if(hour === -3) {
        hour = 21
    }
    else if(hour === -2) {
        hour = 22
    }
    else if(hour === -1) {
        hour = 23
    }

    let minutes = theHour.split(":")[1] 
    let seconds = theHour.split(":")[2] 

    let formatedHour = `${hour === 0 ? hour + '0' : hour}:${minutes}:${seconds === 0 ? seconds + '0' : seconds}`

    return formatedHour
}

export {convertHour}