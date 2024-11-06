import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

// Material-UI Components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Modal from "@material-ui/core/Modal";

// Material-UI Icons
import MoreIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AllInboxOutlinedIcon from "@material-ui/icons/AllInboxOutlined";
import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActiveOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

const useStyles = makeStyles((theme) => ({
	// ...styles here
}));

const getModalStyle = () => {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
		border: "1px solid rgba(0, 0, 0, 0.015)",
	};
};

const Navbar = () => {
	const history = useHistory();
	const [search, setSearch] = useState([]);

	// Material-Ui
	const classes = useStyles();
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = useState(getModalStyle);
	const [openModal, setOpenModal] = useState(false);

	const findUser = (pattern) => {
		if (pattern !== "") {
			const URL = `http://localhost:5000/users-research`;
			const config = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("jwt"),
				},
			};
			Axios.post(URL, { pattern }, config).then((res) => {
				setSearch(res.data);
			});
		}
	};

	const handleOpenModal = () => {
		handleMobileMenuClose();
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleLogOut = () => {
		history.push("/login");
	};

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem onClick={handleOpenModal}>
				<IconButton>
					<SearchOutlinedIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
				</IconButton>
				<p>Search</p>
			</MenuItem>
			<MenuItem component={Link} to="/explore">
				<IconButton>
					<ExploreOutlinedIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
				</IconButton>
				<p>Explore</p>
			</MenuItem>
			<MenuItem component={Link} to="/create">
				<IconButton>
					<AddAPhotoOutlinedIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
				</IconButton>
				<p>Add Post</p>
			</MenuItem>
			<MenuItem component={Link} to="#">
				<IconButton>
					<Badge badgeContent={4} color="secondary">
						<AllInboxOutlinedIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem component={Link} to="#">
				<IconButton>
					<Badge badgeContent={6} color="secondary">
						<NotificationsActiveOutlinedIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem component={Link} to="/profile">
				<IconButton>
					<AccountCircleOutlinedIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
			<MenuItem onClick={handleLogOut}>
				<IconButton>
					<ExitToAppOutlinedIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
				</IconButton>
				<p>LogOut</p>
			</MenuItem>
		</Menu>
	);

	const modalBody = (
		<div style={modalStyle} className={classes.paper}>
			<div className={classes.search} style={{ margin: "0px auto" }}>
				<div className={classes.searchIcon}>
					<SearchOutlinedIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
				</div>
				<InputBase
					placeholder=" Search…"
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput,
					}}
					inputProps={{ "aria-label": "search" }}
					onChange={(e) => findUser(e.target.value)}
				/>
			</div>
			<List className={classes.root}>
				{search.user
					? search.user.map((item) => {
							return (
								<Link
									className={classes.links}
									key={item._id}
									to={`/profile/${item._id}`}
									onClick={handleCloseModal}
								>
									<Divider variant="inset" component="li" style={{ marginLeft: "0px" }} />
									<ListItem alignItems="flex-start">
										<ListItemAvatar>
											<Avatar alt={item.Name} src="/static/images/avatar/1.jpg" />
										</ListItemAvatar>
										<ListItemText
											primary={item.Name}
											secondary={<React.Fragment>{item.Email}</React.Fragment>}
										/>
									</ListItem>
								</Link>
							);
					  })
					: null}
			</List>
		</div>
	);

	return (
		<nav>
			<div className={classes.grow}>
				<AppBar position="static" style={{ backgroundColor: "#ffffff" }}>
					<Toolbar>
						<Link to="/" className={classes.links}>
							<Typography className={classes.title} variant="h4" noWrap>
								Instagram Clone
							</Typography>
						</Link>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							<BottomNavigation>
								<BottomNavigationAction
									label="Search"
									onClick={handleOpenModal}
									icon={<SearchOutlinedIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />}
								/>
								{/* Other actions */}
							</BottomNavigation>
						</div>
						<div className={classes.sectionMobile}>
							<IconButton
								aria-label="show more"
								aria-controls={mobileMenuId}
								aria-haspopup="true"
								onClick={handleMobileMenuOpen}
								color="inherit"
							>
								<MoreIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{renderMobileMenu}
				<Modal open={openModal} onClose={handleCloseModal}>
					{modalBody}
				</Modal>
			</div>
		</nav>
	);
};

export default Navbar;
