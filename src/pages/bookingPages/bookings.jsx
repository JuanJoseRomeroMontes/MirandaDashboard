import { Menus } from '../../components/Menus/menus';
import { Table } from '../../components/Tables/Table';
import { useEffect, useMemo, useState } from 'react';
import { Guest, RoomStatus, SpecialRequest } from '../../components/Tables/BookingTableComponents';
import { Pagination, FilterTab, ManageData, RequestPopUp } from '../../components/Tables/GeneralTableComponents';
import { deleteBooking, fetchBookingList } from '../../features/BookingSlice/bookingThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchRoomList } from '../../features/RoomSlice/roomThunk';

export const BookingsPage = () => {
    const [bookingData, setBookingData] = useState([])
    const [popUpMessage, setpopUpMessage] = useState("");
    const [tabsState, setTabsState] = useState([true, false, false, false])
    const [order, setOrder] = useState({defaultOrder: true}); //object with properties: property, value
    const [filter, setFilter] = useState({defaultFilter: true}); //object with properties: property, value
    const [search, setSearch] = useState({property: "fullName", value: ""}); //object with properties: property, value
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const status = useSelector((state) => state.bookingSlice.status);
    const bookingSliceData = useSelector((state) => state.bookingSlice.items);
    const roomSliceData = useSelector((state) => state.roomSlice.items);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBookingList());
            if(roomSliceData === null || roomSliceData.length === 0)
                dispatch(fetchRoomList());
        }
        else if (status === 'fulfilled') {
            if(bookingSliceData !== null){
                setBookingData(getBookingData(bookingSliceData, roomSliceData));
            } 
        }
        else if (status === 'rejected') {
            console.log("rejectedPetition")
        }
    }, [status, bookingSliceData, roomSliceData, dispatch])
 
    const filteredBookings = useMemo(() => {
        let newBookingsList = [];

        if(bookingData != null)
            newBookingsList = bookingData.filter(booking => booking[filter.property] == filter.value);
        setCurrentPage(1);

        if (search.value !== "") {
            newBookingsList = newBookingsList.filter(booking => 
                booking[search.property] && booking[search.property].toLowerCase().includes(search.value.toLowerCase())
            );
        }
        
        if(!(order.defaultOrder))
        {
            newBookingsList.sort((a,b) => {
                let value = 0;
                if(a[order.property] < b[order.property])
                    value = 1;
                else if(a[order.property] > b[order.property])
                    value = -1;
                
                if(order.inversed)
                    value *= -1;

                return value;
            });
        }

        return newBookingsList;
    }, [order, filter, search, bookingData])

    const paginatedData = useMemo(() =>{
        return filteredBookings.slice(getPaginationIndex(), getPaginationIndex() + itemsPerPage);
    }, [filteredBookings, currentPage])

    function getPaginationIndex(){
        return (currentPage - 1) * itemsPerPage;
    }

    function handlePaginationChange(page){
        if(page <= Math.ceil(filteredBookings.length / itemsPerPage) && page > 0)
            setCurrentPage(page);
    }

    function handlePopUp(message){
        setpopUpMessage(message)
    }

    function handleDeleteBooking(idToFilter){
        dispatch(deleteBooking(idToFilter))
    }

    function handleEditBooking(idToFilter){
        navigate("edit/"+idToFilter)
    }

    const handleCreateBooking = () => {
        navigate("create")
    }

    const handleViewBooking = (bookingId) => {
        navigate("view/"+bookingId)
    }

    function handleDropdownChange(event){
        let order = {property: event.target.value}
        if(event.target.value === "fullName")
            order.inversed = true;
        
        setOrder(order)
    }

    function handlectiveTab(newActiveTab){
        let newTabsState = [false, false, false, false]
    
        newTabsState[newActiveTab] = true;
    
        setTabsState(newTabsState);
    }

    function handleInputChange(event){
        setSearch({property: "fullName", value: event.target.value});
    };

    const columns = [
        { header: 'Guest', render: (row) => <Guest fullName={row.fullName} bookingId={row.id} viewFunc={handleViewBooking} />, },
        { header: 'Order Date', render: (row) => <p>{row.bookDate}</p>, },
        { header: 'Check In', render: (row) => <p>{row.checkIn}</p>, },
        { header: 'Check Out', render: (row) => <p>{row.checkOut}</p>, },
        { header: 'Special Request', render: (row) => <SpecialRequest message={row.specialRequest} handlePopUp={handlePopUp}/>, },
        { header: 'Room Type', render: (row) => <p>{row.roomType}</p>, },
        { header: 'Status', render: (row) => <RoomStatus status={row.status}/>, },
        { header: '',  render: (row) => <ManageData id={row.id} editFunc={handleEditBooking} deleteFunc={handleDeleteBooking}/>, },
    ];

    if(status === 'idle')
        return (<Menus title="Bookings"><h1>LOADING</h1></Menus>)

    return(
        <>
            <Menus title="Bookings">
                <div style={{padding: "15px", height: 'calc(100% - 140px)'}}>
                    <div style={{display: "inline-flex"}}>
                        <FilterTab $selected={tabsState[0]} onClick={() => {
                            handlectiveTab(0); 
                            setFilter({});
                            setOrder({defaultOrder: true}); //DefaultOrder value doens't matter, only if the property exist or not
                        }}>All Bookings</FilterTab>
                        <FilterTab $selected={tabsState[1]} onClick={() => {
                            handlectiveTab(1);
                            setFilter({}); 
                            setOrder({property: "checkIn"});
                            setCurrentPage(1);
                        }} >Checking In</FilterTab>
                        <FilterTab $selected={tabsState[2]} onClick={() => {
                            handlectiveTab(2);
                            setFilter({}); 
                            setOrder({property: "checkOut"});
                            }}>Checking Out</FilterTab>
                        <FilterTab $selected={tabsState[3]} onClick={() => {
                            handlectiveTab(3);
                            setFilter({property: "status", value: "Check in"});
                            setOrder({property: "bookDate"});
                            }}>In Progress</FilterTab>
                    </div>

                    <input type="text" value={search.value} onChange={handleInputChange} />

                    <select id="orderDropdown" onChange={handleDropdownChange}>
                        <option value="">Select an option</option>
                        <option value="fullName">Guest</option>
                        <option value="bookDate">Order Date</option>
                        <option value="checkIn">Check In</option>
                        <option value="checkOut">Check Out</option>
                    </select>

                    <button onClick={handleCreateBooking}>Create Booking</button>
                    
                    {status === "pending" ? <h1>LOADING TABLE</h1> : null}
                    <Table data={paginatedData} columns={columns} />

                    <Pagination>
                            <p>Showing booking from {getPaginationIndex()+1} to {getPaginationIndex()+itemsPerPage > filteredBookings.length ? filteredBookings.length : getPaginationIndex()+itemsPerPage} of {filteredBookings.length} total bookings </p>

                            <div>
                                <button onClick={() => handlePaginationChange(currentPage-1)}>Prev</button>
                                <input type="number" value={currentPage} onChange={() => handlePaginationChange(event.target.value)}/>
                                <button onClick={() => handlePaginationChange(currentPage+1)}>Next</button>
                            </div>
                    </Pagination>
                </div>
            </Menus>
            <RequestPopUp $display={popUpMessage!==""} onClick={() => {setpopUpMessage("")}}><div>{popUpMessage}</div></RequestPopUp>
        </>
    )
};

