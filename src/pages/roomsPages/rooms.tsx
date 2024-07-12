import { Menus } from '../../components/Menus/menus';
import { useEffect, useMemo, useState } from 'react';
import { Table } from '../../components/Tables/Table';
import { Pagination, Image, ManageData } from '../../components/Tables/GeneralTableComponents';
import { deleteRoom, fetchRoomList } from '../../features/RoomSlice/roomThunk';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RoomInterface, RoomProperties } from '../../types';
import { MenuChild } from '../../components/pagesGeneralComponents';

interface Order {
    property: RoomProperties;
    inversed?: boolean;
    defaultOrder: boolean;
}

export const RoomsPage = () => {
    const [roomData, setRoomData] = useState<RoomInterface[]>([]);
    const [order, setOrder] = useState<Order>({property: "id", defaultOrder: true}); //object with properties: property, value
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.roomSlice.status);
    const roomSliceData = useAppSelector((state) => state.roomSlice.items);

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
        let newRoomsList = [...roomData];
        
        setCurrentPage(1);
        
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
    }, [order, roomData])

    const paginatedData = useMemo(() =>{
        return filteredRooms.slice(getPaginationIndex(), getPaginationIndex() + itemsPerPage);
    }, [filteredRooms, currentPage])

    function getPaginationIndex(){
        return (currentPage - 1) * itemsPerPage;
    }

    function handlePaginationChange(page:number){
        if(page <= Math.ceil(filteredRooms.length / itemsPerPage) && page > 0)
            setCurrentPage(page);
    }

    function handleDeleteRoom(idToFilter:number){
        dispatch(deleteRoom(idToFilter))
    }

    function handleEditRoom(idToFilter:number){
        navigate("edit/"+idToFilter)
    }

    const handleCreateRoom = () => {
        navigate("create")
    }

    const columns = [
        { header: 'Photo', render: (row:RoomInterface) => <Image $src={row.photosArray[0]}/>, },
        { header: 'Room number', render: (row:RoomInterface) => <p>{row.roomNumber}</p>, },
        { header: 'Room id', render: (row:RoomInterface) => <p>{row.id}</p>, },
        { header: 'Amenities', render: (row:RoomInterface) => <p>{getAmenitiesString(row.amenities)}</p>, },
        { header: 'Price', render: (row:RoomInterface) => <p>{row.price}€</p>, },
        { header: 'Offer Price', render: (row:RoomInterface) => <p>{ calculateDiscount(row.price, row.discount)}€ | {row.discount}%</p>, },
        { header: '',  render: (row:RoomInterface) => <ManageData id={row.id} editFunc={handleEditRoom} deleteFunc={handleDeleteRoom}/>, },
    ];

    if(status === 'idle')
        return (<Menus title="Rooms"><h1>LOADING</h1></Menus>)

    return(
        <>
            <Menus title="Rooms">
                <MenuChild>
                    <button onClick={handleCreateRoom}>Create Room</button>

                    <Table data={paginatedData} columns={columns} />

                    <Pagination>
                            <p>Showing rooms from {getPaginationIndex()+1} to {getPaginationIndex()+itemsPerPage > filteredRooms.length ? filteredRooms.length : getPaginationIndex()+itemsPerPage} of {filteredRooms.length} total roomss </p>

                            <div>
                                <button onClick={() => handlePaginationChange(currentPage-1)}>Prev</button>
                                <input type="number" value={currentPage} onChange={(e) => handlePaginationChange(Number(e.target.value))} />
                                <button onClick={() => handlePaginationChange(currentPage+1)}>Next</button>
                            </div>
                    </Pagination>
                </MenuChild>
            </Menus>
        </>
    )
};

function calculateDiscount(price:number, discount:number){
    const priceDiscount = price * (discount/100)
    return Math.round(price - priceDiscount);
}

function getAmenitiesString(list:string[]){
    let string = "";
    list.forEach(amenity => {
        string = string + amenity + ", ";
    });
    return string.slice(0, -2);
}