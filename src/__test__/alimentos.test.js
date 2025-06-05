import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Alimentos from '../components/Alimentos';

describe('DRM Solidário - Alimentos', () => {
  const preencherCampos = (nome, alimento, quantidade = '1') => {
    fireEvent.change(screen.getByPlaceholderText(/Seu nome/i), {
      target: { value: nome }
    });
    fireEvent.change(screen.getByPlaceholderText(/Alimento a doar/i), {
      target: { value: alimento }
    });
    fireEvent.change(screen.getByPlaceholderText(/Quantidade \(kg\)/i), {
      target: { value: quantidade }
    });
  };

  test('renderiza o título e inputs', () => {
    render(<Alimentos />);
    expect(screen.getByText(/DRM Solidário/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Seu nome/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Alimento a doar/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Quantidade \(kg\)/)).toBeInTheDocument();
  });

  test('não adiciona doação com campos vazios', () => {
    render(<Alimentos />);
    fireEvent.click(screen.getByRole('button', { name: /Doar/i }));
    expect(screen.getByText(/Preencha todos os campos/)).toBeInTheDocument();
  });

  test('adiciona uma doação válida', () => {
    render(<Alimentos />);
    preencherCampos('João', 'Arroz', '2');
    fireEvent.click(screen.getByRole('button', { name: /Doar/i }));

    expect(screen.getByText(/João/)).toBeInTheDocument();
    expect(screen.getByText(/Arroz/)).toBeInTheDocument();
    expect(screen.getByText(/2 kg/)).toBeInTheDocument();
  });

  test('limpa os inputs após doação', () => {
    render(<Alimentos />);
    preencherCampos('Maria', 'Feijão', '3');
    const inputNome = screen.getByPlaceholderText(/Seu nome/i);
    const inputAlimento = screen.getByPlaceholderText(/Alimento a doar/i);
    const inputQuantidade = screen.getByPlaceholderText(/Quantidade \(kg\)/i);

    fireEvent.click(screen.getByRole('button', { name: /Doar/i }));

    expect(inputNome.value).toBe('');
    expect(inputAlimento.value).toBe('');
    expect(inputQuantidade.value).toBe('');
  });

  test('exibe múltiplas doações corretamente', () => {
    render(<Alimentos />);
    preencherCampos('Lucas', 'Macarrão', '1');
    fireEvent.click(screen.getByRole('button', { name: /Doar/i }));

    preencherCampos('Ana', 'Leite em pó', '2');
    fireEvent.click(screen.getByRole('button', { name: /Doar/i }));

    expect(screen.getByText(/Lucas/)).toBeInTheDocument();
    expect(screen.getByText(/Macarrão/)).toBeInTheDocument();
    expect(screen.getByText(/Ana/)).toBeInTheDocument();
    expect(screen.getByText(/Leite em pó/)).toBeInTheDocument();
  });

  test('não adiciona doação se apenas o nome for preenchido', () => {
    render(<Alimentos />);
    fireEvent.change(screen.getByPlaceholderText(/Seu nome/i), {
      target: { value: 'Carlos' }
    });
    fireEvent.click(screen.getByRole('button', { name: /Doar/i }));
    expect(screen.getByText(/Preencha todos os campos/)).toBeInTheDocument();
  });

  test('não adiciona doação se apenas o alimento for preenchido', () => {
    render(<Alimentos />);
    fireEvent.change(screen.getByPlaceholderText(/Alimento a doar/i), {
      target: { value: 'Farinha' }
    });
    fireEvent.click(screen.getByRole('button', { name: /Doar/i }));
    expect(screen.getByText(/Preencha todos os campos/)).toBeInTheDocument();
  });

  test('mantém doações anteriores após novas doações', () => {
    render(<Alimentos />);
    preencherCampos('Joana', 'Farinha', '1');
    fireEvent.click(screen.getByRole('button', { name: /Doar/i }));

    preencherCampos('Pedro', 'Açúcar', '2');
    fireEvent.click(screen.getByRole('button', { name: /Doar/i }));

    expect(screen.getByText(/Joana/)).toBeInTheDocument();
    expect(screen.getByText(/Farinha/)).toBeInTheDocument();
    expect(screen.getByText(/Pedro/)).toBeInTheDocument();
    expect(screen.getByText(/Açúcar/)).toBeInTheDocument();
  });

  test('lista está vazia no início', () => {
    render(<Alimentos />);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('botão doar possui o texto correto', () => {
    render(<Alimentos />);
    expect(screen.getByRole('button', { name: /Doar/i })).toBeInTheDocument();
  });
});
