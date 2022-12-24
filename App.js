const main=document.getElementById('main');
const addUserButton=document.getElementById('Adduser')
const doublebutton=document.getElementById('double')
const Showmilionaries=document.getElementById('Showmilionaries')
const sort=document.getElementById('sort')
const calculatewealth=document.getElementById('calculatewealth')
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();



let data=[];
 async function getRandomUser(){
    const res =await fetch('https://randomuser.me/api/');
    const data= await res.json();
    const user =data.results[0]
    const newUser ={
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()*1000000)
    };
    addData(newUser)
    
 }
 //double money

 function doublemoney(){
    data=data.map((user)=>{
        return {...user,money:user.money*2}
    })
    updateDOM();
 }
 //filter only millionaires
 function Showmilionar()
 {
    data=data.filter((user)=>{
      return  user.money>1000000
    })
    updateDOM();
 }

 // sort by reachest
 function sortbyreachest()
 {
    data.sort((a,b)=>b.money-a.money)
    updateDOM()
 }

 // calculate wealth
 function Calculatewealth()
 {
    const wealth=data.reduce((acc,user)=>(acc+=user.money),0)
    const wealthEl=document.createElement('div');
    wealthEl.innerHTML=`<h3>Total Wealth:<strong>${formatmoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl)
 }
//addnewobj to data arr
 function addData(obj){

    data.push(obj);
    updateDOM()

 }

 function updateDOM(providedData=data){
    main.innerHTML=' <h2><strong>person</strong>wealth</h2>';
    providedData.forEach(item=>{
        const element =document.createElement('div');
        element.classList.add('person');
        element.innerHTML=`<strong>${item.name}</strong> ${formatmoney(item.money)}`
        main.appendChild(element);
    })

    
 }

 //format number as money
 function formatmoney(number){
   return   '$'+(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67

 }

 //event listener

 addUserButton.addEventListener('click',getRandomUser)
 doublebutton.addEventListener('click',doublemoney)
 Showmilionaries.addEventListener('click',Showmilionar);
 sort.addEventListener('click',sortbyreachest);
 calculatewealth.addEventListener('click',Calculatewealth)
