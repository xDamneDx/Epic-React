// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

const Counter = ({initialCount, step}) => {
  const {count, increment, decrement} = useCounter({initialCount, step})

  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<Counter />)

  const message = screen.getByText(/Current count/i)
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const increment = screen.getByRole('button', {name: /increment/i})

  expect(message).toHaveTextContent(/current count: 0/i)

  userEvent.click(increment)
  expect(message).toHaveTextContent(/current count: 1/i)

  userEvent.click(decrement)
  expect(message).toHaveTextContent(/current count: 0/i)
})

test('exposes the count and increment/decrement functions, with custom values', () => {
  render(<Counter initialCount={2} step={3} />)

  const message = screen.getByText(/Current count/i)
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const increment = screen.getByRole('button', {name: /increment/i})

  expect(message).toHaveTextContent(/current count: 2/i)

  userEvent.click(increment)
  expect(message).toHaveTextContent(/current count: 5/i)

  userEvent.click(decrement)
  expect(message).toHaveTextContent(/current count: 2/i)
})

/* eslint no-unused-vars:0 */
