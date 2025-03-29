import { useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
import axios from "axios";

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);
    const [sol,setsol] = useState(0)


    return <div>
        <button onClick={function() {
            const seed = mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            console.log(secret)
            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, keypair.publicKey]);
        }}>
            Add wallet
        </button>
        {publicKeys.map((p,i) => <div key={i}>
            Sol -  {p.toBase58()} <button onClick={async ()=>{
let response = await axios.post("https://api.mainnet-beta.solana.com",{
    "jsonrpc":"2.0",
    "id":1,
    "method":"getAccountInfo",
    "params":[`${p.toBase58()}`]
})
.then(
    (r)=>{setsol(r.data.result.value.lamports)}
)

            }}>{sol/Math.pow(10,9)} refresh</button>
        </div>)}
    </div>
}