import { useEffect, useState } from 'react'
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";




function App() {
  const [mnemonic, setmnemonic] = useState()
  const [seed, setseed]=useState()
  const [accountindex,setaccountindex]=useState(0)
  const [address,setaddress]=useState([])
  useEffect(()=>{
setmnemonic(generateMnemonic())
  },[])

  function account() {
    const seed = mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${accountindex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret).publicKey;
    
    setaccountindex(accountindex + 1);
    setaddress([...address, {secret,keypair}]);
    
}
console.log(address) 



  return (
    <>
      <div>{mnemonic}</div>
      <h1>{address.map((p,i)=><div key={i}>
        <div>public : {p.keypair.toBase58()}</div>
        <div>private : {p.secret.toString("hex")}</div>
        
      </div>
      )}</h1>
      <div onClick={account}>button</div>
    </>
  )
}

export default App
// function () {
//   const path=`m/44'/501'/${accountindex}'/0'`
//   const derivedseed =derivePath(path,seed.toString("hex")).key;
//   const naclkey = nacl.sign.keyPair.fromSeed(derivedseed).secretKey
//   let secretkey = naclkey.slice(0,32)
  
//   const publicKey = Keypair.fromSeed(secretkey).publicKey.toBase58()
//   setaccountindex(c=>c+1)
// setaddress([...address,{secretkey,publicKey}])


//  }