import { useState, useEffect } from 'react';
export default function HelloHooks(props) {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    // 👍 We're not breaking the first rule anymore
    if (count) {
      document.title = `You clicked ${count} times`;
    }
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
