import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
	dialog: {
		display: "flex",
	},
	font: {
		fontSize: 20,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

function SimpleDialog(props) {
	const classes = useStyles();
	const { onClose, selectedValue, open } = props;
	const [address, setAddress] = useState("서울시 동작구");
	const [coordinates, setCoordinates] = useState("146, 234");
  const [kind, setKind] = useState("");
  const [problem, setProblem] = useState("");
	const handleKind = (event) => {
		setKind(event.target.value);
  };
  const handleProblem = (event) => {
    setProblem(event.target.value);
  }
	const handleClose = () => {
		onClose(selectedValue);
	};

	return (
		<Dialog p={2}
			onClose={handleClose}
			aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth='lg'
		>
			<Box className={classes.dialog}>
				<Box>
					<Typography className={classes.font}>{address}</Typography>
					<Typography className={classes.font}>{coordinates}</Typography>
					<img src="https://picsum.photos/400/300" alt="random img" />
				</Box>
				<Box>
					<form className={classes.root} noValidate autoComplete="off">
						<Typography>{new Date().toLocaleString()}</Typography>
						<FormControl className={classes.dialog}>
							<InputLabel id="demo-simple-select-label">대상</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={kind}
								onChange={handleKind}
							>
								<MenuItem value={'휠체어'}>휠체어</MenuItem>
								<MenuItem value={'노인'}>노인</MenuItem>
								<MenuItem value={'아동'}>아동</MenuItem>
								<MenuItem value={'기타'}>기타</MenuItem>
							</Select>
            </FormControl>
            <FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">문제</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={problem}
								onChange={handleProblem}
							>
								<MenuItem value={'고장/파손'}>고장/파손</MenuItem>
								<MenuItem value={'장애물'}>장애물</MenuItem>
								<MenuItem value={'미설치'}>미설치</MenuItem>
								<MenuItem value={'공사중'}>공사중</MenuItem>
								<MenuItem value={'수정'}>수정</MenuItem>
								<MenuItem value={'기타'}>기타</MenuItem>
              </Select>
              <TextareaAutosize aria-label="minimum height" rowsMin={10} placeholder="상세내용" />
						</FormControl>
					</form>
				</Box>
			</Box>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
};

export default function PopUp() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
	};

	return (
		<div>
			<br />
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Open simple dialog
			</Button>
			<SimpleDialog
				open={open}
				onClose={handleClose}
			/>
		</div>
	);
}