function getBookingData(bookingList, roomList){
    const data = [];

    bookingList.forEach(element => {
        const modifiedElement = { ...element };
        const bookedRoom = roomList.find(room => room.id === modifiedElement.roomId);
        
        if(bookedRoom != null)
            {
                modifiedElement.roomType = bookedRoom.roomType;
                modifiedElement.roomNumber = bookedRoom.roomNumber;
                modifiedElement.status = checkDay(modifiedElement.checkIn, modifiedElement.checkOut);
            }
        else
            {
                modifiedElement.roomType = "NaN";
                modifiedElement.roomNumber = -1;
                modifiedElement.status = "NaN";
            }

        data.push(modifiedElement)
    });

    return data;
}

function checkDay(checkIn, checkOut){
    let roomState = null;
    const date = new Date();

    const checkInDate = convertStringToDate(checkIn);
    const checkOutDate = convertStringToDate(checkOut);

    if (date < checkInDate) 
        roomState = 'In progress'
    else if (date > checkOutDate) 
        roomState = 'Check out'
    else 
        roomState = 'Check in' 

    return roomState;
}

function convertStringToDate(date){
    const dateSplit = date.split('-');
    //Javascript months are indexed from 0, thats why they are substracted 1
    return new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1])-1, parseInt(dateSplit[2]));
}