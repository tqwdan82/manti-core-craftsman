import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

export function Alert(props) {
	const { children, ...other } = props;

	return (
		<MuiAlert elevation={6} variant="filled" {...other} >
			{children}
		</MuiAlert>
	);
}