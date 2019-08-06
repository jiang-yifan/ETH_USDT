import createStyles from '@material-ui/core/styles/createStyles'
import { Theme } from '@material-ui/core'

// TODO update font
export default (_: Theme) =>
  createStyles({
    '@global': {
      html: {
        height: '100%'
      },
      body: {
        height: '100%',
        minHeight: '100%'
      },
      '#root': {
        height: '100%',
        minHeight: '100%'
      },
      img: {
        display: 'block'
      },
      a: {
        textDecoration: 'none'
      }
    },
    container: {
      marginTop: 24,
      padding: '0 12px',
      wordBreak: 'break-all',
      maxWidth: 400,
      margin: 'auto'
    },
    field: {
      marginTop: 18,
      display: 'block'
    },
    button: {
      marginTop: 20
    }
  })
