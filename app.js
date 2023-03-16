const body = document.body;
const input = document.querySelector("input");
const buttons = document.querySelectorAll("button");
const backspace = document.querySelector(".backspace");
const unit = document.querySelector(".unit");
const mc = document.querySelector(".mc");
const mr = document.querySelector(".mr");
const ms = document.querySelector(".ms");
const inv = document.querySelectorAll(".dropdown-menu sup");
const second = body.querySelector("#second");


const operators = ["+", "×", "÷", "-", "*", "/"];
const keywords = ["(" , ")", "!", "."];


const isNumber = (num) => {
    if (num.length > 1)
        return false;
    return (num >= '0' && num <= '9');
}

const isOperator = (op) => {
    if (op.length > 1)
        return false;
    return operators.includes(op);
}


const isKeyword = (key) => {
    if (key.length > 1)
        return false;
    return keywords.includes(key);
}



// Check for presence of value in local-memory
if (localStorage.getItem("memory")) {
    mc.removeAttribute("disabled");
    mr.removeAttribute("disabled");
    ms.setAttribute("disabled", true);
}


// All the Events Triggering

// Keyboard Events
body.addEventListener("keypress", (e) => {

    if (e.key === "=" || e.key === "Enter") {

        let result = evaluate(input.value);

        input.value = result;
        
        if (e.key === "=")
            setTimeout(()=> {
                input.value = input.value.slice(0, input.value.length - 1);
            }, 0);
    }
    else if (!(isNumber(e.key) || (isOperator(e.key)) || (isKeyword(e.key)))) {
       
        alert("Please enter a valid number!")
        let value = input.value;
        
        setTimeout(()=>{
            input.value = value;
        }, 0);
    }
    
});

body.addEventListener("click", ()=> {
    input.focus();
})

// Click Events 
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleClick(e.target.innerText);
    })
});


// Backspace Button
backspace.addEventListener("click", (e) => {
    input.value = input.value.slice(0, input.value.length - 1);
});



// =============================================================== // 


// Handling Operations
const handleClick = (key) => {
    if (isNumber(key) || isOperator(key) || isKeyword(key)) {
        input.value += validSymbol(key);
    }
    else {
        switch (key) {
            case "=":
                input.value = evaluate(input.value);
                break;

            case "C":
                input.value = "";
                break;

            case "e":
                if(input.value && isNumber(input.value[input.value.length - 1])){ 
                    alert("e Can't be right after a number");
                    break;
                }
                input.value += "e";
                break;

            case "π":
                if(input.value && isNumber(input.value[input.value.length - 1])){ 
                    alert("Pi Can't be right after a number");
                    break;
                }
                input.value += "π";
                break;

            case "mod":
                input.value += "%";
                break;

            case "+/-":
                if (input.value[0] === "-") {
                    input.value = input.value.slice(1);
                }
                else {
                    input.value = "-" + input.value;
                }
                break;

            case "n!":
                input.value = factorial(input.value + "!");
                break;

            case "1/x":
                if(input.value.length && isNumber(input.value[input.value.length - 1])){ 
                    alert("Enter valid input!");
                    break;
                }
                input.value += "1/";
                break;
            
            case "|x|":
                input.value = input.value && Math.abs(eval(input.value));    
                break;

            case "x2":
                input.value += "^2";
                break;

            case "2√x":
                input.value += "^0.5";
                break;

            case "3√x":
                input.value = Math.cbrt(input.value);
                break;

            case "log":
                input.value += "log";
                break;

            case "ln":
                input.value += "ln";
                break;

            case "10x":
                input.value += "10^";
                break;

            case "2x":
                input.value += "2^";
                break;

            case "ex":
                input.value += "2.71827^";
                break;
                
            case "xy":
                input.value += "^";
                break;
            
            case "exp":
                input.value += "*10^";
                break;

            case "F-E":
                const val = +input.value;
                input.value = val.toExponential();
                break;

            case "sin":
                input.value += "sin(";
                break;

            case "cos":
                input.value += "cos(";
                break;

            case "tan":
                input.value += "tan(";
                break;

            case "sin-1":
                input.value += "asin(";
                break;

            case "cos-1":
                input.value += "acos(";
                break;

            case "tan-1":
                input.value += "atan(";
                break;

            case "round()":
                input.value += "round(";
                break;
            
            case "ceil()":
                input.value += "ceil(";
                break; 
                
            case "floor()":
                input.value += "floor(";
                break; 

            case "MS":
                localStorage.setItem("memory", eval(input.value));
                mc.removeAttribute("disabled");
                mr.removeAttribute("disabled");
                ms.setAttribute("disabled", true);
                break;

            case "MC":
                localStorage.setItem("memory", "");
                ms.removeAttribute("disabled");
                mc.setAttribute("disabled", true);
                mr.setAttribute("disabled", true);
                break;

            case "MR":
                input.value = localStorage.getItem("memory");
                break;
            
            case "M+":
                var a = +localStorage.getItem("memory");
                var b = +input.value;
                var c = a+b;
                console.log(c);
                localStorage.setItem("memory", c);
                input.value = c;
                break;

            case "M-":
                var a = +localStorage.getItem("memory");
                var b = +input.value;
                var c = a-b;
                localStorage.setItem("memory", c);
                input.value = c;
                break;

            case "DEG":
            case "RAD":
                input.value = unitConversion(input.value);
                break;

            case "2nd":
            case "1st":
                changeButtons();

            default:
                break;
        }
    }
}



