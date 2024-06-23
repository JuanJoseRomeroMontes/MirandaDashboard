import rooms from '../data/roomsData.json';
import { Menus } from '../components/Menus/menus';
import { useMemo, useState } from 'react';
import { Table } from '../components/Tables/Table';
import { DeleteData, Pagination, Image } from '../components/Tables/GeneralTableComponents';

export const RoomsPage = () => {

    const [roomData, setRoomData] = useState(rooms)
    const [order, setOrder] = useState({defaultOrder: true}); //object with properties: property, value
    const [filter, setFilter] = useState({defaultFilter: true}); //object with properties: property, value
    const [search, setSearch] = useState({property: "fullName", value: ""}); //object with properties: property, value
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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
        const deletedData = [...roomData].filter(rooms => rooms.id !== idToFilter);
        setRoomData(deletedData)
    }

    const columns = [
        { header: 'Photo', render: (row) => <Image $src={row.photosArray[0]}/>, },
        { header: 'Room number', render: (row) => <p>{row.roomNumber}</p>, },
        { header: 'Room id', render: (row) => <p>{row.id}</p>, },
        { header: 'Amenities', render: (row) => <p>{getAmenitiesString(row.amenities)}</p>, },
        { header: 'Price', render: (row) => <p>{row.price}€</p>, },
        { header: 'Offer Price', render: (row) => <p>{ calculateDiscount(row.price, row.discount)}€ | {row.discount}%</p>, },
        { header: '',  render: (row) => <DeleteData id={row.id} deleteFunc={handleDeleteRoom}/>, },
    ];

    return(
        <>
            <Menus title="rooms">
                <div style={{padding: "15px"}}>
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