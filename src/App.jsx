import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DashboardPage } from './pages/dashboard'
import { LoginPage } from './pages/login'
import { BookingsPage } from './pages/bookings'
import { RoomsPage } from './pages/rooms'
import { EmployeesPage } from './pages/employees'
import { RoomCreatePage } from './pages/roomCreate'
import { EmployeeCreatePage } from './pages/employeeCreate'
import { BookingInfoPage } from './pages/bookingsInfo'
import { PrivateRoute } from './components/privateRoute'
import { EmployeeEditPage } from './pages/employeeEdit'
import { ContactPage } from './pages/contact'
import { store } from './app/Store'
import { AuthProvider } from './components/authProvider'
import { Provider } from 'react-redux'

export default function App() {
    return (
        <>
            <AuthProvider>
                <Provider store={ store }>
                        <BrowserRouter>
                            <Routes>
                                <Route path='/' element={ <PrivateRoute> <DashboardPage/> </PrivateRoute> }/>
                                <Route path='login' element={ <LoginPage/> }/>
                                <Route path='booking' element={ <PrivateRoute> <BookingsPage/> </PrivateRoute> }/>
                                <Route path='booking/:bookingId' element={ <PrivateRoute> <BookingInfoPage/> </PrivateRoute> }/>
                                <Route path='room' element={ <PrivateRoute> <RoomsPage/> </PrivateRoute> }/>
                                <Route path='room/create' element={ <PrivateRoute> <RoomCreatePage/> </PrivateRoute> }/>
                                <Route path='employee' element={ <PrivateRoute> <EmployeesPage/> </PrivateRoute> }/>
                                <Route path='employee/create' element={ <PrivateRoute> <EmployeeCreatePage/> </PrivateRoute> }/>
                                <Route path='employee/edit/:employeeId' element={ <PrivateRoute> <EmployeeEditPage/> </PrivateRoute> }/>
                                <Route path='contact' element={ <PrivateRoute> <ContactPage/> </PrivateRoute> }/>
                            </Routes>
                        </BrowserRouter>
                </Provider>
            </AuthProvider>
        </>
    )
}