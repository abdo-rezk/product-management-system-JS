let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let category=document.getElementById('category')
let submit=document.getElementById('submit')
let mood='create';
let idxOfUpdate;

// get total
function getTotal(){
    if(price.value !=''){
        let res=(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerText=res;
        total.style.background='green';
    }else{
        total.innerText='';
        total.style.background='rgb(100, 11, 11)';
    }
}
 
//create product and save in localstorage
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
    category:category.value,
}
if(title.value!=''&&price.value!=''&& count.value<=100){
if(mood === 'create'){
    //count
    if(newpro.count>1){
        for(let i=0;i<newpro.count;i++)
        datapro.push(newpro);

    }else{
        datapro.push(newpro);
    }
}
else{
    datapro[idxOfUpdate]=newpro; 
    mood='create';
    submit.innerHTML='Create';
    count.style.display='block';
}
clearData();
}
//save data
localStorage.setItem('product',JSON.stringify(datapro));

showData();
}

//clean inputs
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
    total.style.background='rgb(100, 11, 11)';
}

//read 
function showData(){
    let table=''
    for(let i=0;i<datapro.length;i++){
        table+=
        `
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
        }
    document.getElementById('tbody').innerHTML=table;
    
    let btnDelete=document.getElementById('deleteAll');
    if(datapro.length>0){
        btnDelete.innerHTML=
        `
        <button onclick="deleteAll()">Delete All (${datapro.length})</button>
        `
    }else{
        btnDelete.innerHTML='';
    }
}
showData();

//delete
function deleteData(id){
    datapro.splice(id,1);
    localStorage.product=JSON.stringify(datapro);
    showData();
}

//delete All
function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showData();
}
//update
function updateData(id){
    title.value=datapro[id].title;
    price.value=datapro[id].price;
    taxes.value=datapro[id].taxes;
    ads.value=datapro[id].ads;
    discount.value=datapro[id].discount;
    getTotal();
    count.style.display='none';
    category.value=datapro[id].category;
    submit.innerHTML='Update'; 
    mood='update';
    idxOfUpdate=id;
    scroll({
        top:0,
        behavior:'smooth'
    })
}
//search
let searchmood='title'
function dosearch(id){
    let search=document.getElementById('search');
    if(id=='searchTitle'){
        searchmood='title';
      
}else{
    searchmood='category';
}
search.placeholder='search by '+searchmood;
search.focus();
search.value='';
showData();
}

function searchData(value){

    let table='';
    if(searchmood === 'title'){
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].title.toLowerCase().includes(value.toLowerCase())){
                table+=
                `
                <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `
            }
        }
    }else{
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].category.toLowerCase().includes(value.toLowerCase())){
                table+=
                `
                <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;
   
}