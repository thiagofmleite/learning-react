import React, { Component } from 'react';
// import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import BotaoSubmitCustomizado from './components/BotaoSubmitCustomizado';
import PubSub from 'pubsub-js';

class FormularioAutor extends Component {
    constructor() {
        super();
        this.state = { nome: '', email: '', senha: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    setNome = (evento) => {
        this.setState({ nome: evento.target.value });
    }

    setEmail(evento) {
        this.setState({ email: evento.target.value });
    }

    setSenha(evento) {
        this.setState({ senha: evento.target.value });
    }

    createGuid = () => {
        return (this.S4() + this.S4() + '-' + this.S4() + '-4' + this.S4().substr(0, 3) + '-' + this.S4() + '-' + this.S4() + this.S4() + this.S4()).toLowerCase();
    }

    S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    enviaForm(evento) {
        evento.preventDefault();
        // $.ajax({
        //   url: 'https://cdc-react.herokuapp.com/api/autores',
        //   contentType: 'application/json',
        //   dataType: 'json',
        //   type: 'post',
        //   data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
        //   success: function (resposta) {
        //     console.log("enviado com sucesso");
        //   },
        //   error: function (resposta) {
        //     console.log("erro");
        //   }
        // });


        let lista = localStorage.getItem('lista') ? JSON.parse(localStorage.getItem('lista')) : [];
        lista.push({ id: this.createGuid(), nome: this.state.nome, email: this.state.email, senha: this.state.senha });
        localStorage.setItem('lista', JSON.stringify(lista));
        PubSub.publish('atualiza-lista-autores', lista);
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post">
                    <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
                    <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
                    <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha" />
                    <BotaoSubmitCustomizado label="GRavar" />
                </form>

            </div>
        );
    }
}

class TabelaAutores extends Component {



    render() {
        return (
            <table className="pure-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.lista.map(function (autor) {
                            return (
                                <tr key={autor.id}>
                                    <td>{autor.nome}</td>
                                    <td>{autor.email}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        );
    }
}

export default class AutorBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
        // this.atualizaListagem = this.atualizaListagem.bind(this);

    }

    componentWillMount() {
        // $.ajax({
        //   url: "https://cdc-react.herokuapp.com/api/autores",
        //   dataType: 'json',
        //   success: function (resposta) {
        //     console.log("chegou a resposta");
        //     this.setState({ lista: resposta });
        //   }.bind(this)
        // });

        this.getLista();
        PubSub.subscribe('atualiza-lista-autores', (topico, novaLista) => {
            this.setState({ lista: novaLista });
        });
    }



    getLista = () => {
        let resposta = localStorage.getItem('lista');
        let lista = resposta ? JSON.parse(resposta) : []
        this.setState({ lista });
        return lista;
    }

    render() {
        return (
            <div>
                <FormularioAutor />
                <TabelaAutores lista={this.state.lista} />
            </div>
        );
    }
}