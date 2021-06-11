
import React,{useState} from 'react';
import './estilo.css';
import{Formulario, Label, ContenedorTerminos,ContenedorBotonCentrado,Boton,MensajeError,MensajeExito} from './elementos/formularios';

//Iconos 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
//Componentes
import ComponenteInput from './componentes/input';

const App = () => {
  const [usuario,cambiarUsuario]     = useState ({campo:'', valido:null}); 
  const [nombre,cambiarNombre]       = useState ({campo:'', valido:null}); 
  const [password,cambiarPassword]   = useState ({campo:'', valido:null}); 
  const [password2,cambiarPassword2] = useState ({campo:'', valido:null}); 
  const [telefono,cambiarTelefono]   = useState ({campo:'', valido:null}); 
  const [correo,cambiarCorreo]       = useState ({campo:'', valido:null}); 
  //Enviar formulario
  const [FormularioValido,cambiarFormularioValido]   = useState(true);
  //terminos y condiciones
  const [terminos,cambiarTerminos]   = useState(false); 

  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }

  const validarPassword2 = ()=>{
    if (password.campo.length>0){

      if (password.campo !== password2.campo){
          cambiarPassword2((prevState)=>{
            return {...prevState, valido :'false'}
          });
      }else{
        cambiarPassword2((prevState)=>{
          return {...prevState, valido :'true'}
        });

      }
    }
  }

  const onChangeTerminos=(e)=>{
    cambiarTerminos(e.target.checked);
  }

  const onSubmit = (e)=>{
      e.preventDefault();

      if(
        usuario.valido  === 'true' &&
        nombre.valido    === 'true' &&
        password.valido  === 'true' &&
        password2.valido === 'true' &&
        correo.valido    === 'true' &&
        telefono.valido  === 'true' &&
        terminos){

           cambiarFormularioValido(true);
            cambiarUsuario({campo:'',valido: null});
            cambiarNombre({campo:'',valido: null});
            cambiarPassword({campo:'',valido: null});
            cambiarPassword2({campo:'',valido: null});
            cambiarTelefono({campo:'',valido: null});
            cambiarCorreo({campo:'',valido: null});
        }else{
           cambiarFormularioValido(false);
        }
  }

  return ( 

  <main>
    
    <Formulario action="" onSubmit={onSubmit} >

        <ComponenteInput
          estado = {usuario}
          cambiarEstado = {cambiarUsuario}
          tipo="text"
          label = "Usuario"
          placeholder="Usuario"
          name="Usuario"
          leyendaError ="El usuario puede ser de 4 a 16 dígitos y solo puede contener números, letras y guión bajo"
          exprecionRegular = {expresiones.nombre}
        />

        <ComponenteInput
          estado = {nombre}
          cambiarEstado = {cambiarNombre}
          tipo="text"
          label = "Nombre"
          placeholder="Nombre"
          name="usuario"
          leyendaError ="El nombre solo puede contener letras y espacios"
          exprecionRegular = {expresiones.usuario}
        />


        <ComponenteInput
          estado = {password}
          cambiarEstado = {cambiarPassword}
          tipo="password"
          label = "Contraseña"
          placeholder="Contraseña"
          name="password1"
          leyendaError ="La contraseña debe ser de 4 a 16 dígitos"
          exprecionRegular = {expresiones.password}
        />

        <ComponenteInput
          estado = {password2}
          cambiarEstado = {cambiarPassword2}
          tipo="password"
          label = "Contraseña"
          placeholder="Repetir Contraseña"
          name="password2"
          leyendaError ="Ambas contraseñas deben ser iguales"
          funcion = {validarPassword2}
        />

        
      <ComponenteInput
          estado = {correo}
          cambiarEstado = {cambiarCorreo}
          tipo="email"
          label = "Correo Electrónico"
          placeholder="correo@correo.com"
          name="correo"
          leyendaError ="Inserte una dirección de correo válida"
          exprecionRegular = {expresiones.correo}
        />
        <ComponenteInput
          estado = {telefono}
          cambiarEstado = {cambiarTelefono}
          tipo="text"
          label = "Teléfono"
          placeholder="4323-4323"
          name="telefono"
          leyendaError ="Inserte un número de teléfono válido"
          exprecionRegular = {expresiones.telefono}
        />
        

        
      <ContenedorTerminos>
        <Label>
          <input 
          type="checkbox" 
          name="terminos" 
          id="terminos" 
          checked={terminos} 
          onChange={onChangeTerminos}
          />
          
          Acepto los terminos y condiciones
        </Label>
      </ContenedorTerminos>

      {FormularioValido ===false &&<MensajeError>
        <p>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <e>ERROR : </e>Por favor rellene el formulario correctamente
        </p>
        </MensajeError>}

      <ContenedorBotonCentrado>
        <Boton type="submit" >Enviar</Boton>
        {FormularioValido === true && <MensajeExito>Formulario enviado exitosamente</MensajeExito> }
      </ContenedorBotonCentrado>


    </Formulario>
    

  </main>
  
  );
}


 
export default App;