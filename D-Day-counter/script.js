//페이지가 로드되자마자 실행될 코드
const messageContainer=document.querySelector('#d-day-message');
const container= document.querySelector('#d-day-container');
const intervalIdArr=[];

container.style.display='none';
messageContainer.innerHTML='<h3>D-Day를 입력해주세요.</h3>';

const dateFormMaker=function(){
    const inputYear=document.querySelector('#target-year-input').value;
    const inputMonth=document.querySelector('#target-month-input').value;
    const inputDate=document.querySelector('#target-date-input').value;

    const dateFormat=`${inputYear}-${inputMonth}-${inputDate}`;
    //console.log(inputYear,inputMonth,inputDate);

    return dateFormat;
};

const counterMaker=function(){
    const targetDateInput=dateFormMaker();
    const nowDate=new Date();
    const targetDate=new Date(targetDateInput).setHours(0,0,0,0);
    const remaining=(targetDate-nowDate)/1000;
    if (remaining<=0){
        //만약 remaining이 0보다 작다면, 타이머가 종료되었습니다. 출력
        container.style.display='none';
        messageContainer.innerHTML='<h3>타이머가 종료되었습니다.</h3>';
        messageContainer.style.display='flex';
        setClearInterval();
        return;
    }else if(isNaN(remaining)){
        //만약 잘못된 날짜가 들어왔다면, 유효한 시간대가 아닙니다. 출력
        container.style.display='none';
        messageContainer.innerHTML='<h3>유효한 시간대가 아닙니다.</h3>';
        messageContainer.style.display='flex';
        setClearInterval();
        return;
    }
console.log('함수 종료 안됨');
    
   // const remainingDate=Math.floor(remaining/3600/24);
   // const remainingHours=Math.floor(remaining/3600)%24;
   // const remainingMin=Math.floor(remaining/60)%60;
   // const remainingSec=Math.floor(remaining)%60;

   const remainingObj={
    remainingDate:Math.floor(remaining/3600/24),
    remainingHours:Math.floor(remaining/3600)%24,
    remainingMin:Math.floor(remaining/60)%60,
    remainingSec:Math.floor(remaining)%60,
   };

    //const days=document.getElementById('days');
    //const hours=document.getElementById('hours');
    //const min=document.getElementById('min');
    //const sec=document.getElementById('sec');

    const documentObj={
        days:document.getElementById('days'),
        hours:document.getElementById('hours'),
        min:document.getElementById('min'),
        sec:document.getElementById('sec'),
    }

    const timeKeys=Object.keys(remainingObj);
    const documentArr=['days','hours','min','sec'];

    const format=function(time){
        if(time<10){
            return '0'+time;
        }else{
            return time;
        }
    };

    for (let i=0; i<timeKeys.length; i++){
        documentObj[docKeys[i].textContent=remainingObj[timeKeys[i]]];
    }

    let i=0;
    for(let tag of documentArr){
        const remainingTime=format(remainingObj[timeKeys[i]]);
        document.getElementById(tag).textContent=remainingObj[timeKey];
    }

    const starter=function(){
        const intervalIdArr=[]
        container.style.display='flex'
        messageContainer.style.display='none';
        setClearInterval();
        counterMaker(targetDateInput);
        const intervalId=setInterval(()=> counterMaker[targetDateInput],1000);
        intervalIdArr.push(intervalId);
    };

    const setClearInterval=function(){
        for(let i=0;i<intervalIdArr.length;i++){
            clearInterval(intervalIdArr[i]);
        }
    }
    //documentObj['days'].textContent=remainingObj['remainingDate'];
    //documentObj['hours'].textContent=remainingObj['remainingHours'];
    //documentObj['min'].textContent=remainingObj['remainingMin'];
    //documentObj['sec'].textContent=remainingObj['remainingSec'];

    const resetTimer= function() {
        container.style.display='none';
        messageContainer.innerHTML='<h3>D-Day를 입력해주세요.</h3>';
        container.style.display='flex';
        setClearInterval();
    }
}