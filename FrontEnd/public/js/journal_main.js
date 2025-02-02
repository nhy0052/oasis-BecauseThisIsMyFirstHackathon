// ================================
// START YOUR APP HERE
// ================================
const init = {
  monList: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  dayList: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  today: new Date(),
  monForChange: new Date().getMonth(),
  activeDate: new Date(),
  getFirstDay: (yy, mm) => new Date(yy, mm, 1),
  getLastDay: (yy, mm) => new Date(yy, mm + 1, 0),
  nextMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(++this.monForChange);
    this.activeDate = d;
    return d;
  },
  prevMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(--this.monForChange);
    this.activeDate = d;
    return d;
  },
  addZero: (num) => (num < 10 ? "0" + num : num),
  activeDTag: null,
  getIndex: function (node) {
    let index = 0;
    while ((node = node.previousElementSibling)) {
      index++;
    }
    return index;
  },
};

const $calBody = document.querySelector(".cal-body");
const $btnNext = document.querySelector(".btn-cal.next");
const $btnPrev = document.querySelector(".btn-cal.prev");

/**
 * @param {number} date
 * @param {number} dayIn
 */
function loadDate(date, dayIn) {
  document.querySelector(".cal-date").textContent = date;
  document.querySelector(".cal-day").textContent = init.dayList[dayIn];
}

/**
 * @param {date} fullDate
 */
function loadYYMM(fullDate) {
  let yy = fullDate.getFullYear();
  let mm = fullDate.getMonth();
  let firstDay = init.getFirstDay(yy, mm);
  let lastDay = init.getLastDay(yy, mm);
  let markToday; // for marking today date

  if (mm === init.today.getMonth() && yy === init.today.getFullYear()) {
    markToday = init.today.getDate();
  }

  document.querySelector(".cal-month").textContent = init.monList[mm];
  document.querySelector(".cal-year").textContent = yy;

  let trtd = "";
  let startCount;
  let countDay = 0;
  for (let i = 0; i < 6; i++) {
    trtd += "<tr>";
    for (let j = 0; j < 7; j++) {
      if (i === 0 && !startCount && j === firstDay.getDay()) {
        startCount = 1;
      }
      if (!startCount) {
        trtd += "<td>";
      } else {
        let fullDate =
          yy + "." + init.addZero(mm + 1) + "." + init.addZero(countDay + 1);
        trtd += '<td class="day';
        trtd += markToday && markToday === countDay + 1 ? ' today" ' : '"';
        trtd += ` data-date="${countDay + 1}" id="${fullDate}">`;
      }
      trtd += startCount ? ++countDay : "";
      if (countDay === lastDay.getDate()) {
        startCount = 0;
      }
      trtd += "</td>";
    }
    trtd += "</tr>";
  }
  $calBody.innerHTML = trtd;
}

let MyDate = '2022.07.13';

/**
 * @param {string} val
 */
function createNewList(val) {
  let id = new Date().getTime() + "";
  let yy = init.activeDate.getFullYear();
  let mm = init.activeDate.getMonth() + 1;
  let dd = init.activeDate.getDate();
  const $target = $calBody.querySelector(`.day[data-date="${dd}"]`);

  let date = yy + "." + init.addZero(mm) + "." + init.addZero(dd);

  let eventData = {};
  eventData["date"] = date;
  eventData["memo"] = val;
  eventData["complete"] = false;
  eventData["id"] = id;
  init.event.push(eventData);
  $todoList.appendChild(createLi(id, val, date));
}

loadYYMM(init.today);
loadDate(init.today.getDate(), init.today.getDay());

$btnNext.addEventListener("click", () => loadYYMM(init.nextMonth()));
$btnPrev.addEventListener("click", () => loadYYMM(init.prevMonth()));

$calBody.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.classList.contains("day")) {
    if (init.activeDTag) {
    }
    let day = Number(e.target.textContent);
    loadDate(day, e.target.cellIndex);

    // console.log("월화수목금",npe.target.cellIndex);

    e.target.classList.add("day-active");
    init.activeDTag = e.target;

    init.activeDate.setDate("월화수목금",day);

    // console.log("날짜",day);
    // console.log($calBody.querySelector(`.day[data-date]`));
    // console.log(`.day[data-date]`);


    // 날짜
    // MyDate = e.target;
    // console.log(a.id);
    console.log(e.target.id);
    if(e.target.id===MyDate){
      console.log("날짜가 같아요");
    }

    


  }
});

function showCalender(){
  fetch(`http://localhost:3000/api/journal/record`)   
  .then((response) => response.text())
  .then((result) => { 
  Datas = JSON.parse(result);
  // console.log(result);
  // console.log(Datas);


  showDate(Datas);

});
}

// 새로고침하면 보이게
showCalender();

document.querySelector(".prev").addEventListener("click",showCalender);
document.querySelector(".next").addEventListener("click",showCalender);

let myDate = getArr();
console.log(myDate);

const testArr = ['2022.07.01','2022.07.10','2022.07.25'];


// 달력에 항해 날 표시하기

function showDate(exDatas) {
  const parent = document.querySelector(".cal-body");
  const pCount = parent.childElementCount;
  
  for (let i = 0;i<pCount;i++){
    let child1 = parent.childNodes[i];
    let childCount = parent.childNodes[i].childElementCount;
  
  
    for(let j=0;j<childCount;j++){
      let dateID = child1.childNodes[j].id;
  
  
      for(let c=0;c<exDatas.result.length;c++){
  
        if(exDatas.result[c].journalDate.replaceAll('-','.') ===dateID){
          child1.childNodes[j].classList.add("day-active");
        }
      }  
    }
  }
}







