
    // acessing table element
let tabble = document.getElementById('one');

// creating array of tr elements
let numRows = document.getElementsByClassName('row');  

// gathering titles and contents - use proper arrays
let input_array1 = [];
let input_array2 = [];

function deleteLastElement(arr) {
    if (arr.length > 0) {
        arr.length = arr.length - 1;
    }
}

function AddRow(title = '', content = '', shouldSave = true){ 
    // creating array
    let arr = [1,2,3];
    // generating row element
    let tableRow = document.createElement('div');
    tableRow.setAttribute('class', "row");
    
    //generating column elements and putting into array
    for(let i = 0; i<2; i++){
        arr[i+1] = document.createElement('div');
    }
    // putting row element into first slot of array
    arr[0] = tableRow;

    arr[1].setAttribute('class', 'cell');
    arr[1].setAttribute('id', 't');

    //setting class and id types of  columns
    arr[2].setAttribute('class', 'cell');
    arr[2].setAttribute('id', 'c');

    
    // appending rows and columns into their proper spaces
    tabble.appendChild(tableRow);
    tableRow.appendChild(arr[1]);
    tableRow.appendChild(arr[2]);

    //setting content of columns;
    let textBox1 = document.createElement('input');
    textBox1.setAttribute('type', 'text');
    textBox1.setAttribute('placeholder','BlogName');
    textBox1.setAttribute('class','BlogTitle');
    textBox1.value = title;
    
    // here we should try to create a mechanism that saves the data
    input_array1.push(textBox1);

    let textBox2 = document.createElement('input');
    textBox2.setAttribute('type', 'text');
    textBox2.setAttribute('placeholder','Blog');
    textBox2.setAttribute('class','BlogContent');
    textBox2.value = content;

    // here we should try to create a mechanism that saves the data
    input_array2.push(textBox2);

    // appending textboxes to columns
    arr[1].appendChild(textBox1);
    arr[2].appendChild(textBox2);

    // Update numRows reference
    numRows = document.getElementsByClassName('row');

    // Only save if this is a new row, not when loading
    if (shouldSave) {  //  Only save when shouldSave is true
        SaveInfo();
    }
}

function DeleteRow(){
    // Update numRows reference
    numRows = document.getElementsByClassName('row');

    if(numRows.length <= 1){ // Keep at least one row
        return;
    }
    else{
        tabble.removeChild(numRows[(numRows.length)-1]);
        deleteLastElement(input_array1);
        deleteLastElement(input_array2);
    }
    SaveInfo();
}

let table_info = [];

function SaveInfo(){
    let arr1 = [];  

    //getting values of input elements
    for(let i = 0; i < input_array1.length; i++){
        arr1.push({
            title: input_array1[i].value,
            content: input_array2[i].value
        });
    }
    
    table_info = arr1;
    console.log(table_info);

    fetch('http://localhost:3000/index', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(table_info)
    })
    .then(response => response.text())
    .then(data => console.log('Save successful:', data))
    .catch(error => console.error('Error saving:', error));
}

async function loadSavedData() {
    try {
        const response = await fetch('http://localhost:3000/data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const savedData = await response.json();
        
        console.log('Loaded data:', savedData);
        
        // Clear existing rows 
        clearExistingRows();
        
        // Populate table with saved data
        if (savedData && savedData.length > 0) {
            savedData.forEach(item => {
                AddRow(item.title, item.content, false);  //dont save during load
            });
        }
    } catch (error) {
        console.error('Error loading saved data:', error);
    }
}

// Function to clear existing rows (except the first one if it's a header)
function clearExistingRows() {
     // Get all current rows
    const rows = Array.from(tabble.querySelectorAll('.row'));
    
    // If we have more than 1 row, remove all except the first
    if (rows.length > 1) {
        for (let i = rows.length - 1; i >= 1; i--) {
            // Double-check the row is still in the table before removing
            if (rows[i].parentNode === tabble) {
                tabble.removeChild(rows[i]);
            }
        }
    }
    
    // Clear the input arrays
    input_array1 = [];
    input_array2 = [];
    
    // Update numRows reference
    numRows = document.getElementsByClassName('row');
}

// Add at the bottom of script.js
document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
});




           
