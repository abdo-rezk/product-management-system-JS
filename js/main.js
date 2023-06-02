let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let category=document.getElementById('category')
let submit=document.getElementById('submit')
// get total
function getTotal(){
    if(price.value !=''){
        let res=(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerText=res;
        total.style.background='green';
    }else{
        total.innerText='';
        total.style.background='red';
    }
}
 
//create product
let datapro;
if(localStorage.product!=null){
    datapro=JSON.parse(localStorage.product);
}
else{
datapro=[];
}
submit.onclick=function(){
let newpro={
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category,
}
datapro.push(newpro);
localStorage.setItem('product',JSON.stringify(datapro));

clearData();
}

//clean data
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}
//save data in localstorage
//cleare inputs
//read 
//count
//delete
//update
//search