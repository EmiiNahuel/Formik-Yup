import React, { useState } from 'react';
import { Container, Form, Button, Dimmer, Header, Icon  } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as  Yup from 'yup'
import 'semantic-ui-css/semantic.min.css'
import './App.css';

export default function App() {

  function handleClose(){
    setBandera(false)
  }

  const [bandera, setBandera] = useState(false)
  const genres = [
    { key: 'masc', text:'Masculino', value:'masculino'},
    { key: 'fem', text:'Femenino', value:'femenino'},
    { key: 'o', text:'Otro', value:'otro'}
  ]
 
  const formik = useFormik({
    initialValues:{
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      repeatPassword:'',
      genres: '',
      accepted: false
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required(),
      lastname: Yup.string().required(),
      email: Yup.string().email('Email invalido').required(true),
      password: Yup.string().required(),
      repeatPassword: Yup.string().required(true).oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
      genres: Yup.string().required(true),
      accepted: Yup.bool().isTrue(true)
    }),
    onSubmit: (formData) => {
      console.log(formData)
      setBandera(!bandera)
      formik.handleReset()
    }
  })

  return (
    <Container className={'container'}>
      <Form className='form' onSubmit={formik.handleSubmit}>
       <div className='Redes'>
         <span><a href='https://github.com/EmiiNahuel' target='_blank'><Icon size='big' color='black' name='github'/></a></span>
         <span><a href='https://www.linkedin.com/in/emilarrosa/' target='_blank'><Icon size='big' color='blue' name='linkedin'/></a></span>
       </div>

        <h1 className='titleh1'>Formulario de Registro</h1>
        <Form.Input
         className='inputForm' type='text' name='firstname'
         label='Nombre' 
         onChange={formik.handleChange} 
         error={formik.errors.firstname && true }
         value={formik.values.firstname}
         onBlur={formik.handleBlur}
         />
        <Form.Input className='inputForm' type='text' name='lastname'
        label='Apellido' 
        onChange={formik.handleChange} 
        error={formik.errors.lastname && true}
        value={formik.values.lastname}
        onBlur={formik.handleBlur}
         />
        <Form.Input className='inputForm' type='text' name='email'
        label='Email' 
        onChange={formik.handleChange} 
        error={formik.errors.email }
        value={formik.values.email}
        onBlur={formik.handleBlur}
         />
        <Form.Input className='inputForm' type='password' name='password'
        label='Contraseña'  
        onChange={formik.handleChange} 
        error={formik.errors.password && true }
        value={formik.values.password}
        onBlur={formik.handleBlur}
        />
        <Form.Input className='inputForm' type='password' name='repeatPassword'
        label='RepetirContraseña' 
        onChange={formik.handleChange} 
        error={formik.errors.repeatPassword }
        value={formik.values.repeatPassword} 
        onBlur={formik.handleBlur}
        />
        <Form.Dropdown
         className='dropdownForm'
         label='Género' 
         options={genres}
         selection
         value={formik.values.genres}
         error={formik.errors.genres}
         onChange= {(_, data) => formik.setFieldValue('genres', data.value)}
         onBlur={formik.handleBlur}
        />
        <Form.Checkbox 
        className='checkForm'
        label='Aceptar Términos y condiciones'
        checked={formik.values.accepted} 
        error={formik.errors.accepted}
        onChange={(_, data) => formik.setFieldValue('accepted', data.checked)} 
        onBlur={formik.handleBlur} 
        />

        <Button.Group className='btnGroup'>
         <Button type='submit' onClick={formik.handleReset} color='grey'>Limpiar Formulario</Button>
         <Button.Or />
         <Button type='button' onClick={formik.handleSubmit} color='blue'>Registrarse</Button>
       </Button.Group>

      </Form>

      <Dimmer active={bandera} onClickOutside={handleClose} page>
        <Header as='h2' icon inverted>
          <Icon name='thumbs up outline'/>
          Excelente
          <Header.Subheader>Has sido registrado correctamente!</Header.Subheader>
        </Header>
      </Dimmer>    
    </Container>

  );
}


