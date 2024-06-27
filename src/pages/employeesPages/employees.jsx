import employees from '../../data/employeesData.json';
import { Menus } from '../../components/Menus/menus';
import { useMemo, useState } from 'react';
import { Table } from '../../components/Tables/Table';
import { Pagination, Image, FilterTab, ManageData } from '../../components/Tables/GeneralTableComponents';

export const EmployeesPage = () => {
    const [tabsState, setTabsState] = useState([true, false, false])
    const [employeeData, setEmployeeData] = useState(employees)
    const [order, setOrder] = useState({defaultOrder: true}); //object with properties: property, value
    const [filter, setFilter] = useState({defaultFilter: true}); //object with properties: property, value
    const [search, setSearch] = useState({property: "fullName", value: ""}); //object with properties: property, value
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredEmployees = useMemo(() => {
        let newEmployeesList = employeeData.filter(employees => employees[filter.property] == filter.value);
        setCurrentPage(1);

        if (search.value !== "") {
            newEmployeesList = newEmployeesList.filter(employees => 
                employees[search.property] && employees[search.property].toLowerCase().includes(search.value.toLowerCase())
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

    function handlePaginationChange(page){
        if(page <= Math.ceil(filteredEmployees.length / itemsPerPage) && page > 0)
            setCurrentPage(page);
    }

    function handleDeleteEmployee(idToFilter){
        const deletedData = [...employeeData].filter(employees => employees.id !== idToFilter);
        setEmployeeData(deletedData)
    }

    function handleEditEmployee(idToFilter){
    }

    function handleDropdownChange(event){
        let order = {property: event.target.value}
        if(event.target.value === "name")
            order.inversed = true;
        
        setOrder(order)
    }

    function handlectiveTab(newActiveTab){
        let newTabsState = [false, false, false]
    
        newTabsState[newActiveTab] = true;
    
        setTabsState(newTabsState);
    }

    function handleInputChange(event){
        setSearch({property: "name", value: event.target.value});
    };

    const columns = [
        { header: 'Photo', render: (row) => <Image $src={row.photo}/>, },
        { header: 'Name', render: (row) => <p>{row.name}</p>, },
        { header: 'Id', render: (row) => <p>{row.id}</p>, },
        { header: 'Email', render: (row) => <p>{row.email}</p>, },
        { header: 'Start date', render: (row) => <p>{row.date}</p>, },
        { header: 'Description', render: (row) => <p>{row.position.description}</p>, },
        { header: 'Contact', render: (row) => <p>{row.phone}</p>, },
        { header: 'Status', render: (row) => <p>{row.status ? "ACTIVE" : "INACTIVE"}</p>, },
        { header: '',  render: (row) => <ManageData id={row.id} editFunc={handleEditEmployee} deleteFunc={handleDeleteEmployee}/>, },
    ];

    return(
        <>
            <Menus title="employees">
                <div style={{padding: "15px"}}>
                <div style={{display: "inline-flex"}}>
                        <FilterTab $selected={tabsState[0]} onClick={() => {
                            handlectiveTab(0); 
                            setFilter({});
                            setOrder({property: "name", inversed: true}); //DefaultOrder value doens't matter, only if the property exist or not
                        }}>All Employee</FilterTab>
                        <FilterTab $selected={tabsState[1]} onClick={() => {
                            handlectiveTab(1);
                            setFilter({property: "status", value: true}); 
                            setOrder({property: "name", inversed: true});
                            setCurrentPage(1);
                        }} >Active Employee</FilterTab>
                        <FilterTab $selected={tabsState[2]} onClick={() => {
                            handlectiveTab(2);
                            setFilter({property: "status", value: false}); 
                            setOrder({property: "name", inversed: true});
                            }}>Inactive Employee</FilterTab>
                    </div>

                    <input type="text" value={search.value} onChange={handleInputChange} />

                    <select id="orderDropdown" onChange={handleDropdownChange}>
                        <option value="">Select an option</option>
                        <option value="name">Nombre</option>
                        <option value="date">Fecha</option>
                    </select>

                    <Table data={paginatedData} columns={columns} />

                    <Pagination>
                        <p>Showing employee from {getPaginationIndex()+1} to {getPaginationIndex()+itemsPerPage > filteredEmployees.length ? filteredEmployees.length : getPaginationIndex()+itemsPerPage} of {filteredEmployees.length} total employees </p>

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