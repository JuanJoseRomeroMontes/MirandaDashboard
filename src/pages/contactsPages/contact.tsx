import { Menus } from '../../components/Menus/menus';
import { Table, TableProps } from '../../components/Tables/Table';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Pagination, FilterTab, ManageData } from '../../components/Tables/GeneralTableComponents';
import { deleteContact, fetchContactList } from '../../features/ContactSlice/contactThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ContactInterface, ContactProperties } from '../../types';

interface Order {
    property: ContactProperties;
    defaultOrder: boolean;
    inversed?: boolean;
}

interface Filter {
    property: ContactProperties;
    value?: string | boolean | number | ContactInterface['client'];
    defaultFilter: boolean;
}

export const ContactPage = () => {
    const [commentData, setcommentData] = useState<ContactInterface[]>([])
    const [tabsState, setTabsState] = useState<boolean[]>([true, false, false, false])
    const [order, setOrder] = useState<Order>({defaultOrder: true, property:'date'}); //object with properties: property, value
    const [filter, setFilter] = useState<Filter>({defaultFilter:true, property:'date'}); //object with properties: property, value
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.contactSlice.status);
    const contactSliceData = useAppSelector((state) => state.contactSlice.items);

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
        let newCommentsList: ContactInterface[] = [...commentData]; //importante hacer una copia, ya que sort no se puede hacer en el original
        if(!filter.defaultFilter)
            newCommentsList = commentData.filter(comment => comment[filter.property] == filter.value);
        
        setCurrentPage(1);
        
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
    }, [order, filter, commentData])

    const paginatedData = useMemo(() =>{
        return filteredComments.slice(getPaginationIndex(), getPaginationIndex() + itemsPerPage);
    }, [filteredComments, currentPage])

    function getPaginationIndex(){
        return (currentPage - 1) * itemsPerPage;
    }

    function handlePaginationChange(page:number){
        if(page <= Math.ceil(filteredComments.length / itemsPerPage) && page > 0)
            setCurrentPage(page);
    }

    function handleDeleteComment(idToFilter:number){
        dispatch(deleteContact(idToFilter));
    }

    function handlectiveTab(newActiveTab:number){
        let newTabsState = [false, false, false, false]
    
        newTabsState[newActiveTab] = true;
    
        setTabsState(newTabsState);
    }

    const test: React.ReactNode = <h1>Hello, world!</h1>;

    const columns: TableProps['columns'] = [
        { header: 'Date', render: (row: ContactInterface) => <p>{row.date}</p> },
        { header: 'Id', render: (row: ContactInterface) => <p>{row.id}</p> },
        { header: 'Customer', render: (row: ContactInterface) => <p>{row.client.name}</p> },
        { header: 'Email Request', render: (row: ContactInterface) => <p>{row.client.email}</p> },
        { header: 'Phone', render: (row: ContactInterface) => <p>{row.client.phone}</p> },
        { header: 'Subject', render: (row: ContactInterface) => <p>{row.subject}</p> },
        { header: 'Comment', render: (row: ContactInterface) => <p>{row.comment}</p> },
        { header: '', render: (row: ContactInterface) => <ManageData id={row.id} deleteFunc={handleDeleteComment} /> },
    ];

    return(
        <>
            <Menus title="Contacts">               
                <div style={{padding: "15px"}}>
                    <div style={{display: "inline-flex"}}>
                        <FilterTab $selected={tabsState[0]} onClick={() => {
                            handlectiveTab(0); 
                            setFilter({property: "archived", defaultFilter:true});
                            setOrder({defaultOrder: false, property:'date'});
                        }}>All contacts</FilterTab>
                        <FilterTab $selected={tabsState[1]} onClick={() => {
                            handlectiveTab(1);
                            setFilter({property: "archived", value: true, defaultFilter:false}); 
                            setOrder({defaultOrder: false, property: "date"});
                            setCurrentPage(1);
                        }} >Archived</FilterTab>
                    </div>

                    <Table data={paginatedData} columns={columns} />

                    <Pagination>
                            <p>Showing comment from {getPaginationIndex()+1} to {getPaginationIndex()+itemsPerPage > filteredComments.length ? filteredComments.length : getPaginationIndex()+itemsPerPage} of {filteredComments.length} total comments </p>

                            <div>
                                <button onClick={() => handlePaginationChange(currentPage-1)}>Prev</button>
                                <input type="number" value={currentPage} onChange={(e) => handlePaginationChange(Number(e.target.value))}/>
                                <button onClick={() => handlePaginationChange(currentPage+1)}>Next</button>
                            </div>
                    </Pagination>
                </div>
            </Menus>
        </>
    )
};