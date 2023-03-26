import React from "react";

export const CurrencyRow = (props) => {
    const {
        selectCurrency,
        onChangeCurrency,
        currencyOptions,
        amount,
        onChangeAmount
    } = props

    return (
        <div>
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