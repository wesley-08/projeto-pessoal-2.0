import React, { useState } from 'react';
import './alimentos.css';

function Alimentos() {
  const [usuario, setUsuario] = useState('');
  const [alimento, setAlimento] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [doacoes, setDoacoes] = useState([]);
  const [erro, setErro] = useState('');

  const alimentosNaoPermitidos = [
    'carne',
    'fruta',
    'frutas',
    'leite fresco',
    'leite natural',
    'queijo fresco',
    'peixe',
    'ovo',
    'legume',
    'legumes',
    'alface',
    'verdura',
    'verduras',
    'sal'
  ];

  const ehAlimentoPerecivel = (nomeAlimento) => {
    const nome = nomeAlimento.trim().toLowerCase();
    return alimentosNaoPermitidos.some(palavra => nome.includes(palavra));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      usuario.trim() === '' ||
      alimento.trim() === '' ||
      quantidade.trim() === ''
    ) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (ehAlimentoPerecivel(alimento)) {
      setErro('Este alimento não é aceito. Doe apenas alimentos não perecíveis permitidos.');
      return;
    }

    if (isNaN(quantidade) || Number(quantidade) <= 0) {
      setErro('A quantidade deve ser um número válido e maior que 0.');
      return;
    }

    const novaDoacao = { usuario, alimento, quantidade };
    setDoacoes([...doacoes, novaDoacao]);
    setUsuario('');
    setAlimento('');
    setQuantidade('');
    setErro('');
  };

  const limparLista = () => {
    setDoacoes([]);
  };

  return (
    <div className="container">
      <h2>DRM Solidário - Doação de Alimentos</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Seu nome"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="text"
          placeholder="Alimento a doar"
          value={alimento}
          onChange={(e) => setAlimento(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade (kg)"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <button type="submit">Doar</button>
        {erro && <p className="erro">{erro}</p>}
      </form>

      <h3>Lista de Doações</h3>
      <ul>
        {doacoes.map((item, index) => (
          <li key={index}>
            <strong>{item.usuario}</strong> doou <em>{item.quantidade} kg</em> de <em>{item.alimento}</em>
          </li>
        ))}
      </ul>

      {doacoes.length > 0 && (
        <button className="limpar" onClick={limparLista}>Limpar Lista</button>
      )}
    </div>
  );
}

export default Alimentos;
