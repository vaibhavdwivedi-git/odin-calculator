expression = document.querySelector('#expression');
answer = document.querySelector('#answer');
var str = "";
decimalcount = 0;

btns = document.querySelectorAll('.btn');

btns.forEach(btn => {
    btn.addEventListener('click', (e) => makeExpression(e.target.innerText));
});

function makeExpression(ch) {
    ls = str.charAt(str.length - 1);
    if (ch == 'AC') {
        expression.textContent = "0";
        answer.textContent = "";
        str = "";
        decimalcount = 0;
        return;
    }
    else if (ch == 'C') {
        if(str== ""){
            str = "";
            return;
        }
        if(str[str.length-1] == "."){
            decimalcount = 0;
        }
        str = str.slice(0,str.length-1);
        
    }
    else if (isOperator(ch) && !isOperator(ls)) {
        str += " " + ch + " ";
        decimalcount = 0;
    }
    else if (ch == '=' && !isOperator(ls)) {
        result =0;
        result = operate(str);
        if(String(result).length > 14){
            expression.textContent = "0";
        answer.textContent = "";
        str = "";
        decimalcount = 0;
        return;
        }
        answer.textContent = Math.round(operate(str)*1000)/1000;
    }
    else if (ch == '.' && decimalcount == 0) {
        str += ch;
        decimalcount = 1;
    }
    else if (!isOperator(ch) && (ch != '=') && (ch != '.')) {
        str += ch;
    }
    expression.textContent = str;
}

function isOperator(ch) {
    if (ch == '+' || ch == '-' || ch == 'x' || ch == '/' || ch == '%' || ch == ' ') {
        return true;
    }
    return false;
}

function operate(str) {
    if (str == '') {
        return 0;
    }
    str = "+ " + str;
    exp = str.split(" ").reverse();;
    value1 = 0;
    while (exp.length != 0) {
        operator = exp.pop();
        value2 = exp.pop();
        value1 = calculate(Number(value1), Number(value2), operator)
    }
    return value1;
}


function calculate(num1, num2, operator) {
    res = 0;
    switch (operator) {
        case '+':
            res = num1 + num2;
            break;
        case '-':
            res = num1 - num2;
            break;
        case 'x':
            res = num1 * num2;
            break;
        case '/':
            res = num1 / num2;
            break;
        case '%':
            res = num1 % num2;
            break;
    }
    return res;
}


window.addEventListener('keydown',(e)=>buttonClicked(e));

function buttonClicked(e){
    pressed = e.key;
    if(pressed=='*'){
        pressed = 'x';
    }
    if(pressed=='Enter'){
        pressed = '=';
    }
    if(pressed=='Backspace'){
        pressed = 'C';
    }
    
    allowed = "1234567890/x-+%.=C".split("").includes(pressed);
    if(allowed){
        makeExpression(pressed);
    }
    
}