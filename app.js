const body = document.body;
const input = document.querySelector("input");
const buttons = document.querySelectorAll("button");
const backspace = document.querySelector(".backspace");

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


const valid = (value) => {
    if (value === "×")   
        return "*";
    else if (value === "÷") {
        return "/";
    }
    return value;
}


// Factorial
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




// Expression Evaluation
const evaluate = (expression) => {
    try {
        
        while (expression.includes("log")) {
            expression = calculateLog(expression, true);
        }

        while (expression.includes("ln")) {
            expression = calculateLog(expression, false);
        }

        // Power
        splitedArr = expression.split("^");
        expression = splitedArr.join("**");


        return eval(expression);

    } catch (error) {
        alert("Please enter valid Expression!");
        return expression;
    }
}


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
    
})  




const handleClick = (key) => {
    console.log(key);
    if (isNumber(key) || isOperator(key) || isKeyword(key)) {
        input.value += valid(key);
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
                input.value += "2.71827";
                break;

            case "π":
                if(input.value && isNumber(input.value[input.value.length - 1])){ 
                    alert("Pi Can't be right after a number");
                    break;
                }
                input.value += "3.14159";
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

            case "√x":
                input.value = "^0.5";
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
            default:
                break;
        }
    }
}


// Click Events 
buttons.forEach((btn) => {
    btn.addEventListener("click", (e)=> {
        console.log(e.target);
        handleClick(e.target.innerText);

    })
});

backspace.addEventListener("click", (e) => {
    
    input.value = input.value.slice(0, input.value.length - 1);
})