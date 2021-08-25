/* 
** This is timestamp for your sheet
** Make sure to deploy this code on the same webapp
*/

/* ===================================================Start of Timestamps======================================================================================= */
let unixDate        = new Date
let arrDays         = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu']
let day             = arrDays[unixDate.getDay()]
let date            = unixDate.getDate()
let arrMonths       = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','Nopember','Desember'];
let month           = arrMonths[unixDate.getMonth()]
let arrMonthsID     = [01,02,03,04,05,06,07,08,09,10,11,12]
let monthID         = arrMonthsID[unixDate.getMonth()]
let year            = unixDate.getFullYear()
let arrHours        = [01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,00]
let hour            = arrHours[unixDate.getHours()]
let minutes         = unixDate.getMinutes()
let second          = unixDate.getSeconds()
let milisecond      = unixDate.getMilliseconds()
            
let t               = date + '-' + month + '-' + year + ' ' + hour + ':' + minutes + ':' + second
let tWithDay        = day + ', ' + date + '-' + month + '-' + year + ' ' + hour + ':' + minutes + ':' + second
let orderID         = year + '' + monthID + '' + date + '' + hour + '' + minutes + '' + second
/* ======================================================End of Timestamps======================================================================================= */
