
// We initialize class GetCurrencyData

let getCurrencyData = new GetCurrencyData();


// We set and calculate currencies

class CalculateCurrencies{
    constructor(){

        // We query the inputs

        this.currencies = document.querySelector(".currency-convertor__currencies");
        this.valuesToConvert = document.querySelector(".currency-convertor__values-to-convert");
        this.validationText = document.querySelector(".currency-input-validation__text");
        this.currenciesResult = document.querySelector(".currency-convertor__result")
        this.resetButton = document.querySelector(".reset-button");
        this.rightWidgetCurrencies = document.querySelector(".currency-convertor__currencies-to-convert");
    }

    setDefaultValues(){
        this.valuesToConvert.value = 1;
        this.valuesToConvert.click();
    }

    setCorrectCurrencyIfSameIsSelected(){
        
    // Prevent duplicated currencies in select boxes
                
    let rightCurr = this.rightWidgetCurrencies.children;

    [this.currencies, this.rightWidgetCurrencies].forEach(field => {
        field.addEventListener('change', event => {
            const otherField = field === this.currencies ? this.rightWidgetCurrencies : this.currencies;
        [...otherField.children].forEach(child =>
                child.disabled = (child.value === field.value)
            );
        if (field.value === otherField.value) {
            const otherChildren = [].slice.call(otherField.children);
            const match = otherChildren.find(x => !x.disabled);
            if (match) {
                otherField.value = match.value;      
            }
        }
        });
    })
                
    }

    setRightCurrencies(currenciesData){

        let leftCurrency;

        let leftChanged = false;

        let rightCurrency;

        // Add event listeners for text inputs and select inputs

        this.currencies.addEventListener("change", (e) => {
            leftCurrency = e.target.value;
            rightCurrency = this.rightWidgetCurrencies.options[this.rightWidgetCurrencies.selectedIndex].value;
            this.calculateCurrencies(currenciesData, leftCurrency, rightCurrency, e.target);
            this.setCorrectCurrencyIfSameIsSelected();
            this.calculateCurrenciesReversed(currenciesData, leftCurrency, rightCurrency)
        });

        this.rightWidgetCurrencies.addEventListener("change", (e) => {
            this.setCorrectCurrencyIfSameIsSelected();
            rightCurrency = this.rightWidgetCurrencies.options[this.rightWidgetCurrencies.selectedIndex].value;
            leftCurrency = this.currencies.options[this.currencies.selectedIndex].value;
            this.calculateCurrencies(currenciesData, leftCurrency, rightCurrency, e.target);
            this.calculateCurrenciesReversed(currenciesData, leftCurrency, rightCurrency)
        });

        this.rightWidgetCurrencies.addEventListener("input", (e) => {
            this.setCorrectCurrencyIfSameIsSelected();
            rightCurrency = this.rightWidgetCurrencies.options[this.rightWidgetCurrencies.selectedIndex].value;
            leftCurrency = this.currencies.options[this.currencies.selectedIndex].value;
            this.calculateCurrencies(currenciesData, leftCurrency, rightCurrency, e.target);
            // this.calculateCurrenciesReversed(currenciesData, leftCurrency, rightCurrency)
        });

        this.currenciesResult.addEventListener("click", () => {
            rightCurrency = this.rightWidgetCurrencies.options[this.rightWidgetCurrencies.selectedIndex].value;
            leftCurrency = this.currencies.options[this.currencies.selectedIndex].value;
            this.calculateCurrenciesReversed(currenciesData, leftCurrency, rightCurrency);
        });

        
        this.currenciesResult.addEventListener("input", () => {
            this.validateInput(this.currenciesResult);
            rightCurrency = this.rightWidgetCurrencies.options[this.rightWidgetCurrencies.selectedIndex].value;
            leftCurrency = this.currencies.options[this.currencies.selectedIndex].value;
            this.calculateCurrenciesReversed(currenciesData, leftCurrency, rightCurrency);
        });


        this.valuesToConvert.addEventListener("click", (e) => {
            rightCurrency = this.rightWidgetCurrencies.options[this.rightWidgetCurrencies.selectedIndex].value;
            leftCurrency = this.currencies.options[this.currencies.selectedIndex].value;
            this.calculateCurrencies(currenciesData, leftCurrency, rightCurrency, e.target);
            // this.calculateCurrenciesReversed(currenciesData, leftCurrency, rightCurrency)
        });

        this.valuesToConvert.addEventListener("input", (e) => {
            this.validateInput(this.valuesToConvert);            
            this.validateInput(this.currenciesResult);
            leftCurrency = this.currencies.options[this.currencies.selectedIndex].value;
            rightCurrency = this.rightWidgetCurrencies.options[this.rightWidgetCurrencies.selectedIndex].value;
            this.calculateCurrencies(currenciesData, leftCurrency, rightCurrency, e.target);
            // this.calculateCurrenciesReversed(currenciesData, leftCurrency, rightCurrency)
            
        });

    }

