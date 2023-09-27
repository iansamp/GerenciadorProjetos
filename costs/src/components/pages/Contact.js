import Input from '../form/input'
import SubmitButton from '../form/SubmitButton'
import styles from './Contact.module.css'

export default function Contact() {
    return(
        <div  className={styles.form}>

                <h1>Entre em contato</h1>

                <form>
                    <Input
                    text='Nome:'
                    type='text'
                    placeholder='Digite seu nome'
                    />

                    <Input
                    text='Email:'
                    type='text'
                    placeholder='Digite seu email'
                    />

                    <Input className={styles.mensagem}
                    text='Mensagem:'
                    type='text'
                    placeholder='Escreva uma mensagem'
                    />

                    <SubmitButton text='Enviar'/>
                </form>
        </div>
    )
}