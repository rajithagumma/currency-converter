const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg")

for (let select of dropdowns){
    for (currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if (select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if (select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode]
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("form input");
    let amtval=amount.value;
    if (amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    let fCurr=fromCurr.value.toLowerCase();
    let tcr=toCurr.value.toLowerCase();
    const URL=`${BASE_URL}/${fCurr}.json`;
    const response=await fetch(URL);
    const data=await response.json();
    let rate=data[fCurr][tcr];
    let finalAmount=amtval*rate;
    msg.innerText=`${amtval} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;
}) 
