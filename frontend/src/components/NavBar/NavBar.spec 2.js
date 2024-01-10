// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import NavBar from './NavBar';

// // Import these at the top of your test file
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: jest.fn(),
//   useMatch: jest.fn(),
//   useResolvedPath: jest.fn(),
// }));

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: jest.fn(),
//   useEffect: jest.fn(),
// }));

// jest.mock('axios'); // If you're using axios, you can mock it too

// describe('NavBar', () => {
//   it('renders correctly when user is not logged in', () => {
//     window.localStorage.getItem = jest.fn().mockReturnValue(null); // Mock the localStorage.getItem method

//     render(<NavBar />);
    
//     // Write assertions to check if the component renders as expected
//     expect(screen.getByText('Baldbible')).toBeInTheDocument();
//     expect(screen.getByText('SignUp')).toBeInTheDocument();
//     expect(screen.getByText('Login')).toBeInTheDocument();
//   });

//   it('renders correctly when user is logged in', () => {
//     window.localStorage.getItem = jest.fn().mockReturnValue('fakeToken'); // Mock the localStorage.getItem method

//     render(<NavBar />);
    
//     // Write assertions to check if the component renders as expected
//     expect(screen.getByText('Baldbible')).toBeInTheDocument();
//     expect(screen.getByText('Logout')).toBeInTheDocument();
//     expect(screen.getByText('Upload image')).toBeInTheDocument();
//   });

//   // Add more test cases as needed
// });


