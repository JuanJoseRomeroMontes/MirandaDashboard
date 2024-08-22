import { Menus } from '../../components/Menus/menus';
import { Table, TableProps } from '../../components/Tables/Table';
import { useEffect, useMemo, useState } from 'react';
import { Guest, RoomStatus, SpecialRequest } from '../../components/Tables/BookingTableComponents';
import { Pagination, FilterTab, ManageData, RequestPopUp } from '../../components/Tables/GeneralTableComponents';
import { deleteBooking, fetchBookingList } from '../../features/BookingSlice/bookingThunk';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BookingInterface, BookingProperties } from '../../types';
import { Button, Container, GreenButton, Input, MenuChild, Select, TabsContainer } from '../../components/pagesGeneralComponents';

interface Order {
    property: BookingProperties;
    inversed?: boolean;
}

interface Filter {
    property: BookingProperties;
    value?: string | boolean | number;
    defaultFilter: boolean;
}

interface Search {
    property: BookingProperties;
    value: string;
}

export const BookingsPage = () => {    
    const [bookingData, setBookingData] = useState<BookingInterface[]>([])
    const [popUpMessage, setpopUpMessage] = useState(" ");
    const [tabsState, setTabsState] = useState([true, false, false, false])
    const [order, setOrder] = useState<Order>({property:"_id"});
    const [filter, setFilter] = useState<Filter>({property:"fullName", defaultFilter: true});
    const [search, setSearch] = useState<Search>({property: "fullName", value: ""});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.bookingSlice.status);
    const bookingSliceData = useAppSelector((state) => state.bookingSlice.items);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBookingList());
        }
        else if (status === 'fulfilled') {
            setBookingData(bookingSliceData);
        }
        else if (status === 'rejected') {
            console.log("rejectedPetition")
        }
    }, [status, bookingSliceData, dispatch])

    const filteredBookings = useMemo(() => {
        let newBookingsList:BookingInterface[] = [... bookingData];
        if(!filter.defaultFilter)
            newBookingsList = bookingData.filter(booking => booking[filter.property] == filter.value);

        setCurrentPage(1);

        if (search.value !== "") {
            newBookingsList = newBookingsList.filter(booking => 
                booking[search.property] && booking[search.property].toString().toLowerCase().includes(search.value.toLowerCase())
            );
        }
        
        if(order.property !== "_id")
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

    function handlePaginationChange(page:number){
        if(page <= Math.ceil(filteredBookings.length / itemsPerPage) && page > 0)
            setCurrentPage(page);
    }

    function handlePopUp(message:string){
        setpopUpMessage(message)
    }

    function handleDeleteBooking(idToFilter:string){
        dispatch(deleteBooking(idToFilter))
    }

    function handleEditBooking(idToFilter:string){
        navigate("edit/"+idToFilter)
    }

    const handleCreateBooking = () => {
        navigate("create")
    }

    const handleViewBooking = (bookingId:string) => {
        navigate("view/"+bookingId)
    }

    function handleDropdownChange(event: React.ChangeEvent<HTMLSelectElement>){
        let order:Order = {property: event.target.value as BookingProperties}
        if(event.target.value === "fullName")
            order.inversed = true;
        
        setOrder(order)
    }

    function handlectiveTab(newActiveTab:number){
        let newTabsState = [false, false, false, false]
    
        newTabsState[newActiveTab] = true;
    
        setTabsState(newTabsState);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        setSearch({property: "fullName", value: event.target.value});
    };

    const columns: TableProps<BookingInterface>['columns'] = [
        { header: 'Guest', render: (row:BookingInterface) => <Guest fullName={row.fullName} bookingId={row._id} viewFunc={handleViewBooking} />, },
        { header: 'Order Date', render: (row:BookingInterface) => <p>{row.bookDate}</p>, },
        { header: 'Check In', render: (row:BookingInterface) => <p>{row.checkIn}</p>, },
        { header: 'Check Out', render: (row:BookingInterface) => <p>{row.checkOut}</p>, },
        { header: 'Special Request', render: (row:BookingInterface) => <SpecialRequest message={row.specialRequest} handlePopUp={handlePopUp}/>, },
        { header: 'Room Type', render: (row:BookingInterface) => <p>{row.roomType}</p>, },
        { header: 'Status', render: (row:BookingInterface) => <RoomStatus status={row.status}/>, },
        { header: '',  render: (row:BookingInterface) => <ManageData id={row._id} editFunc={handleEditBooking} deleteFunc={handleDeleteBooking}/>, },
    ];

    if(status === 'idle')
        return (<Menus title="Bookings"><h1>LOADING</h1></Menus>)

    return(
        <>
            <Menus title="Bookings">
                <MenuChild>
                    <TabsContainer>
                        <FilterTab $selected={tabsState[0]} onClick={() => {
                            handlectiveTab(0); 
                            setFilter({property:"_id", defaultFilter:true});
                            setOrder({property:"_id"});
                        }}>All Bookings</FilterTab>
                        <FilterTab $selected={tabsState[1]} onClick={() => {
                            handlectiveTab(1);
                            setFilter({property:"_id", defaultFilter:true});
                            setOrder({property: "checkIn"});
                            setCurrentPage(1);
                        }} >Checking In</FilterTab>
                        <FilterTab $selected={tabsState[2]} onClick={() => {
                            handlectiveTab(2);
                            setFilter({property:"_id", defaultFilter:true});
                            setOrder({property: "checkOut"});
                            }}>Checking Out</FilterTab>
                        <FilterTab $selected={tabsState[3]} onClick={() => {
                            handlectiveTab(3);
                            setFilter({property: "status", value: "Check in", defaultFilter: false});
                            setOrder({property: "bookDate"});
                            }}>In Progress</FilterTab>
                    </TabsContainer>
                    <Container $width={"50%"} $margin={"0 0 0 auto"} $justifyContent={"space-evenly"}>
                        <Input $width={"auto"} $padding={"8px 10px"} $margin={"0"} type="text" value={search.value} onChange={handleInputChange} ></Input>

                        <Select $width={"auto"} $padding={"9px 10px"} $margin={"0"} id="orderDropdown" onChange={handleDropdownChange}>
                            <option value="">Select an option</option>
                            <option value="fullName">Guest</option>
                            <option value="bookDate">Order Date</option>
                            <option value="checkIn">Check In</option>
                            <option value="checkOut">Check Out</option>
                        </Select>

                        <Button $width={"auto"} $padding={"5px 10px"} $margin={"0"} onClick={handleCreateBooking}>Create Booking</Button>
                    </Container>
                    
                    {status === "pending" ? <h1>LOADING TABLE</h1> : null}
                    <Table<BookingInterface> data={paginatedData} columns={columns} />

                    <Pagination>
                            <p>Showing booking from {getPaginationIndex()+1} to {getPaginationIndex()+itemsPerPage > filteredBookings.length ? filteredBookings.length : getPaginationIndex()+itemsPerPage} of {filteredBookings.length} total bookings </p>

                            <Container $width={"30%"} $margin={"0 2% 0 auto"} $justifyContent={"right"}>
                                <GreenButton  $width={"auto"} $padding={"5px 10px"} $margin={"0 0 0 3%"} onClick={() => handlePaginationChange(currentPage-1)}>Prev</GreenButton>
                                <Input  $width={"15%"} $padding={"8px 10px"} $margin={"0 0 0 3%"} type="number" value={currentPage} onChange={(e) => handlePaginationChange(Number(e.target.value))} ></Input>
                                <GreenButton  $width={"auto"} $padding={"5px 10px"} $margin={"0 0 0 3%"} onClick={() => handlePaginationChange(currentPage+1)}>Next</GreenButton>
                            </Container>
                    </Pagination>
                </MenuChild>
            </Menus>
            <RequestPopUp $display={popUpMessage!==" "} onClick={() => {setpopUpMessage(" ")}}><div>{popUpMessage}</div></RequestPopUp>
        </>
    )
};