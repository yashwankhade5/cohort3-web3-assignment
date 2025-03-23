import { useEffect, useState } from 'react'
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";




function App() {
  const [mnemonic, setmnemonic] = useState()
  const [seed, setseed]=useState()
  const [accountindex,setaccountindex]=useState(0)
  const [address,setaddress]=useState([])
 function create_account() {
   const path=`m/44'/501'/${accountindex}'/0'`
   const derivedseed =derivePath(path,seed.toString("hex")).key;
   const secretkey = nacl.sign.keyPair.fromSeed(derivedseed).secretKey
   const publicKey = Keypair.fromSecretKey(secret).publicKey.tobase58()
   setaccountindex(c=>c+1)
setaddress([secretkey,publicKey])


 }


  useEffect(()=>{
    setmnemonic(generateMnemonic())
    setseed(mnemonicToSeedSync(mnemonic))
    
  },[])
  



  return (
    <>
      <div>{mnemonic}</div>
      <div></div>
    </>
  )
}

export default App
