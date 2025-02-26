import GlobalStyle from './GlobalStyle.js';
import './App.css';
import BookList from "./Components/BookList.js"

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <BookList />
    </div>
  );
}

export default App;