    calculateCurrenciesReversed(currenciesData, leftCurrency, rightCurrency){
        
    // Calculate RSD

    // Set Ratios

    let rsd = 1;
    let eur;
    let usd;


    for(let i in currenciesData){
        if(i.toUpperCase() === "EUR"){
            eur = currenciesData[i].kup;
        }

        if(i.toUpperCase() === "USD"){
            usd = currenciesData[i].kup;
        }

    }

    if(leftCurrency === "EUR" && rightCurrency === "USD"){
        let eur;
        let usd;
        let usdCalculation = 0;
        let usdAndEuroCalculation = 0;

        for(let i in currenciesData){
            if(i.toUpperCase() === "EUR"){
                eur = currenciesData[i];
            }
        }

        for(let i in currenciesData){
            if(i.toUpperCase() === "USD"){
                usd = currenciesData[i];
            }
        }

        usdCalculation += Number(this.currenciesResult.value);

        for(let i = 0; i < usdCalculation; i++){
            usdAndEuroCalculation += Number(usd.kup);
        }

        

        return this.valuesToConvert.value = Number(Number((usdAndEuroCalculation / eur.kup))).toFixed(2);
    }

    if(leftCurrency === "USD" && rightCurrency === "EUR"){
        let eur;
        let usd;
        let usdCalculation = 0;
        let usdAndEuroCalculation = 0;

        for(let i in currenciesData){
            if(i.toUpperCase() === "EUR"){
                eur = currenciesData[i];
            }
        }

        for(let i in currenciesData){
            if(i.toUpperCase() === "USD"){
                usd = currenciesData[i];
            }
        }

        usdCalculation += Number(this.currenciesResult.value);

        for(let i = 0; i < usdCalculation; i++){
            usdAndEuroCalculation += Number(eur.kup);
        }

        console.log(usdAndEuroCalculation, usd.kup)

        return this.valuesToConvert.value = Number(Number((usdAndEuroCalculation / usd.kup))).toFixed(2)
    }


    if(leftCurrency === "RSD" && rightCurrency === "EUR"){
        this.valuesToConvert.value = parseFloat(Number(this.currenciesResult.value * eur)).toFixed(2);
    }

    if(leftCurrency === "RSD" && rightCurrency === "USD"){
        return this.valuesToConvert.value = parseFloat(Number(this.currenciesResult.value * usd)).toFixed(2);
    }

    if(leftCurrency === "USD" && rightCurrency === "RSD"){
        return this.valuesToConvert.value = parseFloat(Number(this.currenciesResult.value) * (1 / usd)).toFixed(2);
    }

    
    if(leftCurrency === "EUR" && rightCurrency === "RSD"){
        return this.valuesToConvert.value = parseFloat(Number(this.currenciesResult.value) * (1 / eur)).toFixed(2);
    }

    }
    
