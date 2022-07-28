//save products
var mainProducts = new Object();
var products = new Array();

//first index of each page
var firstIndex = 0;

//disable previous button
const previousPageBtn = document.getElementById("previousPageBtn");
previousPageBtn.disabled = true;

fetch('https://dummyjson.com/products?limit=100')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setTimeout(() => {
        mainProducts = data["products"];
        products = data["products"];
        }, 500);
    });

    setTimeout(() => {
        create_table(products);
        }, 1000);


//create empty table 
function create_table(data){
    //add header to table
    var table = document.getElementById("table");
    var header = table.createTHead();
    var headerRow = header.insertRow(0);
    //add header elements
    for( let i = 0; i < Object.keys(data[0]).length; i++){
        var headerCell = headerRow.insertCell(i);
        headerCell.innerHTML = "<b>" + Object.keys(data[0])[i] + "<b>";
    }
    //add 15 row to the table
    for( let i = 0; i < 15; i++){
        var row = table.insertRow(i+1);
        row.id = "row_" + i;
        for( let j = 0; j < Object.keys(data[0]).length; j++){  
            var cell = row.insertCell(j);
            cell.id = "cell_" + j +"_of_row_" + i;
        }
    }
    console.log(data);
    display_products(data, firstIndex);
}
        
//display products in table
function display_products(data, firstIndex) {
    //clear table
    for( let i = 0; i < 15; i++){
        //get row
        var row = document.getElementById("row_" + i);
        for( let j = 0; j < Object.keys(mainProducts[0]).length; j++){
            //get cell j
            var cell = document.getElementById("cell_" + j +"_of_row_" + i);
            cell.innerHTML = "";
        }
    }
    //display all products
    for( let i = 0; i < data.length &&  i < 15; i++){
        //get row
        var row = document.getElementById("row_" + i);
        for( let j = 0; j < Object.keys(data[0]).length; j++){
            //get cell j
            var cell = document.getElementById("cell_" + j +"_of_row_" + i); 
            let keyName = Object.keys(data[0])[j];
            cell.innerHTML = data[i + firstIndex][keyName];
        }
    }
}


//sort products
function sortTable(){
    var selectBox = document.getElementById("sort");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    //sort by string
    if( typeof products[0][selectedValue] === 'string'){
        products = products.sort((a, b) =>  a[selectedValue].localeCompare(b[selectedValue]));
    }else{   //other types of sorting
        products = products.sort((a, b) => a[selectedValue] - b[selectedValue]);
    }
    display_products(products, firstIndex);

}
         
//search for a title
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", search_title);
function search_title() {
    //get searched value
    var searchedTitle = searchInput.value;
    products = new Array();
    for( let i = 0; i < mainProducts.length; i++){
        if ( mainProducts[i]["title"].indexOf(searchedTitle) != -1){
            products.push(mainProducts[i]);
        }
    }
    firstIndex = 0;
    //disable next page button 
    if(firstIndex + 15 >= products.length){
        nextPageBtn.disabled = true;
    }else{
        nextPageBtn.disabled = false;
    }
    display_products(products, firstIndex);
}

//next page button
const nextPageBtn = document.getElementById("nextPageBtn");
nextPageBtn.addEventListener("click", nextPageTable);
function nextPageTable() {
    firstIndex += 15;
    //disable or enable button
    previousPageBtn.disabled = false;
    if(firstIndex + 15 >= products.length){
        nextPageBtn.disabled = true;
    }
    display_products(products, firstIndex);
}

//previous page button
previousPageBtn.addEventListener("click", previousPageTable);
function previousPageTable() {
    firstIndex -= 15;
    //disable or enable button
    nextPageBtn.disabled = false;
    if(firstIndex <= 0){
        previousPageBtn.disabled = true;
    }
    display_products(products, firstIndex);
}

