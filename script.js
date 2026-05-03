const display = document.getElementById("display");

// перевод градусов в радианы
function toRad(x){
    return x * Math.PI / 180;
}

// перевод радиан в градусы
function toDeg(x){
    return x * 180 / Math.PI;
}

function addValue(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function backspace(){
    display.value = display.value.slice(0,-1);
}

// факториал
function factorial(){
    try{
        display.value = math.factorial(Number(display.value));
    }
    catch{
        display.value = "Error";
    }
}

// x²
function power2(){
    try{
        display.value = math.pow(Number(display.value),2);
    }
    catch{
        display.value = "Error";
    }
}

// x³
function power3(){
    try{
        display.value = math.pow(Number(display.value),3);
    }
    catch{
        display.value = "Error";
    }
}

// случайное число
function randomNum(){
    display.value += Math.random();
}

// ГЛАВНАЯ ФУНКЦИЯ ВЫЧИСЛЕНИЯ
function calculate(){
    try{

        let expr = display.value;

        // --- ТРИГОНОМЕТРИЯ (DEG MODE) ---

        expr = expr.replace(/sin\((.*?)\)/g,
            (_,x)=>`math.sin(toRad(${x}))`);

        expr = expr.replace(/cos\((.*?)\)/g,
            (_,x)=>`math.cos(toRad(${x}))`);

        expr = expr.replace(/tan\((.*?)\)/g,
            (_,x)=>`math.tan(toRad(${x}))`);

        // обратные функции (вывод в градусах)

        expr = expr.replace(/asin\((.*?)\)/g,
            (_,x)=>`toDeg(math.asin(${x}))`);

        expr = expr.replace(/acos\((.*?)\)/g,
            (_,x)=>`toDeg(math.acos(${x}))`);

        expr = expr.replace(/atan\((.*?)\)/g,
            (_,x)=>`toDeg(math.atan(${x}))`);

        // гиперболические
        expr = expr.replace(/sinh\((.*?)\)/g,
            (_,x)=>`math.sinh(${x})`);

        expr = expr.replace(/cosh\((.*?)\)/g,
            (_,x)=>`math.cosh(${x})`);

        expr = expr.replace(/tanh\((.*?)\)/g,
            (_,x)=>`math.tanh(${x})`);

        // константы
        expr = expr.replace(/pi/g, `Math.PI`);
        expr = expr.replace(/e/g, `Math.E`);

        // вычисление
        let result = eval(expr);

        display.value = result;

    }
    catch{
        display.value = "Error";
    }
}

// клавиатура
document.addEventListener("keydown",(event)=>{

    const allowed = "0123456789+-*/().";

    if(allowed.includes(event.key)){
        display.value += event.key;
    }
    else if(event.key === "Enter"){
        calculate();
    }
    else if(event.key === "Backspace"){
        backspace();
    }
    else if(event.key.toLowerCase() === "c"){
        clearDisplay();
    }

    event.preventDefault();
});