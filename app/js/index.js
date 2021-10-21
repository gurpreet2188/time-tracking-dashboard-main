const daily = document.querySelector('.daily')
const weekly = document.querySelector('.weekly')
const monthly = document.querySelector('.monthly')

let id = 0


let loadData = (loadD, time)=> {
    return new Promise ((resolve, reject) => {
        if( id>0 && id <7) {
            setTimeout(() => {
                resolve(loadD())
            }, time)
        }else {
            reject()
        }
    })
}

function setData(data, value, e) {
    let cd = 0
    let ld = 0
    let ldNum = 6
    for (i = 0; i<6; i++) {
        ldNum += 1
        id = i
        if(value) {
           cd = e(data, i)
           document.getElementById(`${i}`).innerHTML = `${cd}hrs`
        } else {
            ld = e(data, i)
            document.getElementById(`${ldNum}`).innerHTML = `Last Week - ${ld}hrs`
        } 
    }
    id = 0
    ldNum = 6
    
}

function eventDaily(data) {
    daily.addEventListener('click', function() {
        loadData(setData(data, true, dailyCurrent), 0)
        loadData(setData(data, false, dailyLast), 300)
        daily.classList.add('activated')
        weekly.classList.remove('activated')
        monthly.classList.remove('activated')
       
        
    })
}

function eventWeekly(data) {
    weekly.addEventListener('click', function() {
        loadData(setData(data, true, weekCurrent), 0)
        loadData(setData(data, false, weekLast), 300)
        weekly.classList.add('activated')
        daily.classList.remove('activated')
        monthly.classList.remove('activated')
    
    })
}

function eventMonthly(data) {
    monthly.addEventListener('click', function() {
        loadData(setData(data, true, monthCurrent), 0)
        loadData(setData(data, false, monthLast), 300)
        monthly.classList.add('activated')
        weekly.classList.remove('activated')
        daily.classList.remove('activated')
       
    })
}

fetch("https://raw.githubusercontent.com/gurpreet2188/time-tracking-dashboard-main/master/data.json")
.then(response => {
    return response.json()
})
.then(data => {
      
       
        loadData(setData(data, true, weekCurrent), 0)
        loadData(setData(data, false, weekLast), 300)
        weekly.classList.add('activated')
        eventDaily(data)
        eventMonthly(data)
        eventWeekly(data)
    
})


function weekCurrent(data, i) {
    return data[i].timeframes.weekly.current
}
function weekLast(data, i) {
    return data[i].timeframes.weekly.previous
}
function monthCurrent(data, i) {
    return data[i].timeframes.monthly.current
}
function monthLast(data, i) {
    return data[i].timeframes.monthly.previous
}
function dailyCurrent(data, i) {
    return data[i].timeframes.daily.current
}
function dailyLast(data, i) {
    return data[i].timeframes.daily.previous
}