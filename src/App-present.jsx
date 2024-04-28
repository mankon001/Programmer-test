import React, { useState } from 'react';
import './App.css'
import sampleData from '../public/sample-data.json';
import axios from 'axios';
import { Box, TextField, MenuItem, Select, Button, Stack } from '@mui/material';
import { styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { createTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';



function App() {
  const currencies = [
    { value: 'F', label: 'Female' },
    { value: 'M', label: 'Male' },
    { value: 'U', label: 'Unknown' },
  ];
//   ซึ่งเป็นอาร์เรย์ (array) ที่ประกอบด้วยอ็อบเจกต์ (objects) หลายตัว แต่ละอ็อบเจกต์มีคุณลักษณะสองค่าคือ value และ label: 
// value: เป็นค่าที่ใช้เพื่อระบุหรือแทนค่าของเงินสกุล ในที่นี้คือ 'F', 'M', และ 'U' ซึ่งเหมาะสำหรับใช้เป็นสำรับสำหรับคำสั่งหรือการจัดการข้อมูลเชิงตัวเลข เช่น ใช้ในการบันทึกข้อมูลในฐานข้อมูลหรือการคำนวณต่าง ๆ
// label: เป็นคำอธิบายหรือข้อความที่ใช้แสดงชื่อของเงินสกุล เช่น 'Female', 'Male', และ 'Unknown' ซึ่งเหมาะสำหรับใช้แสดงผลหรือเป็นข้อความที่เป็นมนุษย์เข้าใจได้
  
  const [formData, setFormData] = useState({
    no:'',
    fname: '', 
    lname: '', 
    gender: '', 
    score: ''
  });
//   ใช้ useState hook ใน React เพื่อสร้าง state ชื่อ formData ที่เก็บข้อมูลที่สำคัญเกี่ยวกับฟอร์ม เช่น ชื่อ (fname), นามสกุล (lname), เพศ (gender), และคะแนน (score) 
//   โดยใช้ object ในการเก็บข้อมูล เริ่มต้น formData มีค่าเป็น object ที่มีค่าว่างสำหรับทุก key
  
  const [invalidFields, setInvalidFields] = useState({
    fname: true ,
    lname: true ,
    gender: true ,
    score: true 
  });

  const handleChange = (event, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value
    });
    //ยังไม่เข้าใจ

    setInvalidFields({
      ...invalidFields,
      [fieldName]: false
    });
  };
  //ยังไม่เข้าใจ

  const handleCancel = () => {
    setFormData({
      fname: '',
      lname: '',
      gender: '',
      score: ''
    });
    setIsEditing(false);
  };

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const addNewData = async () => {
  setIsButtonClicked(true);
  
  const newInvalidFields = {};
  Object.entries(formData).forEach(([key, value]) => {
    if (value.trim() === '') {
      newInvalidFields[key] = true;
    }
  });
  setInvalidFields(newInvalidFields);

  if (Object.values(newInvalidFields).some(field => field)) {
    return;
  }
  
  try {
    const response = await axios.post('/sample-data.json', formData);
    console.log('New data added successfully:', response.data);
  } catch (error) {
    console.error('Error adding new data:', error);
  }

   const newData = {
    no: rows.length + 1, // หมายเลขแถวใหม่
    edit: <EditIcon />, // ปุ่มแก้ไข
    fname: formData.fname,
    lname: formData.lname,
    gender: formData.gender,
    score: formData.score
  };

  // เพิ่มข้อมูลใหม่เข้าไปในตัวแปร state ที่เก็บข้อมูลของแถวในตาราง
  setRows([...rows, newData]);

  // รีเซ็ตข้อมูลในฟอร์ม
  setFormData({
    fname: '',
    lname: '',
    gender: '',
    score: ''
  });
  setIsButtonClicked(false);
  };


  
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = (rowData) => {
    const { fname, lname, gender, score } = rowData;
    setFormData({
      fname,
      lname,
      gender,
      score
    });
    setIsEditing(true);
    
  };
  
  const updateData = () => {
    const updatedRows = rows.map((row) => {
      if (row.fname === formData.fname && row.lname === formData.lname) {
        return {
          ...row,
          fname: formData.fname,
          lname: formData.lname,
          gender: formData.gender,
          score: formData.score
        };
      }
      return row;
    });
    setRows(updatedRows); 
    setIsEditing(false);
    setFormData({
      fname: '',
      lname: '',
      gender: '',
      score: ''
    });
  };
  


  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));  

  const [rows, setRows] = useState(sampleData.map(user => ({
    no: user.id,
    edit: <EditIcon />,
    fname: user.firstname,
    lname: user.lastname,
    gender: user.gender !== undefined ? user.gender : '',
    score: user.score
  })));
  
  

  return (   
      <section>

        {/* ----------------------------------- TextField ----------------------------------- */}
        
            <Box component="form" sx={{
              '& .MuiTextField-root': { m: 1, width: '40ch' },
              }} noValidate autoComplete="off">
                

              <div className='require-field'>

                <div className='textfield'>
                  <TextField 
                  required
                  id="fname"
                  name="fname"
                  label="First name"
                  value={formData.fname}
                  onChange={e => handleChange(e, 'fname')}
                  error={(isButtonClicked && (invalidFields.fname || formData.fname.trim() === ''))}
                  helperText={(isButtonClicked && (invalidFields.fname || formData.fname.trim() === '')) ? "First name is required." : ''}
                  
                  />

                  <TextField 
                  required 
                  id="lname" 
                  label="Last name" 
                  value={formData.lname}
                  onChange={e => handleChange(e, 'lname')}
                  error={(isButtonClicked && (invalidFields.lname || formData.lname.trim() === ''))}
                  helperText={(isButtonClicked && (invalidFields.lname || formData.lname.trim() === '')) ? "Last name is required." : ''}
                  
                   />

                </div>

                <div className='textfield'>

                <TextField
                  required
                  id="gender" 
                  select
                  label="Gender" 
                  value={formData.gender}
                  onChange={e => handleChange(e, 'gender')}
                  error={(isButtonClicked && (invalidFields.gender || formData.gender.trim() === ''))}
                  helperText={(isButtonClicked && (invalidFields.gender || formData.gender.trim() === '')) ? "Gender is required." : ''}
                >            
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                    // จะทำการวนลูปผ่านอาร์เรย์ currencies เพื่อสร้าง MenuItem สำหรับแต่ละค่าของเงินสกุล โดยแต่ละ MenuItem จะมีค่า value เป็นค่า value 
                    // ของเงินสกุลและมีเนื้อหาแสดงเป็น label ของเงินสกุลนั้น ๆ ซึ่งทำให้ผู้ใช้สามารถเลือกเพศได้จากตัวเลือกที่กำหนดไว้ใน currencies นี้

                  ))}
                </TextField>


                <TextField required id="score" label="Score" value={formData.score} onChange={e=> handleChange(e,
                  'score')}
                  error={
                  isButtonClicked &&
                  (
                  invalidFields.score ||
                  (typeof formData.score === 'string' && formData.score.trim() === '') ||
                  (typeof formData.score === 'number' && (formData.score < 0 || formData.score> 100))
                    )
                    }
                    helperText={
                    isButtonClicked && (
                    invalidFields.score || (typeof formData.score === 'string' && formData.score.trim() === '')
                    ? "Score is required."
                    : formData.score < 0 ? "Minimum is 0" : formData.score> 100
                      ? "Maximum is 100"
                      : ''
                      )
                      }
                      />

                      </div>

                      <div style={{ display: 'flex', gap: '30px' }}>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ width: '100px', boxShadow: 'none' }}
                  onClick={isEditing ? updateData : addNewData}
                >
                  {isEditing ? 'Edit' : 'Add'}
                </Button>

                  <Button variant="outlined" size="large"
                    style={{ width:'100px', backgroundColor:'white',color:'black', border:'0'}} onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Box>

        {/* ----------------------------------- Table ----------------------------------- */}
            <div style={{ margin:'20px' }}>
              <TableContainer component={Paper} >
                <Table sx={{ minWidth: 700 }} aria-label="customized table" >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align='center' style={{ width: 50 }}>No.</StyledTableCell>
                      <StyledTableCell align='center' style={{ width: 50 }}></StyledTableCell>
                      <StyledTableCell>First name</StyledTableCell>
                      <StyledTableCell>Last name</StyledTableCell>
                      <StyledTableCell align='center'>Gender</StyledTableCell>
                      <StyledTableCell align='center'>Score</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rows.map((row) => (
                    <StyledTableRow key={row.no}>
                      <StyledTableCell component="th" scope="row" align='center'>{row.no}</StyledTableCell>

                      <StyledTableCell align='center' style={{ cursor: 'pointer' }} onClick={() => handleEdit(row)}>
                          {row.edit}
                      </StyledTableCell>

                      <StyledTableCell>{row.fname}</StyledTableCell>

                      <StyledTableCell>{row.lname}</StyledTableCell>

                      <StyledTableCell align='center' >
                      <Tooltip 
                      title={
                        row.gender === 'F' ? 'Female' :
                        row.gender === 'M' ? 'Male' :
                        row.gender === 'U' ? 'Unknown' : ''
                      }  style={{ cursor: 'pointer' }}>
                        <span>{row.gender}</span>
                      </Tooltip>
                      </StyledTableCell>

                      <StyledTableCell align='center'>
                          {row.score}
                      </StyledTableCell>

                    </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </div>


      </section>
  )
}

export default App
