let buffer = '0';
let runningTotal = 0;
let previousOperator = undefined;
let containDot = false;
let conrainMinus = false;


const screen = document.querySelector('.screen');
const all_buttons = document.querySelectorAll('.calc_btns .calc_btn');

function buttonClick(value){
    if(isNaN(value)){
        handleButtonClick(value);
    }
    else{
        handleNumber(value);
    }
    updateScreen();
}

function handleButtonClick(symbol){
    switch(symbol){
        case 'A':
            clearBuffer();
            break;
        case '=':
            if(previousOperator == null){
                return;
            }
            if(previousOperator.includes('.') && symbol == '.'){
                symbol.apendNumber('.');
                return;
            }
            if(previousOperator.includes('+-') && symbol == '+-'){
                symbol.apendNumber('-');
                return;
            }
            mathOperator(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '%':
        case '-':
        case '+':
        case '*':
        case '÷':
        case '×':
            handleMath(symbol);
            break;
        default:
            handleNumber(symbol);
            break;
    }
    updateScreen();
}

function init(){
    for(let i = 0; i < all_buttons.length; i++){
        let button = all_buttons[i];
        button.addEventListener('click', function (evt){
            handleButtonClick(evt.target.textContent.trim());
        })
    }
}
init();

function handleMath(symbol){

    if(buffer == '0'){
        return;
    }
    if(buffer == '.'){
        containDot = true;
    }
    if(buffer == '+-'){
        conrainMinus = true;
    }

    const intBuffer = parseFloat(buffer);

    if(runningTotal == 0){
        runningTotal = intBuffer;
    }
    else{
        handleButtonClick(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}
function mathOperator(intBuffer){
    if(previousOperator == '+'){
        runningTotal += intBuffer;
    }
    else if(previousOperator == '-'){
        runningTotal -= intBuffer;
    }
    else if(previousOperator == '%'){
        runningTotal %= intBuffer;
    }
    else if(previousOperator == '÷'){
        runningTotal /= intBuffer;
    }
    else if(previousOperator == '×'){
        runningTotal *= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer == '0'){
        buffer = numberString;
    }
    else{
        buffer += numberString;
    }
}

function clearBuffer(){
    buffer = '0';
    runningTotal = 0;
    previousOperator = undefined;
}

function updateScreen(){
    screen.textContent = buffer;
}