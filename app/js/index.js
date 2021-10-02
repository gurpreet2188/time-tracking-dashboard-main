const daily = document.querySelector('.daily')
const weekly = document.querySelector('.weekly')
const monthly = document.querySelector('.monthly')

// const current = document.querySelector('.current')
// const last= document.querySelector('.last')
let id = 0
// let ids = ['0', '1', '2', '3', '4', '5']
// let tessst = document.getElementById(`${ids[2]}`)
// console.log(tessst)

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
        loadData(setData(data, true, dailyCurrent), 600)
        loadData(setData(data, false, dailyLast), 300)
        
        try {
            daily.classList.add('activated')
            weekly.classList.remove('activated')
            monthly.classList.remove('activated')
            
        } catch (error) {
            console.log('oops')
        }
        
    })
}

function eventWeekly(data) {
    weekly.addEventListener('click', function() {
        loadData(setData(data, true, weekCurrent), 600)
        loadData(setData(data, false, weekLast), 300)
        monthly.classList.add('activated')
        try {
            daily.classList.remove('activated')
            monthly.classList.remove('activated')
            
        } catch (error) {
            console.log('oops')
        }
    })
}

function eventMonthly(data) {
    monthly.addEventListener('click', function() {
        loadData(setData(data, true, monthCurrent), 600)
        loadData(setData(data, false, monthLast), 300)
        weekly.classList.add('activated')
        try {
            weekly.classList.remove('activated')
            daily.classList.remove('activated')
            
            
        } catch (error) {
            console.log('oops')
        }
    })
}

fetch("https://raw.githubusercontent.com/gurpreet2188/time-tracking-dashboard-main/master/data.json")
.then(response => {
    return response.json()
})
.then(data => {
      
       
        loadData(setData(data, true, weekCurrent), 600)
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