    calculateCurrencies(currenciesData, leftCurrency, rightCurrency, el){

        // Calculate correct values

        if(leftCurrency === "RSD" && rightCurrency === "USD"){

            let usd;

            for(let i in currenciesData){
                if(i.toUpperCase() === "USD"){
                    usd = currenciesData[i];
                }
            }

            return this.currenciesResult.value = parseFloat(Number(this.valuesToConvert.value) / Number(usd.kup)).toFixed(2);

        }

        if(leftCurrency === "RSD" && rightCurrency === "EUR"){
            let eur;

            for(let i in currenciesData){
                if(i.toUpperCase() === "EUR"){
                    eur = currenciesData[i];
                }
            }

            return this.currenciesResult.value = parseFloat(Number(this.valuesToConvert.value) / Number(eur.kup)).toFixed(2);

        }

        if(leftCurrency === "USD" && rightCurrency === "EUR"){

            let eur;
            let usd;
            let usdCalculation = 0;
            let usdAndEuroCalculation = 0;

            for(let i in currenciesData){
                if(i.toUpperCase() === "EUR"){
                    eur = currenciesData[i];
                }
            }

            for(let i in currenciesData){
                if(i.toUpperCase() === "USD"){
                    usd = currenciesData[i];
                }
            }

            usdCalculation += Number(this.valuesToConvert.value);

            for(let i = 0; i < usdCalculation; i++){
                usdAndEuroCalculation += Number(usd.kup);
            }



            return this.currenciesResult.value = Number(Number((usdAndEuroCalculation / eur.kup))).toFixed(2);

        }

        if(leftCurrency === "EUR" && rightCurrency === "USD"){

            let eur;
            let usd;
            let euroCalculation = 0;
            let euroAndUsdCalculation = 0;

            for(let i in currenciesData){
                if(i.toUpperCase() === "EUR"){
                    eur = currenciesData[i];
                }
            }

            for(let i in currenciesData){
                if(i.toUpperCase() === "USD"){
                    usd = currenciesData[i];
                }
            }

            euroCalculation += Number(this.valuesToConvert.value);

            for(let i = 0; i < euroCalculation; i++){
                euroAndUsdCalculation += Number(eur.kup);
            }

            // Return values so it does not go to Calculate RSD section

            return this.currenciesResult.value = parseFloat(Number(Number(euroAndUsdCalculation) / 100)).toFixed(2)
            
        }

        // Calculate RSD

        for(let i in currenciesData){
            if(i.toUpperCase() === leftCurrency){
                // Calculate value and set length of decimal num to two with toFixed(4)
                if(this.valuesToConvert.value <= 0){
                    return false;
                }else{
                    this.currenciesResult.value = parseFloat(Number(this.valuesToConvert.value) * currenciesData[i].kup).toFixed(2)                    
                }
            }
        }
    }

    // We reset the currencies and select boxes
    // First we create option elements
    // Then we append to select option elements
    // We set input values to 1 and to most up to date euro value


    resetCurrencies(serverData){
        this.resetButton.addEventListener("click", () => {
            this.valuesToConvert.value = 1;
            this.currenciesResult.value = parseFloat(serverData.eur.kup).toFixed(2); // We set most up to date euro value

            let leftWidget = () => {
                let optionEUR = document.createElement("option");
                optionEUR.value = "EUR";
                optionEUR.innerHTML = "EUR";
    
                let optionUSD = document.createElement("option");
                optionUSD.value = "USD";
                optionUSD.innerHTML = "USD";
    
                let optionRSD = document.createElement("option");
                optionRSD.value = "RSD";
                optionRSD.innerHTML = "RSD";
                // optionRSD.setAttribute("disabled", "disabled");
    
                this.currencies.innerHTML = "";
                this.currencies.appendChild(optionEUR);
                this.currencies.appendChild(optionUSD);
                this.currencies.appendChild(optionRSD);
            }

            leftWidget();

            let rightWidget = () => {
                let optionEUR = document.createElement("option");
                optionEUR.value = "EUR";
                optionEUR.innerHTML = "EUR";
                // optionEUR.setAttribute("disabled", "disabled");
    
                let optionUSD = document.createElement("option");
                optionUSD.value = "USD";
                optionUSD.innerHTML = "USD";
    
                let optionRSD = document.createElement("option");
                optionRSD.value = "RSD";
                optionRSD.innerHTML = "RSD";

                this.rightWidgetCurrencies.innerHTML = "";

                this.rightWidgetCurrencies.appendChild(optionRSD);
                this.rightWidgetCurrencies.appendChild(optionUSD);
                this.rightWidgetCurrencies.appendChild(optionEUR);
            }

            rightWidget();


            // this.rightWidgetCurrencies.appendChild()

            // location.reload();
        });
    }

    validateInput(input){
        
    }

}

let calculateCurrencies = new CalculateCurrencies();

// We send xhr GET request to server

getCurrencyData.getData((data) => {
    console.log(data.result);
    calculateCurrencies.setRightCurrencies(data.result);
    calculateCurrencies.setDefaultValues();
    calculateCurrencies.resetCurrencies(data.result);
    calculateCurrencies.setCorrectCurrencyIfSameIsSelected();
    calculateCurrencies.calculateCurrenciesReversed(data.result);
});

// Start with calculated number

window.addEventListener("load", () => {
    calculateCurrencies.setDefaultValues();
});


