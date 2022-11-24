import React from "react";
import { useState } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import { request } from 'http';
import 'stream-http';
import '../App.css';

function FormContato(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [assunto, setAssunto] = useState('');
    const [mensagem, setMensagem] = useState('');

    const [enviado, setEnviado] = useState(false);

    function handleSubmit(event){
        event.preventDefault();

        const apiUrl = 'http://ecosistemasesolucoes.kinghost.net:21097/api/contact';
        // const postData = {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         nome: nome,
        //         email: email,
        //         assunto: assunto,
        //         mensagem: mensagem
        //     })
        // };
        const postData = JSON.stringify({
            nome: nome,
            email: email,
            assunto: assunto,
            mensagem: mensagem
        })

        const options = {
            hostname: 'http://ecosistemasesolucoes.kinghost.net',
            port: 21097,
            path: '/api/contact',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData)
            }
          };

        request(options, (resp) => {
            console.log(`STATUS: ${resp.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(resp.headers)}`);
            resp.setEncoding('utf8');
            resp.on('data', (chunk) => {
                console.log(chunk);
            })
        });

        // fetch(apiUrl, postData)
        //     .then((res) => {
        //         if (res.status === 200) {
        //             console.log(res)

        //             setNome('');
        //             setEmail('');
        //             setAssunto('');
        //             setMensagem('');
        //             setEnviado(true);
        //     }
        // })
    }

    return (
        <div className={`w-100 fundoAzul text-light rounded-4 p-2`}>
            <div className='text-center pt-3 textoTitulo'><b>ENTRE EM CONTATO</b></div>
            <hr/>
            {/* <div className='w-100 px-2'> */}
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Row>
                        <Col xs={4} md={12}>
                            <Form.Group className='px-1'>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type='text' placeholder='seu nome' value={nome} autoFocus onChange={e => setNome(e.target.value)}></Form.Control>
                            </Form.Group>
                        </Col>

                        <Col xs={4} md={12}>
                            <Form.Group className='px-1'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' placeholder='fulano@gmail.com' value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
                            </Form.Group>
                        </Col>
                        
                        <Col xs={4} md={12}>
                            <Form.Group>
                                <Form.Label>Assunto</Form.Label>
                                <Form.Control type='text' placeholder='Contratação' value={assunto} onChange={e => setAssunto(e.target.value)}></Form.Control>
                            </Form.Group>
                        </Col>

                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label>Mensagem</Form.Label>
                                <Form.Control as='textarea' placeholder='Tenho interesse no serviço' value={mensagem    } onChange={e => setMensagem(e.target.value)}></Form.Control>
                            </Form.Group>
                        </Col>

                        <div className='w-100 text-end p-2'>
                            <Button variant='primary' type='submit'>Enviar</Button>
                        </div>
                    </Row>
                </Form>
            {/* </div> */}
        </div>
    )
}

export default FormContato;