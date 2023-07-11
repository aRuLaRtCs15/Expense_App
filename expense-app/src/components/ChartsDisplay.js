import React from "react"
import Chart from 'react-google-charts'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { asyncGetExpense } from "../actions/expenseAction"
import { asyncGetUser } from "../actions/userAction" 

const ChartsDisplay = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncGetExpense())
        dispatch(asyncGetUser())
    }, [dispatch])

    const result = useSelector((state) => {
        return state.user.data
    })

    const result1 = useSelector((state) => {
        return state.expense.data
    })

    const expense=result1.reduce((iv,pv)=>{
          return iv+pv.amount
    },0)

    const budget1=result[0]

    const data = [
        ["Expense", "Amount"],
        ['Total Expenses',expense],
        ['Total Budget',budget1?.budget],
    ]


    const options = {
        title: "My Expense App",
        pieHole:0,
    }
    return (<div>
        <h2 style={{color:'Violet'}}> Total Budget - { budget1?.budget}</h2>
        <h2 style={{color:'DodgerBlue'}}> Estimated Expenses - {expense} </h2>
        <h2 style={{color:'Red'}}> Remaining Budget -{(budget1?.budget)-expense} </h2>
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    </div>
    )
}


export default ChartsDisplay