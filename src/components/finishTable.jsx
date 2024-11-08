import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Fab, Typography, Box } from '@mui/material';
import { Check, Clear, Clear as ClearIcon, QuestionMark, RestartAlt } from '@mui/icons-material';

const FinishTable = ({ answers }) => {
    return (
        <TableContainer component={Paper} sx={{ padding: 4, marginTop: "5%", width: "70%" }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>Cevap Tablosu</Typography>
                <Fab color="warning" sx={{ alignSelf: 'flex-end', margin: "10px" }} onClick={() => window.location.reload()} >
                    <RestartAlt />
                </Fab>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ ...cellStyle, ...cellHeadStyle }}>#</TableCell>
                        <TableCell sx={{ ...cellStyle, ...cellHeadStyle }}>Soru</TableCell>
                        <TableCell sx={{ ...cellStyle, ...cellHeadStyle }}>A</TableCell>
                        <TableCell sx={{ ...cellStyle, ...cellHeadStyle }}>B</TableCell>
                        <TableCell sx={{ ...cellStyle, ...cellHeadStyle }}>C</TableCell>
                        <TableCell sx={{ ...cellStyle, ...cellHeadStyle }}>D</TableCell>
                        <TableCell sx={{ ...cellStyle, ...cellHeadStyle }}>BOŞ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {answers.map((item, index) => {
                        const answer = item.answer;
                        const getIcon = (column) => {
                            if (answer === column) {
                                return answer === "" ? <QuestionMark color="warning" /> : <Check color="success" />;
                            }
                            if (answer === "") {
                                return column === "BOŞ" ? <QuestionMark color="warning" /> : null;
                            }
                            return null;
                        };

                        return (
                            <TableRow key={index}>
                                <TableCell sx={cellStyle}>{index+1}</TableCell>
                                <TableCell sx={cellStyle}>{item.question}?</TableCell>
                                <TableCell sx={cellStyle}>{getIcon("a")}</TableCell>
                                <TableCell sx={cellStyle}>{getIcon("b")}</TableCell>
                                <TableCell sx={cellStyle}>{getIcon("c")}</TableCell>
                                <TableCell sx={cellStyle}>{getIcon("d")}</TableCell>
                                <TableCell sx={cellStyle}>{getIcon("")}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FinishTable;

const cellStyle = { border: '1px solid black' }
const cellHeadStyle = { fontWeight: "bold", textAlign: "center" }
