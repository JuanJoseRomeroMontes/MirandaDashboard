import { Menus } from '../../components/Menus/menus';
import { useEffect, useMemo, useState } from 'react';
import { Table } from '../../components/Tables/Table';
import { Pagination, Image, ManageData } from '../../components/Tables/GeneralTableComponents';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoom, fetchRoomList } from '../../features/RoomSlice/roomThunk';
import { useNavigate } from 'react-router';

export const RoomsPage = () => {
    const [roomData, setRoomData] = useState([]);
    const [order, setOrder] = useState({defaultOrder: true}); //object with properties: property, value
    const [filter, setFilter] = useState({defaultFilter: true}); //object with properties: property, value
    const [search, setSearch] = useState({property: "fullName", value: ""}); //object with properties: property, value
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const status = useSelector((state) => state.roomSlice.status);
    const roomSliceData = useSelector((state) => state.roomSlice.items);

    useEffect(() => {
        if (status === 'idle') {
            if(roomSliceData === null || roomSliceData.length === 0)
                dispatch(fetchRoomList());
        }
        else if (status === 'fulfilled') {
            if(roomSliceData !== null){
                setRoomData(roomSliceData);
            } 
        }
        else if (status === 'rejected') {
            console.log("rejectedPetition")
        }
    }, [status, roomSliceData, dispatch])

    const filteredRooms = useMemo(() => {
        let newRoomsList = roomData.filter(rooms => rooms[filter.property] == filter.value);
        setCurrentPage(1);

        if (search.value !== "") {
            newRoomsList = newRoomsList.filter(rooms => 
                rooms[search.property] && rooms[search.property].toLowerCase().includes(search.value.toLowerCase())
            );
        }
        
        if(!(order.defaultOrder))
        {
            newRoomsList.sort((a,b) => {
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

        return newRoomsList;
    }, [order, filter, search, roomData])

    const paginatedData = useMemo(() =>{
        return filteredRooms.slice(getPaginationIndex(), getPaginationIndex() + itemsPerPage);
    }, [filteredRooms, currentPage])

    function getPaginationIndex(){
        return (currentPage - 1) * itemsPerPage;
    }

    function handlePaginationChange(page){
        if(page <= Math.ceil(filteredRooms.length / itemsPerPage) && page > 0)
            setCurrentPage(page);
    }

    function handleDeleteRoom(idToFilter){
        dispatch(deleteRoom(idToFilter))
    }

    function handleEditRoom(idToFilter){
        navigate("edit/"+idToFilter)
    }

    const handleCreateRoom = () => {
        navigate("create")
    }

    const columns = [
        { header: 'Photo', render: (row) => <Image $src={row.photosArray[0]}/>, },
        { header: 'Room number', render: (row) => <p>{row.roomNumber}</p>, },
        { header: 'Room id', render: (row) => <p>{row.id}</p>, },
        { header: 'Amenities', render: (row) => <p>{getAmenitiesString(row.amenities)}</p>, },
        { header: 'Price', render: (row) => <p>{row.price}€</p>, },
        { header: 'Offer Price', render: (row) => <p>{ calculateDiscount(row.price, row.discount)}€ | {row.discount}%</p>, },
        { header: '',  render: (row) => <ManageData id={row.id} editFunc={handleEditRoom} deleteFunc={handleDeleteRoom}/>, },
    ];

    if(status === 'idle')
        return (<Menus title="Rooms"><h1>LOADING</h1></Menus>)

    return(
        <>
            <Menus title="Rooms">
                <div style={{padding: "15px"}}>
                    <button onClick={handleCreateRoom}>Create Room</button>

                    <Table data={paginatedData} columns={columns} />

                    <Pagination>
                            <p>Showing rooms from {getPaginationIndex()+1} to {getPaginationIndex()+itemsPerPage > filteredRooms.length ? filteredRooms.length : getPaginationIndex()+itemsPerPage} of {filteredRooms.length} total roomss </p>

                            <div>
                                <button onClick={() => handlePaginationChange(currentPage-1)}>Prev</button>
                                <input type="number" value={currentPage} onChange={() => handlePaginationChange(event.target.value)} />
                                <button onClick={() => handlePaginationChange(currentPage+1)}>Next</button>
                            </div>
                    </Pagination>
                </div>
            </Menus>
        </>
    )
};

function calculateDiscount(price, discount){
    const priceDiscount = price * (discount/100)
    return Math.round(price - priceDiscount);
}

function getAmenitiesString(list){
    let string = "";
    list.forEach(amenity => {
        string = string + amenity + ", ";
    });
    return string.slice(0, -2);
}