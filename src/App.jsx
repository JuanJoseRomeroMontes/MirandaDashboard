import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './components/privateRoute'
import { store } from './app/Store'
import { AuthProvider } from './components/authProvider'
import { Provider } from 'react-redux'
import { DashboardPage } from './pages/dashboard'
import { LoginPage } from './pages/login'

import { BookingsPage } from './pages/bookingPages/bookings'
import { BookingInfoPage } from './pages/bookingPages/bookingsInfo'
import { BookingCreatePage } from './pages/bookingPages/bookingCreate'
import { BookingEditPage } from './pages/bookingPages/bookingEdit'

import { RoomsPage } from './pages/roomsPages/rooms'
import { RoomCreatePage } from './pages/roomsPages/roomCreate'

import { EmployeesPage } from './pages/employeesPages/employees'
import { EmployeeCreatePage } from './pages/employeesPages/employeeCreate'
import { EmployeeEditPage } from './pages/employeesPages/employeeEdit'

import { ContactPage } from './pages/contactsPages/contact'



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
                                <Route path='booking/create' element={ <PrivateRoute> <BookingCreatePage/> </PrivateRoute> }/>
                                <Route path='booking/edit/:id' element={ <PrivateRoute> <BookingEditPage/> </PrivateRoute> }/>
                                <Route path='booking/view/:id' element={ <PrivateRoute> <BookingInfoPage/> </PrivateRoute> }/>
                                <Route path='room' element={ <PrivateRoute> <RoomsPage/> </PrivateRoute> }/>
                                <Route path='room/create' element={ <PrivateRoute> <RoomCreatePage/> </PrivateRoute> }/>
                                <Route path='room/edit/:id' element={ <PrivateRoute> <BookingEditPage/> </PrivateRoute> }/>
                                <Route path='employee' element={ <PrivateRoute> <EmployeesPage/> </PrivateRoute> }/>
                                <Route path='employee/create' element={ <PrivateRoute> <EmployeeCreatePage/> </PrivateRoute> }/>
                                <Route path='employee/edit/:id' element={ <PrivateRoute> <EmployeeEditPage/> </PrivateRoute> }/>
                                <Route path='contact' element={ <PrivateRoute> <ContactPage/> </PrivateRoute> }/>
                            </Routes>
                        </BrowserRouter>
                </Provider>
            </AuthProvider>
        </>
    )
}