//Author: Harsh Dagar 
//regEx5440@GitHub
//OSC AutoSender 
//License: mit

var panel = document.createElement('div'); panel.id = "content";
panel.innerHTML = `
<input type="number" name="drafted" id="drafted_mails" placeholder="Drafted Cases" min=1 title="Number of cases that are drafted and opened">
        <div class="time_logout">
            <label for="interval" title="Set the time interval in minutes between each sent">
                <span>Time Interval:</span>
                <input type="number" name="interval" id="agent_defined_interval" placeholder="1" value=1 min=1>
                <span>min(s)</span>
            </label>
        </div>
        <div id="senderMachine">Initiate</div>
`;
/* Auto logout structure
<br/>
        <label for="five_thirty">
            <input type="radio" name="shift_logout" id="five_thirty" value="5:30" checked>5:30AM
        </label>
        <label for="seven_thirty">
            <input type="radio" name="shift_logout" id="seven_thirty" value="7:30">7:30AM
        </label>
            <label for="auto_logout">
                <input type="checkbox" name="logout" id="auto_logout">
                <span>Auto Logout</span>
            </label>
*/
const bodyElement = document.getElementsByTagName('body')[0];
bodyElement.appendChild(panel);

//Animation Element
const animElement = document.createElement('div'); animElement.id = "workingAnim";
const outerElement = document.createElement('div'); outerElement.id = "outer";
const internalDiv = document.createElement('div');
outerElement.appendChild(internalDiv);
animElement.appendChild(outerElement);
bodyElement.appendChild(animElement);

//Global Variables are here
var universalInterval = null;  // TIme Interval variable for Auto sender 

function timeOut(btn) {
    //Clear the internval of btn and change button back to start
    clearInterval(universalInterval);
    btn.innerHTML = 'Start';
    universalInterval = null;
    workingAnimation(false);
}

function toastMessage(msg, time_in_seconds) {
    // Show a pop up message for time_in_seconds seconds
    const msg_container = document.createElement('div'); msg_container.id = "toast";
    msg_container.style = "position:absolute; top: 100px; left: 50%; transform: translate(-50%,-50%); padding: 10px 20px; background-color: lightgreen; color: white;font-size: 14px;";
    msg_container.innerHTML = msg;
    document.getElementsByTagName('body')[0].appendChild(msg_container);
    setTimeout(() => {
        msg_container.remove();
    }, time_in_seconds * 1000);
}

function workingAnimation(status) {
    (status) ? animElement.style.display = "block" : animElement.style.display = "none";
}

function log_out() { //This function is inaccessible
    console.log("Clicked on Logo");
    document.getElementById('userMenuIcon').click();
    setTimeout(() => {
        let myelef = document.getElementsByTagName('oj-menu')[0].getElementsByTagName('oj-option')[2];
        for(let i=1;i<=2;i++){
            fireKey(myelef.documentElement);
        }
        //myelef.setAttribute('tabindex',"-2");
        myelef.click();
       /* myelef.parentElement.getElementsByTagName('oj-option')[0].className = "oj-complete oj-menu-item";
        myelef.className += ' oj-focus oj-focus-highlight';
        setTimeout(() => {
            myelef.getElementsByTagName('a')[0].focus();
            myelef.click();
        }, 1000);*/
    }, 2000);
}
function check_logout(shift_time, currentTime, bekar) {  //Inaccessible
    //Check if its time for logout
    if (shift_time.getHours() == currentTime.getHours()) {
        if (shift_time.getMinutes() <= currentTime.getMinutes()) {
            clearInterval(bekar);
            log_out();
            console.log('Logged Out!');
            //A Shutdown function need to be added in it
        }
    } else {
        console.log('Currently Logged In');
    }
}

function senderInitiate(start_btn) {
    if (universalInterval === null) {
        let minutes = parseInt(document.getElementById('agent_defined_interval').value);
        let drafted = document.getElementsByClassName('Send&');
        let ndrafted = drafted.length;
        let currentTime = new Date(); setInterval(() => { currentTime = new Date(); }, 1000);  // Update current time in every second
        /*              Auto Logout functions
        let shift_end_time = new Date();
        let isLogOutEnabled = document.getElementById('auto_logout').checked;  //Get data from logout button
        if (isLogOutEnabled) {
            (document.getElementById('five_thirty')) ? shift_end_time.setHours(5, 30, 0, 0) : shift_end_time.setHours(7, 30, 0, 0);
            toastMessage(`Auto Logout enabled for ${shift_end_time.getHours()}:${shift_end_time.getMinutes()}`, 4);
            let bekar = setInterval(() => { check_logout(shift_end_time, currentTime, bekar); }, 4 * 60 * 1000); //Check logout time every 4 minutes.
        } else {
            toastMessage("Auto Logout not enabled", 3);
        }
        */
        if (ndrafted != parseInt(document.getElementById('drafted_mails').value) || ndrafted <= 0) {
            alert('Check the entered values or opened cases again!\nNo cases will be autosend');
        } else {
            start_btn.innerHTML = 'Stop';
            workingAnimation(true);
            let sent = ndrafted - 1;
            universalInterval = setInterval(() => { //Interval sender
                drafted[sent].click();  //Sent and close the case
                setTimeout(() => {
                    document.getElementsByTagName('oj-button')[0].click();
                    toastMessage(`Last Email was sent at ${currentTime.getHours()}:${currentTime.getMinutes()}`, 25);  //Show a pop up message with last email sent time
                }, 4500);
                sent--;
                document.getElementById('drafted_mails').value = sent + 1;
                if (sent < 0) {   /// This will stop the interval timer if all cases are sent;
                    timeOut(start_btn);
                }
            }, minutes * 60 * 1000);
        }
    } else {
        timeOut(start_btn);
    }
}

setTimeout(() => {
    //attach onclick listener with delay of 4 secs, so all elements are loaded
    var start_machine_btn = document.getElementById('senderMachine');
    start_machine_btn.addEventListener('click', () => { senderInitiate(start_machine_btn); });
}, 4000);

/*
setTimeout(() => {
    document.getElementById('logo').addEventListener('click', log_out);
}, 7000);
*/