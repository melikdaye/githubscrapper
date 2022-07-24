import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export const RepoCard = (props) =>{
    const repoProp = props.repo;

    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    const copyCloneURltoCB = (url) => {
        navigator.clipboard.writeText(`git clone ${url}`);
    }

    return(

        <Box position={"absolute"} sx={{width: "300px" ,opacity:clamp(props.opacity,0.0,1.0),left:props.left,zIndex:props.z_index,background: `rgb(${r}, ${g}, ${b})`,transform: `scale(${props.scale})`,
            transition: "left 0.2s ease,transform 0.2s linear,opacity 0.25s ease-in,z-index 0.3s ease",
            display: props.visible>=0 ? "block-inline" : "none"
        }}  >
            <Card variant="outlined" style={{ display:'flex', alignItems:'center',margin:"10px",flexDirection:"column",maxHeight:"200px",minHeight:"200px"}}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {props.index}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {repoProp.name}
                    </Typography>
                    <Typography variant="body2">
                     Stars : {repoProp.stargazers_count}
                    </Typography>
                    <Typography variant="body2">
                        Forks : {repoProp.forks}
                    </Typography>
                    <Typography variant="body2">
                        Size : {repoProp.size}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={()=>copyCloneURltoCB(repoProp.clone_url)}>Clone</Button>
                    <Button target="_blank" href={repoProp.html_url} size="small">Open in Github</Button>
                </CardActions>
            </Card>
        </Box>

    )
}