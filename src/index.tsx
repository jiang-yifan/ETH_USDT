import React from 'react'
import ReactDOM from 'react-dom'
import App from './App/components/App/App'
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core'

const render = () => {
  ReactDOM.render(
    <MuiThemeProvider theme={createMuiTheme()}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </MuiThemeProvider>,
    document.getElementById('root')
  )
}

render()
