
let studybtn = document.getElementById('studybtn')
let shortbtn = document.getElementById('shortbtn')
let longbtn = document.getElementById('longbtn')
let startbtn = document.getElementById('start')
let pause = document.getElementById('stop')
let reset= document.getElementById('reset')
let time = document.getElementById("time")

let set;
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;

const startSound = new Audio('clock.mp3');
startSound.loop = true; 
const endSound = new Audio('alarm-clock.mp3');

function pauseTimer() {
    paused = true;
    clearInterval(set); 
    startSound.pause();
    startSound.currentTime = 0;
    endSound.pause();
    endSound.currentTime = 0;
}
reset.addEventListener("click", () => {
    pauseTimer();
    count = 59;
    minCount = 24;
    time.textContent = `${minCount + 1}:00`;
    reset.classList.remove("show"); 
    pause.classList.remove("show"); 
    startbtn.classList.remove("hide"); 
});

studybtn.addEventListener("click", () => {
    removeFocus();
    studybtn.classList.add("study-btn-timer");
    pauseTimer();
    count = 59;
    minCount = 24;
    time.textContent = `${minCount + 1}:00`;
    changeBackgroundColor("lightblue");
    changeTheme("#00588A", "white","#00588A","#00588A","lightslategray","black"); 


})

shortbtn.addEventListener("click", () => {
    removeFocus();
    shortbtn.classList.add("study-btn-timer");
    pauseTimer();
    count = 59;
    minCount = 4;
    time.textContent = `${minCount + 1}:00`;
    changeBackgroundColor("#D6DAC8"); 
    changeTheme("#B47B84", "black","#C75B7A","#C75B7A","#9CAFAA","black"); 
})
   

longbtn.addEventListener("click", () => {
    removeFocus();
    longbtn.classList.add("study-btn-timer");
    pauseTimer();
    count = 59;
    minCount = 14;
    time.textContent = `${minCount + 1}:00`;
    changeBackgroundColor("#EEEEEE"); 
    changeTheme("#D4BEE4", "#3B1E54", "#3B1E54", "#3B1E54","#987D9A","#3B1E54");
   

})

pause.addEventListener("click", ()=>{
    paused=true;
    pauseTimer()
    clearInterval(set);
    startbtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.add("show");

})

startbtn.addEventListener("click", () => {
    reset.classList.add("show");
    pause.classList.add("show");
    startbtn.classList.add("hide");
    if(paused){
        paused=false;
        time.textContent=`${appendZero(minCount)}:${appendZero(count)}`;
        startSound.play();
        set= setInterval( ()=> {
            count--;
        time.textContent=`${appendZero(minCount)}:${appendZero(count)}`;
        if(count== 0){
            if(minCount!=0){
                minCount--;
                count=60;
            }else{
                clearInterval(set);
                pauseTimer();
                endSound.play();
                switchToStudyTime();
            }
        }

        },1000);
    }
})

function removeFocus() {
    studybtn.classList.remove("study-btn-timer");
    shortbtn.classList.remove("study-btn-timer");
    longbtn.classList.remove("study-btn-timer");
}

const appendZero = (num) => (num < 10 ? `0${num}` : num);


function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}
function changeTheme(buttoncolor,textcolor,timeColor,headingColor, containerColor,border){
    document.body.style.color=textcolor;
    [studybtn,shortbtn,longbtn,startbtn,pause,reset,settingsIcon].forEach(button => {
        button.style.backgroundColor=buttoncolor;
        button.style.color=textcolor;
        button.style.borderColor=border;
    settingsIcon.style.color =containerColor; 


    });
    time.style.color = timeColor;

    const heading = document.querySelector("h1");
    if (heading) {
        heading.style.color = headingColor;
    }
    const container = document.querySelector(".container"); 
    if (container) {
        container.style.backgroundColor = containerColor;
       
    }

    settingsIcon.style.backgroundColor = "transparent"; 
    settingsIcon.style.borderColor = "transparent"; 
}

function switchToStudyTime() {
    minCount = 24;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
    changeBackgroundColor("lightblue");
    changeTheme("#00588A", "white", "#00588A", "#00588A", "lightslategray", "black");

   
    startSound.play();
    set = setInterval(() => {
        count--;
        time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;

        if (count === 0) {
            if (minCount !== 0) {
                minCount--;
                count = 60;
            } else {
                clearInterval(set);
                pauseTimer();
                endSound.play();
            }
        }
    }, 1000);
}

const settingsIcon = document.getElementById("settingsIcon");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");
const saveSettings = document.getElementById("saveSettings");
const minutesInput = document.getElementById("minutes");

settingsIcon.addEventListener("click", () => {
    settingsModal.style.display = "block";
});

closeSettings.addEventListener("click", () => {
    settingsModal.style.display = "none";
});

saveSettings.addEventListener("click", () => {
    const customMinutes = parseInt(minutesInput.value, 10);
    if (!isNaN(customMinutes) && customMinutes > 0) {
        pauseTimer(); 
        minCount = customMinutes - 1;
        count = 59;
        time.textContent = `${appendZero(customMinutes)}:00`;
        settingsModal.style.display = "none"; 
    } else {
        alert("Please enter a valid number greater than 0.");
    }
});

window.addEventListener("click", (event) => {
    if (event.target === settingsModal) {
        settingsModal.style.display = "none";
    }
});

