let tabble = document.getElementById('one');


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

     let textBox2 = document.createElement('input');
    textBox2.setAttribute('type', 'text');
    textBox2.setAttribute('placeholder','Blog');

// appending textboxes to columns
    arr[1].appendChild(textBox1);
    arr[2].appendChild(textBox2);


}

console.log();

function DeleteRow(){

}
