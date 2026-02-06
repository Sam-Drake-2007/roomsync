import { useState } from 'react'

function ContentPage() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Content Page</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default App
