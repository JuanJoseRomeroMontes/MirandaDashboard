import { Menus } from '../../components/Menus/menus';
import { Table } from '../../components/Tables/Table';
import { useEffect, useMemo, useState } from 'react';
import { Pagination, FilterTab, ManageData } from '../../components/Tables/GeneralTableComponents';
import { deleteContact, fetchContactList } from '../../features/ContactSlice/contactThunk';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserList } from '../../features/UserSlice/userThunk';

export const ContactPage = () => {
    const [commentData, setcommentData] = useState([])
    const [tabsState, setTabsState] = useState([true, false, false, false])
    const [order, setOrder] = useState({defaultOrder: true}); //object with properties: property, value
    const [filter, setFilter] = useState({defaultFilter: true}); //object with properties: property, value
    const [search, setSearch] = useState({property: "fullName", value: ""}); //object with properties: property, value
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const status = useSelector((state) => state.contactSlice.status);
    const contactSliceData = useSelector((state) => state.contactSlice.items);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchContactList());
        }
        else if (status === 'fulfilled') {
            setcommentData(contactSliceData);
        }
        else if (status === 'rejected') {
            console.log("rejectedPetition")
        }
    }, [status, contactSliceData, dispatch])

    const filteredComments = useMemo(() => {
        let newCommentsList = commentData.filter(comment => comment[filter.property] == filter.value);
        setCurrentPage(1);

        if (search.value !== "") {
            newCommentsList = newCommentsList.filter(comment => 
                comment[search.property] && comment[search.property].toLowerCase().includes(search.value.toLowerCase())
            );
        }
        
        if(!(order.defaultOrder))
        {
            newCommentsList.sort((a,b) => {
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

        return newCommentsList;
    }, [order, filter, search, commentData])

    const paginatedData = useMemo(() =>{
        return filteredComments.slice(getPaginationIndex(), getPaginationIndex() + itemsPerPage);
    }, [filteredComments, currentPage])

    function getPaginationIndex(){
        return (currentPage - 1) * itemsPerPage;
    }

    function handlePaginationChange(page){
        if(page <= Math.ceil(filteredComments.length / itemsPerPage) && page > 0)
            setCurrentPage(page);
    }

    function handleDeleteComment(idToFilter){
        dispatch(deleteContact(idToFilter))
    }

    function handlectiveTab(newActiveTab){
        let newTabsState = [false, false, false, false]
    
        newTabsState[newActiveTab] = true;
    
        setTabsState(newTabsState);
    }

    const columns = [
        { header: 'Date', render: (row) =>  <p>{row.date}</p>, },
        { header: 'Id', render: (row) => <p>{row.id}</p>, },
        { header: 'Customer', render: (row) => <p>{row.client.name}</p>, },
        { header: 'Email Request', render: (row) => <p>{row.client.email}</p>, },
        { header: 'Phone', render: (row) => <p>{row.client.phone}</p>, },
        { header: 'Subject', render: (row) => <p>{row.subject}</p>, },
        { header: 'Comment', render: (row) => <p>{row.comment}</p>, },
        { header: '',  render: (row) => <ManageData id={row.id} deleteFunc={handleDeleteComment}/>, },
    ];

    return(
        <>
            <Menus title="Contacts">               
                <div style={{padding: "15px"}}>
                    <div style={{display: "inline-flex"}}>
                        <FilterTab $selected={tabsState[0]} onClick={() => {
                            handlectiveTab(0); 
                            setFilter({});
                            setOrder({defaultOrder: true}); //DefaultOrder value doens't matter, only if the property exist or not
                        }}>All contacts</FilterTab>
                        <FilterTab $selected={tabsState[1]} onClick={() => {
                            handlectiveTab(1);
                            setFilter({property: "archived", value: true}); 
                            setOrder({property: "checkIn"});
                            setCurrentPage(1);
                        }} >Archived</FilterTab>
                    </div>

                    <Table data={paginatedData} columns={columns} />

                    <Pagination>
                            <p>Showing comment from {getPaginationIndex()+1} to {getPaginationIndex()+itemsPerPage > filteredComments.length ? filteredComments.length : getPaginationIndex()+itemsPerPage} of {filteredComments.length} total comments </p>

                            <div>
                                <button onClick={() => handlePaginationChange(currentPage-1)}>Prev</button>
                                <input type="number" value={currentPage} onChange={() => handlePaginationChange(event.target.value)}/>
                                <button onClick={() => handlePaginationChange(currentPage+1)}>Next</button>
                            </div>
                    </Pagination>
                </div>
            </Menus>
        </>
    )
};