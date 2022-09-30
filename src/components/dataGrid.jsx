import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PageviewIcon from '@mui/icons-material/Pageview';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
    randomId,
} from '@mui/x-data-grid-generator';
import { Modal, Typography, TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const initialRows = [
    {
        id: 1,
        name: 'Example',
        age: 25,
        dateCreated: '1900 01-01 00:00:00',
        lastLogin: '1900 01-01 00:00:00',
    },
];
let counts = 0
function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, ItemName: '', Quantity: '', Description: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'ItemName' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

export default function FullFeaturedCrudGrid({ token }) {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [oldChange, setChange] = useState(false)
    const [oldRows, setOldRows] = useState([])
    const [toggle, setToggle] = useState(false)
    const [editFlag, setEditFlag] = useState(false)
    const [editId, setEditId] = useState(0)
    const [count, setCount] = useState(0)
    const [open, setOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState(undefined)
    const [confirmation, setConfirmation] = useState(false)
    const [confirmationInfo, setConfirmationInfo] = useState(false)
    const [editField, setEdit] = useState(undefined)
    const [editInfo, setEditInfo] = useState(undefined)
    const [updatedQuantity, setUpdatedQuantity] = useState(undefined)
    const [updatedDescription, setUpdatedDesciption] = useState(undefined)

    const modalClose = () => setOpen(false);
    const confirmationClose = () => setConfirmation(false);
    const editClose = () => setEdit(false);

    useEffect(() => {
        fetch('https://ussf-z-prefix-tyler-api.herokuapp.com/inventory/seeitem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserId: token[0].id
            })
        }
        ).then(res => res.json())
            .then(data => setRows(data))
    }, [toggle])

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
        console.log("edit start", rows)
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
        console.log("edit stop", rows)

    };

    const handleEditClick = (id) => () => {
        let newRow = rows.filter((row) => row.id == id)
        setEditId(id)
        setEditFlag(true)
        setEdit(true)
        setEditInfo(newRow)
    };

    const handleViewClick = (id) => () => {
        let newRow = rows.filter((row) => row.id == id)
        setModalInfo(newRow);
        setOpen(true)

    }

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        setChange(true);
        setToggle((!toggle))
    };

    const handleDeleteClick = (id) => () => {
        let newRow = rows.filter((row) => row.id == id)
        setConfirmationInfo(newRow)
        setConfirmation(true);

    };
    const handleDelete = () => {
        console.log("here")
        setRows(rows.filter((row) => row.id !== confirmationInfo[0].id));
        console.log()
        confirmationClose()
        fetch('https://ussf-z-prefix-tyler-api.herokuapp.com/inventory', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserId: token[0].id,
                Quantity: confirmationInfo[0].Quantity,
                ItemName: confirmationInfo[0].ItemName,
                Description: confirmationInfo[0].Description,
            })
        }).then(() => setToggle(!toggle))
    }
    const handleEdit = () => {
        console.log("here edit")
        let newRow = {
            UserId: token[0].id,
            Quantity: updatedQuantity,
            ItemName: editInfo[0].ItemName,
            Description: updatedDescription
        }
        console.log(newRow);
        fetch('https://ussf-z-prefix-tyler-api.herokuapp.com/inventory/', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserId: newRow.UserId,
                Quantity: newRow.Quantity,
                ItemName: newRow.ItemName,
                Description: newRow.Description
            })
        }).then(data => data.json).then(data => console.log(data)).then(() => setToggle(!toggle))
        editClose()
        setToggle(!toggle);
    }
    const quantityHandler= (e) => {
        setUpdatedQuantity(e.target.value)
    }
    const descriptionHandler= (e) => {
        setUpdatedDesciption(e.target.value)
    }

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };
    const columns = [
        { field: 'ItemName', headerName: 'Item Name', width: 180, editable: true },
        { field: 'Quantity', headerName: 'Quantity', type: 'number', editable: true },
        {
            field: 'Description',
            headerName: 'Description',
            type: 'text',
            width: 600,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<PageviewIcon />}
                            label="view"
                            onClick={handleViewClick(id)}
                            color="inherit"
                        />,

                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<PageviewIcon />}
                        label="view"
                        onClick={handleViewClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,

                ];
            },
        },
    ];


    if (oldChange == true) {
        let length = rows.length;
        let newRow = rows[(length - 1)];
        if (newRow.ItemName.length > 0) {
            fetch("https://ussf-z-prefix-tyler-api.herokuapp.com/inventory/additem", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    UserId: token[0].id,
                    Quantity: newRow.Quantity,
                    ItemName: newRow.ItemName,
                    Description: newRow.Description,
                })
            }).then(data => data.json).then(data => console.log(data)).then(() => {
                setChange(false)
                setToggle((!toggle))
            })
        }
    }
    return (
        <>
            <Box
                sx={{
                    height: 500,
                    width: '100%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                    backgroundColor: 'white',
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    components={{
                        Toolbar: EditToolbar,
                    }}
                    componentsProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>

            {modalInfo ? (<Modal
                open={open}
                onClose={modalClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Item Name: {modalInfo[0].ItemName}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Current Inventory: {modalInfo[0].Quantity}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Description: {modalInfo[0].Description}
                    </Typography>
                </Box>
            </Modal>) : (<></>)}
            <Modal
                open={confirmation}
                onClose={confirmationClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirm Item Deletion
                    </Typography>
                    <Button onClick={handleDelete}>YES</Button>
                    <Button onClick={confirmationClose}>NO</Button>
                </Box>
            </Modal>

            {editInfo ? (<Modal
                open={editField}
                onClose={editClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Input Changes here
                    </Typography>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Item Name"
                        defaultValue={editInfo[0].ItemName}
                        variant="filled"
                        style={{
                            width: '100%',
                        }}
                    />
                    <TextField
                        type="number"
                        id="outlined-disabled"
                        label="Quantity"
                        defaultValue={editInfo[0].Quantity}
                        variant="filled"
                        onChange={e => quantityHandler(e)}
                        style={{
                            width: '100%',
                        }}
                    />
                    <TextField
                        id="outlined-disabled"
                        label="Description"
                        defaultValue={editInfo[0].Description}
                        variant="filled"
                        onChange={e => descriptionHandler(e)}
                        style={{
                            width: '100%',
                        }}
                    />
                    <Button onClick={handleEdit}>CONFIRM</Button>
                    <Button onClick={editClose}>DISREGARD CHANGES</Button>
                </Box>
            </Modal>) : (<></>)}
            
        </>
    );
}
