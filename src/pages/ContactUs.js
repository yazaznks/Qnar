import React, { useState, useEffect }  from 'react'
// quicksand, burger menubar, email send, main bg boy and girl
import {Box, Typography, TextField, Button,  Dialog, DialogContent, DialogActions, IconButton} from '@mui/material';
import { useTranslation } from 'react-i18next';
import phone from '../Assets/phone.png'
import emailPic from '../Assets/email.png'
import location from '../Assets/location.png'
import emailjs from 'emailjs-com';
import { Close as CloseIcon } from '@mui/icons-material';
function ContactUs() {
    const {t, i18n} = useTranslation();
      const phoneNumber = '+97433477044';
  const emailAddress = 'contact@qnarweb.com';
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const handleClickOpen = () => {
    // Perform the actions needed based on the id
    setIsDialogOpen(true);
  };
  

  const handleClose = () => {
    setIsDialogOpen(false);
  };
  const handleChangeEmail = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmailEmail = () => {


    emailjs.send(
      'service_4xwd306', 
      'template_xofsc8o', 
      formData, 
      'mUqAWzZcVbrWiKca5'
    )
    .then((result) => {
        console.log('Email successfully sent!', result.text);

    }, (error) => {
        console.log('Failed to send email:', error.text);
    });
  setFormData({
    name: '',
    email: '',
    message: '',
  });}

  return (
    <Box sx={{overflow: 'hidden',display: 'flex',flexDirection:'column'}}>
    <Box sx={{flex: 1,display: 'flex',alignItems: 'center', justifyContent: 'center',}}><Typography style={{color:'#3B5D44'}} variant='h2'>{t('contact')}</Typography></Box>
      <Box sx={{flex: 1,display: 'flex',  flexDirection: 'row',alignItems: 'center', justifyContent: 'center'}}>
      <a style={{marginRight:'5vw'}} href={`tel:${phoneNumber}`}><img className="contactIMG" src={phone}alt="Background"/></a>
      <a style={{marginRight:'5vw'}} href={`mailto:${emailAddress}`}>< img  className="contactIMG" src={emailPic}alt="Background"/></a>
      <a style={{marginRight:'5vw'}}><img className="contactIMG" src={location}alt="Background"/></a></Box>
    <Box
      sx={{
        display: 'flex',
        flexDirection: {xs:'column', md:'row'}, // Column on small screens, row on larger
        justifyContent: 'space-between',
        padding: '2rem',
        gap: '2rem',
        
      }}
    >
      {/* Left Box: Contact Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2rem',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h4" gutterBottom style={{color:'#3B5D44'}}>{t('getInTouch')} 
     
        </Typography>

        <form onSubmit={sendEmailEmail}>
        <TextField
           label={t('name')} 
          variant="outlined"
          fullWidth
          margin="normal"
          name="name" // Add this to associate the input with formData.name
        //   InputProps={{
        //     startAdornment: formData.name === '' ? (
        //       <InputAdornment position={i18n.language === "ar" ? "end" : "start"}>
        //         {t('name')}
        //       </InputAdornment>
        //     ) : null,
        // }}

        value={formData.name}
        onChange={handleChangeEmail}
        required
        />
        <TextField
          label={t('Email')} 
          variant="outlined"
          fullWidth
          margin="normal"
     
          name="email" // Add this to associate the input with formData.email
          value={formData.email}
          onChange={handleChangeEmail}
          required
       />
        <TextField
          label={t('message')} 
          variant="outlined"
          fullWidth
          dir='auto'
          multiline
          rows={4}
          margin="normal"
          name="message" // Add this to associate the input with formData.message
          value={formData.message}
          onChange={handleChangeEmail}
       />

        <Button
          variant="contained"
          sx={{ backgroundColor: '#4B7857', color: '#fff', marginTop: '1rem' }}
           type="submit"
           onClick={() => {
            if (formData.name !== "" && formData.email !== "") {
              handleClickOpen();
            }}}
        >
          {t('Submit')}  
        </Button>

    </form>
      </Box>

      {/* Right Box: Map */}
      <Box
        sx={{
          flex: 1,
          height: '100%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          overflow: 'hidden',
         
          height: '80vh',
        }}
      >
<iframe
    title="Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1516.29725708653!2d51.43723384478978!3d25.32492686717924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45dc1b48888243%3A0xc99991c5589f3b25!2sQatar%20Science%20and%20Technology%20Park!5e0!3m2!1sen!2sjo!4v1726347410248!5m2!1sen!2sjo"
    width="100%"
    height="100%"
    style={{ border: 0 }} // Properly passing the style object here
    allowFullScreen=""
    loading="lazy"
  ></iframe>  </Box></Box>
   {/* Dialog */}
   <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            padding: '20px',
            borderRadius: '20px',
            width: '400px',
            maxWidth: '90%',
          }
        }}
      >
        {/* Close button on the top-right corner */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#aaa',
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Dialog content */}
        <DialogContent sx={{ textAlign: 'center' }}>


      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        {t('Thanks')}
      </Typography>


        <Typography variant="body1" sx={{ color: '#666' }}>
          {t('msg')}
        </Typography>
      

  
</DialogContent>

        {/* Dialog actions with custom button */}
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: '20px' }}>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              backgroundColor: '#4caf50',
              color: '#fff',
              borderRadius: '50px',
              padding: '10px 30px',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
          >
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>
  
  </Box>
  )
}

export default ContactUs