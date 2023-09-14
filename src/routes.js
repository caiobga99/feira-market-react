import { CarrinhoProvider } from "common/contexts/Carrinho";
import { PagamentoProvider } from "common/contexts/Pagamento";
import { UsuarioProvider } from "common/contexts/Usuario";
import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <UsuarioProvider>
          <CarrinhoProvider>
            <PagamentoProvider>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/feira">
                <Feira />
              </Route>
              <Route exact path="/carrinho">
                <Carrinho />
              </Route>
            </PagamentoProvider>
          </CarrinhoProvider>
        </UsuarioProvider>
      </Switch>
    </BrowserRouter>
  );
}
