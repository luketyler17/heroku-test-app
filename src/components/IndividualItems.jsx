import { Card } from "@mui/material"
import {Button} from "@mui/material"
const IndividualItems = ({ item }) => {
    if(item.Description.length > 100) {
        let newdescription = item.Description.slice(0, 100);
        newdescription += '...';
        item.Description = newdescription
    }
    console.log(item)
    return(
            <Card variant='outlined'
                style={{
                    display: 'flex',
                    width:"25%",
                    height: "150px",
                    flexWrap: 'wrap',
                    margin: '15px',
                }}>
                    Item Name: {item.ItemName}
                    <br />
                    Quantity: {item.Quantity}
                    <br />
                    Description: {item.Description}
                    <Button variant="outlined">Update</Button>
                    <Button variant="outlined">Delete</Button>
            </Card>
    )
}

export default IndividualItems