import * as React from 'react'
import { UnconnectedApp } from './App'
import { shallow } from 'enzyme'

describe('App', () => {
  const props = {}
  describe('snapshots', () => {
    it('renders the default snapshot', () => {
      expect(
        shallow<UnconnectedApp>(<UnconnectedApp {...props} />)
      ).toMatchSnapshot()
    })
  })
})
