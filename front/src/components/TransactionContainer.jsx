import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import TransactionList from './TransactionList'
import Filter from './Filter'

function TransactionContainer() {
  const [transactions, setTransactions] = useState(null)
  const [transactionsStored, setTransactionsStored] = useState(null)
  const [categories, setCategories] = useState(null)
  const [transactionTypes, setTransactionTypes] = useState(null)

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_DOMAIN}/transaction`)
        .then((response) => {
          setTransactionsStored(response.data.body.allTransactions)
          setCategories(response.data.body.categories)
          setTransactionTypes(response.data.body.transactionTypes)
        })
    } catch (err) {
      console.error(`Error: ${err}`)
    }
  }, [])

  const filter = (filterName, filterOption) => {
    let transactionsFiltered = []
    if (filterOption !== '') {
      transactionsFiltered = transactionsStored.filter(
        (transaction) => transaction[filterName] === filterOption,
      )
      setTransactions(transactionsFiltered)
    } else {
      setTransactions(transactionsStored)
    }
  }

  return (
    <div>
      <div className="Filters">
        <Filter
          name="transactionType"
          title="Tipo de Transaccion"
          options={transactionTypes}
          onFilter={filter}
        />
        <Filter
          name="category"
          title="Categoría"
          options={categories}
          onFilter={filter}
        />
      </div>
      <div className="transactionsTable">
        {transactions ? (
          <TransactionList transactionList={transactions} />
        ) : transactionsStored ? (
          <TransactionList transactionList={transactionsStored} />
        ) : (
          ''
        )}
      </div>
      <div className="actions">
        <Link to={`/transaction/new`}>
          <button>Crear nuevo movimiento</button>
        </Link>
      </div>
    </div>
  )
}

export default TransactionContainer
