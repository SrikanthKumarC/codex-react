import "@fontsource/montserrat";
import React from "react";
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios'


class App extends React.Component {

  constructor() {
    super()

    this.state = { bal: 0, sal: 0, dss: 0, data: null, mss: 0, saving: 0, amt: 0, category: "trasnport",
    file: null,
    text: '',
    transport: {spends: 0}, 
    entertainment: {spends: 0}, 
    bills: {spends: 0}, 
    foodDrinks: {spends: 0}, 
    transactions: [
      {
        amount: "200",
        category: "transport",
        date: new Date().toString()
      }
    ]}
  }

  componentDidMount() {
    var tsns = JSON.parse(localStorage.getItem('transactions'))
    if (this.state.transactions.length === 0) {
      this.setState({transactions: tsns})
    }
  }

  setSalary = (event) => {
      this.setState({sal: event.target.value})
      this.setState({saving: this.state.sal})
  }

  setAmount = (event) => {
    this.setState({amt: event.target.value})
  }
  setCategory = (event) => {
    this.setState({category: event.target.value})
  }
  setSavings = (event) => {
    this.setState({saving: event.target.value})
  }
  
  getSafeDailySpending = (sal, saving) => {
    var net = sal - saving
    var getSafeDailySpending = net/30
    this.setState({dss: getSafeDailySpending})
    return getSafeDailySpending
  }
  getSafeMonthlySpending = (sal, saving) => {
    var net = sal - saving
    this.setState({mss: net})
    return net
  }
  handleTransaction = (amt) => {
    this.setState = ({sal: amt})
  }
  handleAdd = () =>  {
    var obj = this.state.transactions;
    obj.push({amount: this.state.amt, category: this.state.category, date: new Date().toString()})
    this.setState({transactions: obj})
    localStorage.setItem('transactions', JSON.stringify(obj))
    this.notify()
    console.log("Added")
  }
  notify = () => {
    this.getSafeDailySpending(this.state.sal, this.state.saving)
    this.getSafeMonthlySpending(this.state.sal, this.state.saving)
    toast("Saved!")
  }
  handleImageSubmit = event => {
    const data = new FormData()
    data.append("file", this.state.file)
    Axios.post("http://localhost:3000/upload", data)
    .then(res => this.setState({text: res.data}))
    .catch(err => console.log(err))
    console.log(data)
  }
  updateBalanceNegative = () => {

    var balances = this.state.bal;
    balances = balances - this.state.amt;
    this.setState({bal: balances});

  }

  fetchImage = async (file) => {
      // Creates a client
    console.log(file);
    console.log(typeof(file));
  }

  handleImage = (event) => {
    const file = event.target.files[0];
    this.setState({file})
  }

  render() {
    const maps = this.state.transactions.map((transaction, i) => {
     return ( <ul key={i} className='transaction'>
        <p key={i+1}>Amount: {transaction.amount}</p>
        <p key={i+2}>Category: {transaction.category}</p>
        <p key={i+3}>Date: {transaction.date}</p>
      </ul>
     )
    })
    return (
      <div className='main'>
        <div className='header'>
          <h1>Team Codex</h1>
        </div>

        <div className='keyinfo flex'>
          <div className='salary'>
            <p>Salary: Rs.{this.state.sal}</p>
          </div>
          <div className='savings'>
          <p>You wanted to save: Rs.{this.state.saving} monthly</p> 
          </div>
          <div className='balance'>
          <p>current balance: Rs.{this.state.bal}</p>
          </div>

        </div>

        <div className='inputs'>
          {/* Global Settings */}
          <h1>Main Information</h1>

          {/* inputs for salary and savings */}
          <label htmlFor="salary">Enter Salary: </label>
          <input placeholder='Enter Salary' name='salary' type='number' value={this.state.sal} onChange={this.setSalary} />
          <br/><label htmlFor="savings">How much you want to save monthly: </label>
          <input name="savings" placeholder='How you want to save?' type="number" value={this.state.saving} onChange={this.setSavings} /> <br />


          {/* Save details */}
          <button onClick={this.notify}> Save! </button>
          <ToastContainer />


          {/* == Local Settings  == */}

          {/* inputs for transaction */}
          <h2>Add Transaction: </h2>
          <form onSubmit={this.handleAdd}> 
          <label htmlFor='amount'> Enter amount: Rs.</label>
          <input name='amount' type='number' value={this.state.amt} onChange={this.setAmount}/><br />
          <label htmlFor="category">Choose a category:</label> 
          
          <select name="categories" id="category" value={this.state.category} onChange={this.setCategory}>
            <option value="transport">Trasnport</option>
            <option value="entertainment">Entertainment</option>
            <option value="bills">Bills</option>
            <option value="foodDrinks">Food & Drinks</option>
          </select><br/>

          <button type="button" onClick={this.handleAdd}>Add transaction</button>
          </form> 

          <form action='#'>
          <input
          id="file-img"
          type="file"
          accept="image/*"
          capture="camera"
          onChange={(event) => {
            const files = event.target.files[0];
            this.setState({file: files})
            console.log("From inside func")
            console.log(files)
          }}
        />
    
        <button type='button' onClick={this.handleImageSubmit}>
          Save Image
        </button>
          
          </form>
          <textarea readOnly value={this.state.text === "" ? "waiting..." : this.state.text} />
        </div>

        {/* Transaction History */}
        <div className='transaction-history'>
          <h2>Transaction History</h2>
          {maps}
        </div>

      </div>
    )
  }

}

export default App;
