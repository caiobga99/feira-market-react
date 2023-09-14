import { useContext, useEffect } from "react";
import { useState } from "react";

const { createContext } = require("react");

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";
export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidade, setQuantidade] = useState(0);
  return (
    <CarrinhoContext.Provider
      value={{ carrinho, setCarrinho, quantidade, setQuantidade }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho, quantidade, setQuantidade } =
    useContext(CarrinhoContext);

  useEffect(() => {
    const novaQuantidade = carrinho.reduce(
      (contador, produto) => contador + produto.quantidade,
      0
    );
    setQuantidade(novaQuantidade);
  }, [carrinho, setQuantidade]);

  function mudarQuantidade(id, quantidade) {
    return carrinho.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
      return itemDoCarrinho;
    });
  }
  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some(
      (itemDoCarrinho) => itemDoCarrinho.id === novoProduto.id
    );
    if (!temOProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }
    setCarrinho(mudarQuantidade(novoProduto.id, 1));
  }
  function removerProduto(id) {
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
    const ehOUltimo = produto.quantidade === 1;
    if (ehOUltimo) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
      );
    }
    setCarrinho(mudarQuantidade(id, -1));
  }
  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    setQuantidade,
    quantidade,
  };
};
