import './App.css'
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

export default function App() {

    return (
        <>
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
                </Routes>
            </BrowserRouter>
        </>
    )
}