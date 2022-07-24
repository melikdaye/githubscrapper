import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {UserListItem} from "../components/userListItem";
import {Autocomplete, Box, Button, Card, CardContent, Paper, Typography} from "@mui/material";
import {RepoCard} from "../components/repoCard";
import React from "react";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";

const sortOptions = ["Stars","Forks","Size"]

export const SearchView = () =>{

    const [page, setPage] = useState(1);
    const [users,setUsers] = useState([]);
    const [repos,setRepos] = useState([]);
    const [searchQuery,setSearchQuery] = useState("");
    const [selectedIndex,setIndex] = useState(0);
    const [selectedUser,setSelectedUser] = useState(null);
    const searchInput = React.useRef(null);
    const totalFoundUsers = React.useRef(0);


    const getUsers = (searchQuery,page) => {

        console.log(page)
        axios.get(`https://api.github.com/search/users?q=${searchQuery}+in:login&per_page=5&page=${page}`).then((response) => {
            console.log(response.data)
            totalFoundUsers.current = response.data.total_count
            setUsers(response.data.items)

        });
        setSearchQuery(searchQuery)


    }

    const incrementPage = () => {
        getUsers(searchQuery,page+1);
        setPage(page+1);
    }

    const decrementPage = () => {
        getUsers(searchQuery,page-1);
        setPage(page-1);
    }

    const getRepos = (userName) => {
        axios.get(`https://api.github.com/users/${userName}/repos`).then((response) => {
            setRepos(response.data)
        });

        axios.get(`https://api.github.com/users/${userName}`).then((response) => {
            console.log(response.data)
            setSelectedUser(response.data)
        });
        setIndex(0);
    }

    const sortRepos = (sortCriteria) =>{
        console.log(sortCriteria)
        if(sortCriteria === "Size"){
            console.log("size")
            setRepos([...repos.sort((a,b)=> a.size<b.size ? 1 : -1)])
        }
        else if(sortCriteria === "Forks"){
            setRepos([...repos.sort((a,b)=> a.forks<b.forks ? 1 : -1)])
        }
        else if(sortCriteria === "Stars"){

            setRepos([...repos.sort((a,b)=> a.stargazers_count<b.stargazers_count ? 1 : -1)])
        }

    }


    return(
        <React.Fragment>
        <Box  display={"flex"}  alignItems={"center"} flexDirection={"column"} style={{margin:"20px"}}>
            <form style={{paddingBottom:"10px"}}>
                <TextField
                    id="searchUser"
                    ref={searchInput}
                    className="text"
                    value={searchQuery}
                    onChange={(e) => {
                        getUsers(e.target.value,page);
                    }}
                    label="Enter Username"
                    variant="outlined"
                    placeholder="coderXXX..."
                    size="small"
                />
                <IconButton type="submit" aria-label="search">
                    <SearchIcon style={{ fill: "black" }} />
                </IconButton>
            </form>
        {users.map((user)=>{
            return <UserListItem key={user.login} user={user} callback={getRepos} />
        })}
            <Box  display={"flex"}  alignItems={"center"} flexDirection={"row"} style={{margin:"10px"}}>
                <Button disabled={page<2} onClick={()=>decrementPage()} startIcon={<ChevronLeft/>} />
                <h5>{page}</h5>
                <Button disabled={page>=totalFoundUsers.current/5} onClick={()=>incrementPage()} endIcon={<ChevronRight/>} />
            </Box>
            <Box  display={"flex"} justifyContent={"space-around"} alignItems={"center"} flexDirection={"row"} style={{margin:"20px",minWidth:"750px"}}>

                <Box  display={"flex"}  alignItems={"center"} flexDirection={"column"} style={{margin:"20px"}}>
                    {selectedUser ?
                    <Card >
                        <CardContent>
                            <Typography variant="body2">
                                Repositories : {selectedUser.public_repos}
                            </Typography>
                            <Typography variant="body2">
                                Followers : {selectedUser.followers}
                            </Typography>
                            <Typography variant="body2">
                                Following : {selectedUser.following}
                            </Typography>
                        </CardContent>
                    </Card>
                    : <React.Fragment/>}
                    <Button variant="contained" sx={{marginTop:"10px"}} onClick={()=>{setIndex(0)}} color={"primary"}>Reset Stack</Button>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={sortOptions}
                    sx={{ width: 200,marginTop:"8%"}}
                    onChange={(e,value)=>sortRepos(value)}

                    renderInput={(params) => <TextField {...params} label="Sort By" />}
                />

                </Box>
                <IconButton onClick={()=>{if(selectedIndex === 0){setIndex(repos.length-1)}else{setIndex(selectedIndex-1)}}}><ChevronLeft/></IconButton>
                <Box alignItems={"center"}  position={"relative"} left={"0%"} minHeight={300} display={"flex"} flexDirection={"row"} width={"50%"} overflow={"hidden"}>
                    {repos.map((repo,index)=>{
                        return <RepoCard  index={index} key={repo.name} repo={repo} opacity={1.0-(index-selectedIndex)*0.33} left={50*(index-selectedIndex)} z_index={9999-Math.abs(selectedIndex-index)}
                                          scale={1.0-Math.abs(index-selectedIndex)*0.1} visible={index-selectedIndex}
                        />
                    })}
                </Box>
                <IconButton onClick={()=>{if(selectedIndex === repos.length-1){setIndex(0)}else{setIndex(selectedIndex+1)}}}><ChevronRight/></IconButton>
            </Box>


        </Box>

        </React.Fragment>
    )


}