// Factorial Calculation
const factorial = (num) => {
    console.log(num, typeof num);
    num = num.slice(0, num.length - 1);
    num = +num;
    if (num === 0 || num === 1)
      return 1;
    for (let i = num - 1; i >= 1; i--) {
      num *= i;
    }
    return num;
}


// Converting to valid multiplication and divison symbol
const validSymbol = (value) => {
    if (value === "×")   
        return "*";
    else if (value === "÷") {
        return "/";
    }
    return value;
}



// Expression Evaluation
const evaluate = (expression) => {
    try {
        expression = formatExpression(expression);
        console.log(expression);
        return eval(expression);

    } catch (error) {
        alert("Please enter valid Expression!");
        return expression;
    }
}



// Format expression for calculation

const formatExpression = (expression) => {
    // LOG
    while (expression.includes("log")) {
        expression = calculateLog(expression, true);
    }

    // LN
    while (expression.includes("ln")) {
        expression = calculateLog(expression, false);
    }

    let splitedArr;
    // PI
    splitedArr = expression.split("π");
    expression = splitedArr.join("Math.PI");

    // e
    splitedArr = expression.split("e");
    expression = splitedArr.join("Math.E");

    // Power
    splitedArr = expression.split("^");
    expression = splitedArr.join("**");

    if (second.innerText === "2nd" || second.innerText === "nd") {
        // Sin
        splitedArr = expression.split("sin");
        expression = splitedArr.join("Math.sin");

        // Cos
        splitedArr = expression.split("cos");
        expression = splitedArr.join("Math.cos");

        // tan
        splitedArr = expression.split("tan");
        expression = splitedArr.join("Math.tan");
    }  
    else {
        // Sin-1
        splitedArr = expression.split("asin");
        expression = splitedArr.join("Math.asin");

        // Cos-1
        splitedArr = expression.split("acos");
        expression = splitedArr.join("Math.acos");

        // tan-1
        splitedArr = expression.split("atan");
        expression = splitedArr.join("Math.atan");
    }

    // Round
    splitedArr = expression.split("round");
    expression = splitedArr.join("Math.round");

    // Floor
    splitedArr = expression.split("floor");
    expression = splitedArr.join("Math.floor");

    // Ceil
    splitedArr = expression.split("ceil");
    expression = splitedArr.join("Math.ceil");

    return expression;
}



// Calculation of LOG and LN

const calculateLog = (expression, isLog) => {
    let expr;
    if (isLog)
        expr = "log";
    else
        expr = "ln";

    let index = expression.search(expr);

    let substr = "";
    
    let isParenthesis = false;

    for (var i = index+expr.length; i < expression.length; i++) {
        if (isNumber(expression[i])) 
            substr += expression[i];
        else if (expression[i] === "(" || expression[i] === ")") {
            isParenthesis =  true;
            continue;
        }
        else
            break;
    }
    
    console.log("substr" , substr);

    let res;
    if (isLog)
        res =  Math.log(substr) / Math.LN10;
    else 
        res = Math.log(substr)

    
    if (!isParenthesis)
        expression = expression.replace(`${expr}${substr}`, res);
    else 
        expression = expression.replace(`${expr}(${substr})`, res);
    
    return expression;

}

// Conversion from DEG to RAD and Vice-versa
const unitConversion = (value) => {
    const unitName = unit.innerText;

    if (unitName === "DEG") {
        unit.innerText = "RAD";
        return ((Number(value) * 180) / Math.PI).toFixed(2) + "°";
    }

    unit.innerText = "DEG";
    return ((Number(value) * Math.PI) / 180).toFixed(2);
}


// Toggle among various buttons when 2nd button is clicked
const changeButtons = () => {
    const root = body.querySelector("#sqrt");
    const x = body.querySelector("#x");
    const ln = body.querySelector("#ln");

    if (second.innerText === "2nd" || second.innerText === "nd") {
        inv.forEach((i)=>{
            i.style.display = "inline-block";
        });

        second.innerHTML = "1<sup>st</sup>";

        root.innerHTML = "<sup>3</sup>&Sqrt;x";

        x.innerHTML = "2<sup>x</sup>";

        ln.innerHTML = "e<sup>x</sup>";
    }
    else {
        inv.forEach((i)=>{
            i.style.display = "none";
        });

        second.innerHTML = "2<sup>nd</sup>";

        root.innerHTML = "<sup>2</sup>&Sqrt;x";

        x.innerHTML = "10<sup>x</sup>";

        ln.innerHTML = "ln";
    }
}
