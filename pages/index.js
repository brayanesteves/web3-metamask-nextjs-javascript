import { useEffect, useCallback } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useWeb3React } from '@web3-react/core';
import { connector } from '../config/web3/index';

export default function Home() {
  const { activate, active, deactivate, error, account, chainId } = useWeb3React();

  const connect = useCallback(() => { 
    activate(connector);
    localStorage.setItem('previouslyConnected', true);
  }, [activate]);

  useEffect(() => {
    if(localStorage.getItem('previouslyConnected') === 'true') {
      connect();
    }
  }, [connect]);

  const disconnect = () => { 
    deactivate();
    localStorage.removeItem('previouslyConnected');
  };

  if(error) {
    return <p>Error</p>    
  }
  
  return (
    <div>
      <Head>
        
      </Head>

      <main className={styles.main}>
        <h1>Web3 demo app</h1>
        {
          active ? <>
            <button onClick={disconnect}>Disconnect Wallet</button>
            <p>
              You are connected to the network with ID: {chainId}<br />
              Your account is: {account}
            </p>
          </> : <button onClick={connect}>Connect Wallet</button>
        }
      </main>

      <footer>
        
      </footer>
    </div>
  )
}
