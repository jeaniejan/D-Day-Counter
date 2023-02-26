//�럹�씠吏�媛� 濡쒕뱶�릺�?��留덉?�� �떎�뻾�맆 ?��붾뱶
const messageContainer=document.querySelector('#d-day-message');
const container= document.querySelector('#d-day-container');
const savedDate=localStorage.getItem('saved-date');

const intervalIdArr=[];

const dateFormMaker=function(){
    const inputYear=document.querySelector('#target-year-input').value;
    const inputMonth=document.querySelector('#target-month-input').value;
    const inputDate=document.querySelector('#target-date-input').value;

    const dateFormat=`${inputYear}-${inputMonth}-${inputDate}`;//��?��뵆由�?? ?��?�꽣�윺
    //console.log(inputYear,inputMonth,inputDate);

    return dateFormat;
};

//�궇吏� �뜲�씠�꽣?���?? ?���由?�빐以� �븿�닔
const counterMaker=function(data){
    if(data !== savedDate){
        localStorage.setItem('saved-date',data);
    }
    const nowDate=new Date();//�쁽�옱 �궇吏� ?��?��?���샂
    const targetDate=new Date(data).setHours(0,0,0,0);//�듅�젙 �궇吏� ?��?��?���샂
    const remaining=(targetDate-nowDate)/1000;

    if (remaining<=0){
        //留뚯�?? remaining�씠 0蹂�???�� �옉�떎硫�, ����?��?��멸��?? ?��?��즺�릺��??�뒿�땲�떎. ?��?��?��
        container.style.display='none';
        messageContainer.innerHTML='<h3>����?��?��멸��?? ?��?��즺�릺��??�뒿�땲�떎.</h3>';
        messageContainer.style.display='flex';
        setClearInterval();
        return;
    }else if(isNaN(remaining)){
        //留뚯�?? �옒紐삳�?? �궇吏쒓�� �뱾�뼱�솕�떎硫�, ��??�슚�븳 �떆媛꾨��媛� �븘�떃�땲�떎. ?��?��?��
        container.style.display='none';
        messageContainer.innerHTML='<h3>��??�슚�븳 �떆媛꾨��媛� �븘�떃�땲�떎.</h3>';
        messageContainer.style.display='flex';
        setClearInterval();
        return;
    }

    
   // const remainingDate=Math.floor(remaining/3600/24);
   // const remainingHours=Math.floor(remaining/3600)%24;
   // const remainingMin=Math.floor(remaining/60)%60;
   // const remainingSec=Math.floor(remaining)%60;

   const remainingObj={
    remainingDate:Math.floor(remaining/3600 /24),
    remainingHours:Math.floor(remaining/3600)%24,
    remainingMin:Math.floor(remaining/60)%60,
    remainingSec:Math.floor(remaining)%60,
   };

    //const days=document.getElementById('days');
    //const hours=document.getElementById('hours');
    //const min=document.getElementById('min');
    //const sec=document.getElementById('sec');
    const documentArr=['days','hours','min','sec'];
    const timeKeys=Object.keys(remainingObj);

    const format = function(time){//?��?��리수 �? ?��?��?��?�� ?��?�� 0 붙여주기
        if(time<10){
            return '0'+time;
        } else {
            return time;
        }
    };
    
    // for (let i=0; i<timeKeys.length; i++){
    //     documentObj[docKeys[i].textContent=remainingObj[timeKeys[i]]];
    // }

    // for(let key in documentObj){
    //     documentObj[key].textContent=remainingObj[timeKeys[i]]
    //     i++;
    // };  



    let i=0;
    for(let tag of documentArr){
        const remainingTime = format(remainingObj[timeKeys[i]]);
        document.getElementById(tag).textContent=remainingTime;
        i++;
    }
}

    const starter = function(targetDateInput) {
        if (!targetDateInput){
            targetDateInput=dateFormMaker();
        }
        container.style.display='flex';
        messageContainer.style.display='none';
        setClearInterval();//기존?�� 존재?��?�� interval 모두 ?��?��
        counterMaker(targetDateInput);
        const intervalId=setInterval(()=>counterMaker(targetDateInput),1000);
        intervalIdArr.push(intervalId);
        // for(let i=0;i<100;i++){
        //     setTimeout(()=>{
        //         counterMaker();
        // },1000*i);
        // }
    };

    const setClearInterval=function(){
        for(let i=0;i<intervalIdArr.length;i++){
            clearInterval(intervalIdArr[i]);
        }
    };
    //documentObj['days'].textContent=remainingObj['remainingDate'];
    //documentObj['hours'].textContent=remainingObj['remainingHours'];
    //documentObj['min'].textContent=remainingObj['remainingMin'];
    //documentObj['sec'].textContent=remainingObj['remainingSec'];

    const resetTimer= function() {
        container.style.display='none';
        messageContainer.innerHTML='<h3>D-Day�? ?��?��?��주세?��.</h3>';
        messageContainer.style.display='flex';
        localStorage.removeItem('saved-date');
        setClearInterval();
    };

if (savedDate){
    starter(savedDate);
} else {
    container.display='none';
    messageContainer.innerHTML='<h3>D-Day를 입력해주세요.</h3>';
}