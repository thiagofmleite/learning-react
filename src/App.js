import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
// import InputCustomizado from './components/InputCustomizado';

class App extends Component {

  constructor() {
    super();
    this.state = { lista: [], nome: '', email: '', senha: '' };
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
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

    let resposta = localStorage.getItem('lista');
    this.setState({ lista: resposta ? JSON.parse(resposta) : [] });

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

  getLista() {
    let resposta = localStorage.getItem('lista');
    let lista = resposta ? JSON.parse(resposta) : []
    this.setState({ lista });
    return lista;
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

    let lista = this.getLista();
    lista.push({ id: this.createGuid(), nome: this.state.nome, email: this.state.email, senha: this.state.senha });
    localStorage.setItem('lista', JSON.stringify(lista));
    this.setState({ lista });
  }

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <div className="content" id="content">
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post">
                <div className="pure-control-group">
                  <label htmlFor="nome">Nome</label>
                  <input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} />
                </div>
                <div className="pure-control-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} />
                </div>
                <div className="pure-control-group">
                  <label htmlFor="senha">Senha</label>
                  <input id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} />
                </div>
                <div className="pure-control-group">
                  <label></label>
                  <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                </div>
              </form>

            </div>
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.lista.map(function (autor) {
                      return (
                        <tr key={autor.id}>
                          <td>{autor.id}</td>
                          <td>{autor.nome}</td>
                          <td>{autor.email}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
