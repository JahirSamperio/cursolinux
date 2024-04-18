import nodemailer from 'nodemailer'
import { config } from 'dotenv'

config();

const emailRegistro = async (datos) => { 
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
    });
    const { nombre, email, token } = datos;

    //enviar email
    
    await transport.sendMail({
        from: 'CursoLinux.com',
        to: email,
        subject: 'Confirma tu cuenta en CursoLinux.com',
        text: 'Confirma tu cuenta en CursoLinux.com',
        html: `
            <h2>Hola ${nombre}, ¡Le damos la bienvenida a CursoLinux.com!</h2>
            <p>Para completar tu registro, por favor confirma tu cuenta haciendo clic en el siguiente enlace:</p>
            <p><a href="http://localhost:8080/confirmar/${token}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirmar cuenta</a></p>
            <p>Si no te registraste en StarGlasses.com, puedes ignorar este correo electrónico.</p>
            <p>Gracias,<br>El equipo de StarGlasses.com</p>
        `
    })
}

export {
    emailRegistro
}