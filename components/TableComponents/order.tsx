import Button from "../UIElements/Button";

export const OrderTableActionRow = (params:any)=>{
    return(
        <div className="flex gap-4 font-semibold w-max">
            <Button type="outline" className="w-24">
                View
            </Button>
            {
                params?.value==="pending"?
                    <Button type="outline" className="w-24" color="warning">
                        Start
                    </Button>
                :
                params?.value==="started"?
                    <Button type="outline" className="w-24" color="success">
                        Ready
                    </Button>
                :<></>
            }
        </div>
    );
}

const statusColumnClass = (param:any)=>(
    param?.value==="pending"?"text-yellow-600 text-lg":
    param?.value==="started"?"text-indigo-600 text-lg":
    param?.value==="served"?"text-green-600 text-lg":
    param?.value==="canceled"?"text-red-600 text-lg":
    "text-gray-600"
);
const headerClass = "text-gray-700 text-base";
const cellClass = "text-gray-600 text-base";

export const columnDefs = [
    { 
        field: '_id',
        headerName:"ID",
        headerClass:headerClass,
        cellClass:cellClass,
        filter: 'agTextColumnFilter',
    },
    { 
        field: 'date',
        headerName:"Date", 
        type: ['dateColumn', 'nonEditableColumn'],
        filter: 'agDateColumnFilter',
        headerClass:headerClass,
        cellClass:cellClass,
        width:150,
        sortable:true,
    },
    { 
        field: 'totalCost',
        headerName:"Total Cost",
        headerClass:headerClass,
        cellClass:cellClass,
        width:150,
        sortable:true,  
    },
    { 
        field: 'timeElapsed',
        headerName:"Time Elapsed",
        headerClass:headerClass,
        cellClass:cellClass,
        width:150,
        sortable:true  
    },
    { 
        field: 'tableNumber',
        headerName:"Table Number",
        headerClass:headerClass,
        cellClass:cellClass,
        width:160,
        filter: 'agTextColumnFilter',
        sortable:true,
    },
    { 
        field: 'status',
        headerName:"Status",
        cellClass:statusColumnClass,
        width:130,
        filter: 'agTextColumnFilter',
        sortable:true,
        rowDrag:true
    },
    { 
        field: 'status',
        headerName:"Actions",
        cellRenderer:OrderTableActionRow,
        width:350 
    },
];