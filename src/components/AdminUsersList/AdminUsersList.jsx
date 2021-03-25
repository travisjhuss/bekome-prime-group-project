import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import useStyles from '../../hooks/useStyles';

function AdminUsersList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((store) => store.allUsers);

  useEffect(() => {
    dispatch({ type: 'FETCH_USERS' });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">User Type</TableCell>
            <TableCell align="right">Filled out form?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.user_type}</TableCell>
                <TableCell align="right">
                  {user.filled_out_form.toString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminUsersList;
