import { createContext, useContext, useState } from "react";

export const PagamentoContext = createContext();
PagamentoContext.displayName = "Pagamento";
export function PagamentoProvider({ children }) {
  const tiposPagamentos = [
    {
      nome: "boleto",
      juros: 1,
      id: 1,
    },
    {
      nome: "cartao",
      juros: 1.5,
      id: 2,
    },
    {
      nome: "pix",
      juros: 1,
      id: 3,
    },
    {
      nome: "crediario",
      juros: 3,
      id: 4,
    },
  ];
  const [formaPagamento, setFormaPagamento] = useState("");
  return (
    <PagamentoContext.Provider
      value={{ tiposPagamentos, formaPagamento, setFormaPagamento }}
    >
      {children}
    </PagamentoContext.Provider>
  );
}

export const usePagamentoContext = () => {
  const { tiposPagamentos, formaPagamento, setFormaPagamento } =
    useContext(PagamentoContext);
  function mudarFormaPagamento(id) {
    const pagamentoAtual = tiposPagamentos.find(
      (tipoPagamento) => tipoPagamento.id === id
    );
    setFormaPagamento(pagamentoAtual);
  }

  return {
    tiposPagamentos,
    mudarFormaPagamento,
    formaPagamento,
  };
};
