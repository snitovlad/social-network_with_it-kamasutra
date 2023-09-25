import { render, screen } from '@testing-library/react';
import SamuraiJSApp from './App';
import { createRoot } from 'react-dom/client';

// test('renders learn react link', () => {
//       render(<SamuraiJSApp />);
//       const linkElement = screen.getByText(/learn react/i);
//       expect(linkElement).toBeInTheDocument();
  
// });

test('render without crashing', () => {
    const container = document.createElement('div');
    const root = createRoot(container);
      root.render(<SamuraiJSApp />);
      root.unmount();  
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
