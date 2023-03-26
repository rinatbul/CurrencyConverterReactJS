import './App.css';
import {CurrencyRow} from "./Components/CurrencyRow";
import React, {useEffect, useState} from "react";

let myHeaders = new Headers();
myHeaders.append("apikey", "6eapaZ9jEYcFPd29RBLq3UJXM1bT6cI0");

let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};
const URL = 'https://api.apilayer.com/fixer/latest'

function App() {
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [exchangeRate, setExchangeRate] = useState()
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

    let toAmount, fromAmount
    if (amountInFromCurrency) {
        fromAmount = amount
        toAmount = amount * exchangeRate
    } else {
        toAmount = amount
        fromAmount = amount / exchangeRate
    }

    useEffect(() => {
        fetch(URL, requestOptions)
            .then(response => response.json())
            .then(data => {
                const firstCurrency = Object.keys(data.rates)[0]
                setCurrencyOptions([data.base, ...Object.keys(data.rates)])
                setFromCurrency(data.base)
                setToCurrency(firstCurrency)
                setExchangeRate(data.rates[firstCurrency])
            })
            .catch(error => console.log('error', error));
    }, [])

    useEffect(() => {
        if (fromCurrency !== null && toCurrency !== null) {
            fetch(`${URL}?base=${fromCurrency}&symbols=${toCurrency}`, requestOptions)
                .then(response => response.json())
                .then(data => setExchangeRate(data.rates[toCurrency]))
        }

    }, [fromCurrency, toCurrency])

    const handleFromAmountChange = (e) => {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }
    const handleToAmountChange = (e) => {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }

    return (
        <div className="App">
            <header className='header'>Converter</header>
            <CurrencyRow currencyOptions={currencyOptions}
                         selectCurrency={fromCurrency}
                         onChangeCurrency={e => setFromCurrency(e.target.value)}
                         onChangeAmount={handleFromAmountChange}
                         amount={fromAmount}/>
            <div className='equals'>=</div>
            <CurrencyRow currencyOptions={currencyOptions}
                         selectCurrency={toCurrency}
                         onChangeCurrency={e => setToCurrency(e.target.value)}
                         onChangeAmount={handleToAmountChange}
                         amount={toAmount}/>
        </div>
    );
}

export default App;
