import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: "20px auto",
    "& .MuiTextField-root": {
      width: "100%",
    },
  },
  header: { padding: "10px" },
  media: { height: "300px" },
  comments: { display: "flex", alignItems: "center" },
  avatar: { width: "40px", height: "40px" },
  links: { textDecoration: "none" },
}));

const Home = () => {
  const classes = useStyles();
  const [data, setData] = useState([
    {
      _id: "1",
      PostedBy: { _id: "123", Name: "John Doe" },
      Body: "This is a dummy post",
      Likes: [],
      Comments: [],
      Photo: "https://via.placeholder.com/500",
      PhotoType: "image/jpeg",
    },
    {
      _id: "2",
      PostedBy: { _id: "456", Name: "Jane Smith" },
      Body: "Another post to interact with",
      Likes: [],
      Comments: [],
      Photo: "https://via.placeholder.com/500",
      PhotoType: "image/jpeg",
    },
  ]);
  const [comment, setComment] = useState("");

  const likePost = (postId) => {
    setData(data.map(post => 
      post._id === postId 
        ? { ...post, Likes: post.Likes.includes("defaultUser") ? post.Likes.filter(id => id !== "defaultUser") : [...post.Likes, "defaultUser"] } 
        : post
    ));
  };

  const makeComment = (text, postId) => {
    setComment("");
    setData(data.map(post =>
      post._id === postId
        ? { ...post, Comments: [...post.Comments, { _id: Date.now().toString(), PostedBy: { _id: "defaultUser", Name: "Default User" }, Text: text }] }
        : post
    ));
  };

  return (
    <>
      <Navbar />
      {data.map((post) => (
        <Card className={classes.root} key={post._id}>
          <CardHeader
            className={classes.header}
            avatar={<Avatar>{post.PostedBy.Name.charAt(0)}</Avatar>}
            title={<Link to={`/profile/${post.PostedBy._id}`} className={classes.links}>{post.PostedBy.Name}</Link>}
            subheader="Posted on Today"
          />
          <CardMedia className={classes.media} image={post.Photo} title="Post image" />
          <CardContent>
            <Typography variant="body2" color="textSecondary">{post.Body}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={() => likePost(post._id)}>
              {post.Likes.includes("defaultUser") ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="subtitle2">{post.Likes.length} Likes</Typography>
            <IconButton><ChatBubbleOutlineIcon /></IconButton>
          </CardActions>
          <CardContent>
            <List>
              {post.Comments.map((cmt) => (
                <ListItem key={cmt._id}>
                  <ListItemText
                    primary={<Link to={`/profile/${cmt.PostedBy._id}`} className={classes.links}>{cmt.PostedBy.Name}</Link>}
                    secondary={cmt.Text}
                  />
                </ListItem>
              ))}
            </List>
            <Divider />
            <div className={classes.comments}>
              <TextField
                multiline
                rows={1}
                placeholder="Add a comment..."
                variant="outlined"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ flex: 1 }}
              />
              <IconButton disabled={!comment} onClick={() => makeComment(comment, post._id)}>
                <SendIcon />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Home;
