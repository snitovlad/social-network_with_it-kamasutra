import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';           //обернули, чтобы проходил тест
import { BrowserRouter } from 'react-router-dom'; //обернули, чтобы проходил тест

test('renders learn react link', () => {
  <BrowserRouter>               //обернули, чтобы проходил тест
    <Provider >                 //обернули, чтобы проходил тест
      render(<App />);
      const linkElement = screen.getByText(/learn react/i);
      expect(linkElement).toBeInTheDocument();
    </Provider>
  </BrowserRouter>
});


//нужно добавить в package.json, чтобы проходили тесты

// "jest": {
//   "moduleNameMapper": {
//     "axios": "axios/dist/node/axios.cjs"
//   }
// },

//или

// "jest": {
//   "transformIgnorePatterns": [
//     "node_modules/(?!(react-leaflet|@react-leaflet|d3-*|axios))"
//   ]
// } 
