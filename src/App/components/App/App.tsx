import * as React from 'react'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import styles from './App.styles'
import { Button, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { Web3Provider } from 'ethers/providers'
import { Contract, Signer } from 'ethers'
import { abi } from './abi.json'
import { bigNumberify } from 'ethers/utils'

interface IAppProps extends IAppOwnProps, WithStyles {}

interface IAppOwnProps {}

const Decimals = 6

export class UnconnectedApp extends React.PureComponent<IAppProps> {
  state = {
    walletAddress: '',
    toAddress: '',
    balance: 0,
    amount: '',
    comment: '',
    disabled: false
  }

  signer?: Signer
  contract?: Contract

  constructor(props: IAppProps) {
    super(props)
    if (window.ethereum) {
      window.ethereum.enable().then(([address]) => {
        this.signer = new Web3Provider(window.ethereum).getSigner()
        this.contract = new Contract(
          '0xdac17f958d2ee523a2206206994597c13d831ec7',
          abi,
          this.signer
        )
        this.getBalance(address)
        this.setState({ walletAddress: address })
      })
    }
  }

  getBalance = (address: string) => {
    this.contract!.balanceOf(address).then(balance => {
      this.setState({ balance: balance.toNumber() })
    })
  }

  handleToAddress = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    this.setState({
      toAddress: event.target.value
    })
  }

  handleAmount = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    this.setState({
      amount: event.target.value
    })
  }

  handleComment = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    this.setState({
      comment: event.target.value
    })
  }

  handleSubmit = () => {
    const { toAddress, amount, walletAddress, comment } = this.state
    this.setState({ disabled: true })
    this.contract!.transfer(
      toAddress,
      bigNumberify(parseFloat(amount) * Math.pow(10, Decimals))
    )
      .then(() => {
        this.setState({
          disabled: false,
          toAddress: '',
          balance: 0,
          amount: '',
          comment: ''
        })
        alert(`Sent ${amount} to ${toAddress}`)
        this.getBalance(this.state.walletAddress)
        fetch('/results', {
          method: 'post',
          body: JSON.stringify({
            toAddress,
            amount,
            comment,
            from: walletAddress
          })
        })
      })
      .catch(() => {
        this.setState({
          disabled: false
        })
      })
  }

  render() {
    const { classes } = this.props
    const {
      walletAddress,
      toAddress,
      amount,
      balance,
      comment,
      disabled
    } = this.state
    return (
      <div className={classes.container}>
        <Typography>Your Ethereum Address:</Typography>
        <Typography paragraph> {walletAddress}</Typography>
        <Typography>Your USDT Balance:</Typography>
        <Typography>{balance / Math.pow(10, Decimals)}</Typography>
        <label htmlFor="" className={classes.field}>
          <Typography>Usdt to Send:</Typography>
          <TextField fullWidth value={amount} onChange={this.handleAmount} />
        </label>
        <label htmlFor="" className={classes.field}>
          <Typography>To Address:</Typography>
          <TextField
            fullWidth
            value={toAddress}
            onChange={this.handleToAddress}
          />
        </label>
        <label htmlFor="" className={classes.field}>
          <Typography>Comment:</Typography>
          <TextField fullWidth value={comment} onChange={this.handleComment} />
        </label>
        <Button
          variant="contained"
          color="primary"
          disabled={!amount || !toAddress || disabled}
          onClick={this.handleSubmit}
          className={classes.button}
        >
          Submit
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(UnconnectedApp)
