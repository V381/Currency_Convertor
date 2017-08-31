

class SwapWidgets{
    constructor(){
        this.currencies = document.querySelector(".currency-convertor__currencies");
        this.valuesToConvert = document.querySelector(".currency-convertor__values-to-convert");
        this.validationText = document.querySelector(".currency-input-validation__text");
        this.currenciesResult = document.querySelector(".currency-convertor__result")
        this.resetButton = document.querySelector(".reset-button");
        this.rightWidgetCurrencies = document.querySelector(".currency-convertor__currencies-to-convert");
        this.arrow = document.querySelector(".svg");
    }

    swapByClickingOnArrow(){


        this.arrow.addEventListener("click", () => {

            // We get the index of selected currencies value and swap input values,
            // We use index because we want to track what select box is selected
            // So their position can be remembered when the select box values are swap

            let box1selected = this.currencies.options[this.currencies.options.selectedIndex].value;
            let box2selected = this.rightWidgetCurrencies.options[this.rightWidgetCurrencies.options.selectedIndex].value;
            setOption(this.currencies,box2selected);
            setOption(this.rightWidgetCurrencies,box1selected);
            let temp2 = this.valuesToConvert.value;
            this.valuesToConvert.value = this.currenciesResult.value;
            this.currenciesResult.value = temp2

            // Set correct disabled select boxes based upon the value
            
            for(let i = 0; i < this.currencies.length; i++){
                this.currencies[i].removeAttribute("disabled");
            }

            for(let i = 0; i < this.currencies.length; i++){
                if(this.currencies[i].value === box1selected){
                    this.currencies[i].setAttribute("disabled", "disabled");
                }
            }

            for(let i = 0; i < this.rightWidgetCurrencies.length; i++){
                this.rightWidgetCurrencies[i].removeAttribute("disabled");
            }

            for(let i = 0; i < this.rightWidgetCurrencies.length; i++){
                if(this.rightWidgetCurrencies[i].value === box2selected){
                    this.rightWidgetCurrencies[i].setAttribute("disabled", "disabled");
                }
            }


          });

          
          function setOption(box, value){
            for (let i = 0; i < box.options.length; i++) {
              if (box.options[i].value === value) { 
                return box.options[i].selected = true;
              }
            };

        }

    }
    
}


let swapWidgets = new SwapWidgets();
swapWidgets.swapByClickingOnArrow()