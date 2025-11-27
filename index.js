// acessing table element
let tabble = document.getElementById('one');

// creating array of tr elements
 numRows = document.getElementsByTagName('tr');

 
 // gathering titles and contents
  let input_array1 = document.getElementsByClassName('BlogTitle');
  let input_array2 = document.getElementsByClassName('BlogContent');

  function deleteLastElement(arr) {
    if (arr.length > 0) {
        arr.length = arr.length - 1;
    }
}

function AddRow(){
    // creating array
    let arr = [1,2,3];
    // generating row element
    let tableRow = document.createElement('tr');
    //generating column elements and putting into array
    for(let i = 0; i<2; i++){
        arr[i+1] = document.createElement('td');
    }
    // putting row element into first slot of array
    arr[0] = tableRow;
    // appending rows and columns into their proper spaces
    tabble.appendChild(tableRow);
    tableRow.appendChild(arr[1]);
    tableRow.appendChild(arr[2]);

    //setting content of columns;

    let textBox1 = document.createElement('input');
    textBox1.setAttribute('type', 'text');
    textBox1.setAttribute('placeholder','BlogName');
    textBox1.setAttribute('class','BlogTitle');
    
    // here we should try to create a mechanism that saves the data
   input_array1[input_array1.length] = textBox1;

     let textBox2 = document.createElement('input');
    textBox2.setAttribute('type', 'text');
    textBox2.setAttribute('placeholder','Blog');
    textBox2.setAttribute('class','BlogContent');

    // here we should try to create a mechanism that saves the data
    input_array2[input_array2.length] = textBox2;

    

// appending textboxes to columns
    arr[1].appendChild(textBox1);
    arr[2].appendChild(textBox2);

    //saving info
    SaveInfo();


}


function DeleteRow(){

    if(numRows.length ==2){
        return 0;
        

    }
    else{
        tabble.removeChild(numRows[(numRows.length)-1]);
        deleteLastElement(input_array1);
        deleteLastElement(input_array2);

    }
    SaveInfo();

}
let firstTime = 0;

let table_info = [];

function SaveInfo(){

    arr1 = [];
    



   //getting values of input elements
    for(let i = 0; i< input_array1.length;i++){
        arr1.push(
            {
            title : input_array1[i].value,
            content: input_array2[i].value

            
        })
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
    
}








    

