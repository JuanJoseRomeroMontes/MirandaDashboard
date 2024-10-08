import { Menus } from '../../components/Menus/menus';
import { useEffect, useMemo, useState } from 'react';
import { Table, TableProps } from '../../components/Tables/Table';
import { Pagination, Image, ManageData } from '../../components/Tables/GeneralTableComponents';
import { deleteRoom, fetchRoomList } from '../../features/RoomSlice/roomThunk';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RoomInterface, RoomProperties } from '../../types';
import { Button, Container, GreenButton, Input, MenuChild } from '../../components/pagesGeneralComponents';

interface Order {
    property: RoomProperties;
    inversed?: boolean;
    defaultOrder: boolean;
}

export const RoomsPage = () => {
    const [roomData, setRoomData] = useState<RoomInterface[]>([]);
    const [order, setOrder] = useState<Order>({property: "_id", defaultOrder: true}); //object with properties: property, value
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

    function handleDeleteRoom(idToFilter:string){
        dispatch(deleteRoom(idToFilter))
    }

    function handleEditRoom(idToFilter:string){
        navigate("edit/"+idToFilter)
    }

    const handleCreateRoom = () => {
        navigate("create")
    }

    const columns: TableProps<RoomInterface>['columns'] = [
        { header: 'Photo', render: (row:RoomInterface) => <Image $src={row.photosArray[0]}/>, },
        { header: 'Room number', render: (row:RoomInterface) => <p>{row.roomNumber}</p>, },
        { header: 'Room id', render: (row:RoomInterface) => <p>{row._id}</p>, },
        { header: 'Amenities', render: (row:RoomInterface) => <p>{getAmenitiesString(row.amenities)}</p>, },
        { header: 'Price', render: (row:RoomInterface) => <p>{row.price}€</p>, },
        { header: 'Offer Price', render: (row:RoomInterface) => <p>{ calculateDiscount(row.price, row.discount)}€ | {row.discount}%</p>, },
        { header: '',  render: (row:RoomInterface) => <ManageData id={row._id} editFunc={handleEditRoom} deleteFunc={handleDeleteRoom}/>, },
    ];

    if(status === 'idle')
        return (<Menus title="Rooms"><h1>LOADING</h1></Menus>)

    return(
        <>
            <Menus title="Rooms">
                <MenuChild>
                    <Button $width={"auto"} $padding={"5px 10px"} $margin={"0 0 0 1.5%"} onClick={handleCreateRoom}>Create Room</Button>

                    <Table<RoomInterface> data={paginatedData} columns={columns} />

                    <Pagination>
                            <p>Showing rooms from {getPaginationIndex()+1} to {getPaginationIndex()+itemsPerPage > filteredRooms.length ? filteredRooms.length : getPaginationIndex()+itemsPerPage} of {filteredRooms.length} total roomss </p>

                            <Container $width={"30%"} $margin={"0 2% 0 auto"} $justifyContent={"right"}>
                                <GreenButton  $width={"auto"} $padding={"5px 10px"} $margin={"0 0 0 3%"} onClick={() => handlePaginationChange(currentPage-1)}>Prev</GreenButton>
                                <Input  $width={"15%"} $padding={"8px 10px"} $margin={"0 0 0 3%"} type="number" value={currentPage} onChange={(e) => handlePaginationChange(Number(e.target.value))} ></Input>
                                <GreenButton  $width={"auto"} $padding={"5px 10px"} $margin={"0 0 0 3%"} onClick={() => handlePaginationChange(currentPage+1)}>Next</GreenButton>
                            </Container>
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