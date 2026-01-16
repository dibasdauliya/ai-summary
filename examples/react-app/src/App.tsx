import { AISummary } from '@ai-summary/react'
import './App.css'

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>AI Summary Widget Demo</h1>
      
      <h2>Light Theme (Default)</h2>
      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
        <AISummary 
          subject="TheTabber"
          theme="light"
        />
      </div>

      <h2 style={{ marginTop: '2rem' }}>Dark Theme</h2>
      <div style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '8px' }}>
        <AISummary 
          subject="TheTabber"
          theme="dark"
        />
      </div>

      <h2 style={{ marginTop: '2rem' }}>Transparent Background</h2>
      <div className="border-t border-gray-200 mt-8 pt-8">
        <AISummary 
          subject="TheTabber"
          theme="light"
          query="Give me a summary of TheTabber. Explain what it is, what it does, and why someone might use it."
          styles={{
            backgroundColor: 'transparent',
            padding: '0.5rem'
          }}
        />
      </div>
    </div>
  )
}

export default App
