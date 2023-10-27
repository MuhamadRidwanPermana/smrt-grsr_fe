import { useRef } from 'react';

export default function App() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <button onClick={handleClick}>Scroll to element</button>

      <div style={{ height: '150rem' }} />

      <div ref={ref} style={{ backgroundColor: 'lightblue' }}>
        Coding Beauty
      </div>

      <div style={{ height: '150rem' }} />
    </div>
  );
}