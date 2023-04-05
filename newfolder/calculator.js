class calculator
{

    constructor(previousOperandandTextElement,currentOperandandTextElement){
        this.previousOperandandTextElement=previousOperandandTextElement;
        this.currentOperandandTextElement=currentOperandandTextElement;
        this.clear();

    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;


    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);

    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.') )return;
            this.currentOperand=this.currentOperand.toString()+number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return ;
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand= this.currentOperand;
        this.currentOperand = '';



    }
    compute(){
let computation
const prev = parseFloat(this.previousOperand)
const current = parseFloat(this.currentOperand)
if(isNaN(prev) || isNaN(current)){

    return;
}
switch(this.operation){
    case '+':
        computation = prev + current;
        break;
    case '-':
        computation = prev - current;
        break;
    case 'x':
        computation = prev * current;
        break;
    case '÷':
         if(current==0){computation=-1;}
         else{
        computation = prev /current;
         }
    case '%':
        computation = prev % current;
        break;
    default :
        return;


}

this.currentOperand = computation
console.log(computation);
this.operation = undefined
this.previousOperand =  ''




    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        const  floatNumber = parseFloat(number)
        let interDisplay
        if(isNaN(intergerDigits)){
            interDisplay=''

        }else{
            interDisplay = intergerDigits.toLocaleString('en',{
            maximumFractionDigits:0})
        }

        if(decimalDigits != null){

            return `${interDisplay}.${decimalDigits}`
        }else{
            return interDisplay
        }

    }

    updateDisplay(){
this.currentOperandandTextElement.innerText=this.getDisplayNumber(this.currentOperand);
if(this.operation !=null){
this.previousOperandandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` 
}else{
    this.previousOperandandTextElement.innerText='';
}
    }
};







const numberButtons = document.querySelectorAll('[data-number]')
const OperationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allclearButton = document.querySelector('[data-all-clear]')
const previousOperandandTextElement = document.querySelector('[data-previous-operand ]')
const currentOperandandTextElement = document.querySelector('[data-current-operand]')


const calc = new calculator (previousOperandandTextElement,currentOperandandTextElement);


numberButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calc.appendNumber(button.innerText)
        calc.updateDisplay()
    })
})

OperationButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calc.chooseOperation(button.innerText)
        calc.updateDisplay()
    })
})


equalsButton.addEventListener('click',button=>{
    calc.compute();
    calc.updateDisplay()
})

allclearButton.addEventListener('click',button=>{
    calc.clear();
    calc.updateDisplay();
})

deleteButton.addEventListener('click',button=>{
    calc.delete();
    calc.updateDisplay();
})

