import { Menus } from '../../components/Menus/menus';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Table, TableProps } from '../../components/Tables/Table';
import { Pagination, Image, FilterTab, ManageData } from '../../components/Tables/GeneralTableComponents';
import { useNavigate } from 'react-router';
import { deleteUser, fetchUserList } from '../../features/UserSlice/userThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EmployeeInterface, EmployeeProperties } from '../../types';
import { MenuChild, TabsContainer } from '../../components/pagesGeneralComponents';

interface Order {
    property: EmployeeProperties;
    inversed?: boolean;
    defaultOrder: boolean;
}

interface Filter {
    property: EmployeeProperties;
    value?: string | boolean | number;
    defaultFilter: boolean;
}

interface Search {
    property: EmployeeProperties;
    value: string;
}

export const EmployeesPage = () => {
    const [tabsState, setTabsState] = useState([true, false, false])
    const [employeeData, setEmployeeData] = useState<EmployeeInterface[]>([])
    const [order, setOrder] = useState<Order>({property:'_id', defaultOrder: true});
    const [filter, setFilter] = useState<Filter>({property:'_id', defaultFilter: true});
    const [search, setSearch] = useState<Search>({property: "name", value: ""});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.userSlice.status);
    const employeeSliceData = useAppSelector((state) => state.userSlice.items);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUserList());
        }
        else if (status === 'fulfilled') {
            setEmployeeData(employeeSliceData);
        }
        else if (status === 'rejected') {
            console.log("rejectedPetition")
        }
    }, [status, employeeSliceData, dispatch])

    const filteredEmployees = useMemo(() => {
        let newEmployeesList:EmployeeInterface[] = [...employeeData];//employeeData.filter(employees => employees[filter.property] == filter.value);
        if(!filter.defaultFilter)
            newEmployeesList = employeeData.filter(employee => employee[filter.property] == filter.value)

        setCurrentPage(1);

        if (search.value !== "") {
            newEmployeesList = newEmployeesList.filter(employees => 
                employees[search.property] && employees[search.property].toString().toLowerCase().includes(search.value.toLowerCase())
            );
        }
        
        if(!(order.defaultOrder))
        {
            newEmployeesList.sort((a,b) => {
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

        return newEmployeesList;
    }, [order, filter, search, employeeData])

    const paginatedData = useMemo(() =>{
        return filteredEmployees.slice(getPaginationIndex(), getPaginationIndex() + itemsPerPage);
    }, [filteredEmployees, currentPage])

    function getPaginationIndex(){
        return (currentPage - 1) * itemsPerPage;
    }

    function handlePaginationChange(page:number){
        if(page <= Math.ceil(filteredEmployees.length / itemsPerPage) && page > 0)
            setCurrentPage(page);
    }

    function handleDeleteEmployee(idToFilter:string){
        dispatch(deleteUser(idToFilter))
    }

    function handleEditEmployee(idToFilter:string){
        navigate("edit/"+idToFilter)
    }

    const handleCreateEmployee = () => {
        navigate("create")
    }

    function handleDropdownChange(event: React.ChangeEvent<HTMLSelectElement>){
        let order:Order = {property: event.target.value as EmployeeProperties, defaultOrder:false}
        if(event.target.value === "name")
            order.inversed = true;
        
        setOrder(order)
    }

    function handlectiveTab(newActiveTab:number){
        let newTabsState = [false, false, false]
    
        newTabsState[newActiveTab] = true;
    
        setTabsState(newTabsState);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        setSearch({property: "name", value: event.target.value});
    };

    const columns: TableProps<EmployeeInterface>['columns'] = [
        { header: 'Photo', render: (row:EmployeeInterface) => <Image $src={row.photo}/>, },
        { header: 'Name', render: (row:EmployeeInterface) => <p>{row.name}</p>, },
        { header: 'Id', render: (row:EmployeeInterface) => <p>{row._id}</p>, },
        { header: 'Email', render: (row:EmployeeInterface) => <p>{row.email}</p>, },
        { header: 'Start date', render: (row:EmployeeInterface) => <p>{row.date}</p>, },
        { header: 'Description', render: (row:EmployeeInterface) => <p>{row.positionDescription}</p>, },
        { header: 'Contact', render: (row:EmployeeInterface) => <p>{row.phone}</p>, },
        { header: 'Status', render: (row:EmployeeInterface) => <p>{row.status ? "ACTIVE" : "INACTIVE"}</p>, },
        { header: '',  render: (row:EmployeeInterface) => <ManageData id={row._id} editFunc={handleEditEmployee} deleteFunc={handleDeleteEmployee}/>, },
    ];

    if(status === 'idle')
        return (<Menus title="Employees"><h1>LOADING</h1></Menus>)

    return(
        <>
            <Menus title="Employees">
                <MenuChild>
                    <TabsContainer>
                        <FilterTab $selected={tabsState[0]} onClick={() => {
                            handlectiveTab(0); 
                            setFilter({property:'_id', defaultFilter: true});
                            setOrder({property: "name", inversed: true, defaultOrder: false});
                        }}>All Employee</FilterTab>
                        <FilterTab $selected={tabsState[1]} onClick={() => {
                            handlectiveTab(1);
                            setFilter({property: "status", value: true, defaultFilter: false}); 
                            setOrder({property: "name", inversed: true, defaultOrder: false});
                            setCurrentPage(1);
                        }} >Active Employee</FilterTab>
                        <FilterTab $selected={tabsState[2]} onClick={() => {
                            handlectiveTab(2);
                            setFilter({property: "status", value: false, defaultFilter: false}); 
                            setOrder({property: "name", inversed: true, defaultOrder: false});
                            }}>Inactive Employee</FilterTab>
                    </TabsContainer>

                    <input type="text" value={search.value} onChange={handleInputChange} />

                    <select id="orderDropdown" onChange={handleDropdownChange}>
                        <option value="">Select an option</option>
                        <option value="name">Nombre</option>
                        <option value="date">Fecha</option>
                    </select>

                    <button onClick={handleCreateEmployee}>Create Employee</button>

                    <Table<EmployeeInterface> data={paginatedData} columns={columns} />

                    <Pagination>
                        <p>Showing employee from {getPaginationIndex()+1} to {getPaginationIndex()+itemsPerPage > filteredEmployees.length ? filteredEmployees.length : getPaginationIndex()+itemsPerPage} of {filteredEmployees.length} total employees </p>

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