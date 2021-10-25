import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const accounts = [
  {type: 'Current', account_num: '1', balance: 10123.21, currency: 'HKD'},
  {type: 'Savings', account_num: '2', balance: 50123.21, currency: 'HKD'},
]
// TODO: get actual account records from API


const Home = () => {
  const [accounts, setAccounts] = useState([]);
  const username = localStorage.getItem('username');

  const fetchAccounts = (username) => {
    window.server.accounts.list_accounts(
      JSON.stringify({
        username: username,
      })
    ).then(res => {
      const data = JSON.parse(res);
      console.log(data);
      setAccounts(data);
    })
  };

  useEffect(() => {
    fetchAccounts(username);
  }, [username])

  return (
    <div>
      <Typography variant="h4" sx={{textAlign: 'center', marginTop: 8}}>
        Welcome Back, {username.replace(/^\w/, (c) => c.toUpperCase())}
      </Typography>
      <Container size='md' sx={{ mt: 8 }}>
        <TableContainer component={Paper}>
          <Table aria-label="accounts-table">
            <TableHead>
              <TableRow>
                <TableCell>Account Type</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map(account => (
                <TableRow key={account.account_num}>
                  <TableCell>
                    <Link to={{
                      pathname: "/account",
                      state: { accountNum: account.account_num, accountType: account.type },
                    }}>{account.account_type} Account</Link>
                  </TableCell>
                  <TableCell>{account.account_num}</TableCell>
                  <TableCell>{`${account.currency} ${account.balance}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}

export default Home;
