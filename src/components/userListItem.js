import {Avatar, Button, Card} from "@mui/material";

export const UserListItem = (props) => {
    const userProps = props.user
    return(
    <Card style={{ display:'flex', alignItems:'center',justifyContent:'space-around',width:"50%",margin:"10px"}}>
        <Avatar  alt={userProps.login} src={userProps.avatar_url} />
        <h4 style={{  flexBasis: "20%"}}>{userProps.login}</h4>
        <Button  variant={"contained"} color={"success"} onClick={()=>props.callback(userProps.login)}>View Repos</Button>
    </Card>
    )
}