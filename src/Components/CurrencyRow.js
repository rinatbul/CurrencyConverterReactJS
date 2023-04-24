import React from "react";
import loading from "../Lottie/loading.json";
import Lottie from "lottie-react";
import './CurrencyRow.module.css'

export const CurrencyRow = (props) => {
    const {
        selectCurrency,
        onChangeCurrency,
        currencyOptions,
        amount,
        onChangeAmount,
        isLoading,
    } = props

    return (
        <div>
                {/*<Lottie animationData={loading} loop={true}/>*/}
                    <input type="number"
                           className='input'
                           value={amount}
                           onChange={onChangeAmount}/>
            
            <select value={selectCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option =>
                    <option key={option} value={option}>{option}</option>
                )}
            </select>

        </div>
    )
}