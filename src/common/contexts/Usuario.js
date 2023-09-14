const { createContext, useState } = require("react");
export const  UsuarioContext=createContext();
//cria o nome do context usuario
UsuarioContext.displayName="usuario";

export function UsuarioProvider({children}){
    const [nome,setNome]=useState("");
    const [saldo,setSaldo]=useState(0);
    return(
        <UsuarioContext.Provider value={{nome,setNome,saldo,setSaldo}}>
            {children}
        </UsuarioContext.Provider>
    )
}
