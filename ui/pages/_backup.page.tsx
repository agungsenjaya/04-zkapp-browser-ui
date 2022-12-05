
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import '../styles/globals.css'
import { useEffect, useState, useRef} from "react";
import './reactCOIServiceWorker';
import ZkappWorkerClient from './zkappWorkerClient';
import {Modal, Button} from 'flowbite-react';
import {
  PublicKey,
  PrivateKey,
  Field,
} from 'snarkyjs'

let transactionFee = 0.1;

export default function App() {

	const [openModal, setOpenModal] = useState<string | undefined>();
	const [modalSize, setModalSize] = useState<string>('md');
	const [modalPlacement, setModalPlacement] = useState<string>('center');

  let [state, setState] = useState({
    zkappWorkerClient: null as null | ZkappWorkerClient,
    hasWallet: null as null | boolean,
    hasBeenSetup: false,
    accountExists: false,
    currentNum: null as null | Field,
    publicKey: null as null | PublicKey,
    zkappPublicKey: null as null | PublicKey,
    creatingTransaction: false,
  });

// --------------------------------------------------------
// Status

  const status1 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "block";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status2 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "block";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status3 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "block";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status4 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "block";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status5 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "block";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status6 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "block";
  }
  
   const send1 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "block";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
  }
  
  const send2 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "block";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
  }
  
  const send3 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "block";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
  }
  
  const send4 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "block";
  }
  
  const donesend = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
	const el5 = document.getElementById("sendLoading")!
	el5.style.display = "none";
	const el6 = document.getElementById("sendDone")!
	el6.style.display = "block";
	const el7 = document.getElementById("sendCheck")!
	el7.style.display = "block";
	const el8 = document.getElementById("closeSend")!
	el8.style.display = "block";
  }
	
  // -------------------------------------------------------
  // Do Setup
  const connectWallet = async () => {
      if (!state.hasBeenSetup) {
        const zkappWorkerClient = new ZkappWorkerClient();
        
        console.log('Loading SnarkyJS...');
		status1();
        await zkappWorkerClient.loadSnarkyJS();
        console.log('done');

        await zkappWorkerClient.setActiveInstanceToBerkeley();

        const mina = (window as any).mina;
		status2();

        if (mina == null) {
          setState({ ...state, hasWallet: false });
		  return;
        }

        const publicKeyBase58 : string = (await mina.requestAccounts())[0];
        const publicKey = PublicKey.fromBase58(publicKeyBase58);

        console.log('using key', publicKey.toBase58());

        console.log('checking if account exists...');
        const res = await zkappWorkerClient.fetchAccount({ publicKey: publicKey! });
        const accountExists = res.error == null;

        await zkappWorkerClient.loadContract();

        console.log('compiling zkApp');
		status3();
        await zkappWorkerClient.compileContract();
        console.log('zkApp compiled');

        const zkappPublicKey = PublicKey.fromBase58('B62qrDe16LotjQhPRMwG12xZ8Yf5ES8ehNzZ25toJV28tE9FmeGq23A');

        await zkappWorkerClient.initZkappInstance(zkappPublicKey);

        console.log('getting zkApp state...');
        await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey })
        const currentNum = await zkappWorkerClient.getNum();
        console.log('current state:', currentNum.toString());

        setState({ 
            ...state, 
            zkappWorkerClient, 
            hasWallet: true,
            hasBeenSetup: true, 
            publicKey, 
            zkappPublicKey, 
            accountExists, 
            currentNum
        });
      }
  };

  // -------------------------------------------------------
  // Newwwwww
  const connectBtnclick = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "block";
	const el2 = document.getElementById("connectBtn")!
	el2.style.display = "none";
	const el3 = document.getElementById("loading")!
	el3.style.display = "block";
	const el4 = document.getElementById("banner")!
	el4.style.display = "none";
	const el5 = document.getElementById("banner2")!
	el5.style.display = "none";
  };
  
  const hideloadingBtn = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "none";
	const el2 = document.getElementById("loading")!
	el2.style.display = "none";
	const el3 = document.getElementById("succes")!
	el3.style.display = "block";
  };
  
  const closeGetclick = () => {
    const el = document.getElementById("getscreen")!
	el.style.display = "none";
	const el2 = document.getElementById("getBtnDisable")!
	el2.style.display = "none";
	const el3 = document.getElementById("getBtn")!
	el3.style.display = "block";
	const el4 = document.getElementById("sendBtnDisable")!
	el4.style.display = "none";
	const el5 = document.getElementById("sendBtn")!
	el5.style.display = "block";
  };
  
  const closeSendclick = () => {
    const el = document.getElementById("sendscreen")!
	el.style.display = "none";
	const el2 = document.getElementById("sendBtnDisable")!
	el2.style.display = "none";
	const el3 = document.getElementById("sendBtn")!
	el3.style.display = "block";
	const el4 = document.getElementById("getBtnDisable")!
	el4.style.display = "none";
	const el5 = document.getElementById("getBtn")!
	el5.style.display = "block";
	const el6 = document.getElementById("sendDone")!
	el6.style.display = "none";
    const el7 = document.getElementById("sendCheck")!
	el7.style.display = "none";
    const el8 = document.getElementById("closeSend")!
	el8.style.display = "none";
  };
  
  const getscreenShow = () => {
	const el = document.getElementById("getscreen")!
	el.style.display = "block";
	const el2 = document.getElementById("getBtn")!
	el2.style.display = "none";
	const el3 = document.getElementById("getBtnDisable")!
	el3.style.display = "block";
	const el4 = document.getElementById("sendBtnDisable")!
	el4.style.display = "block";
	const el5 = document.getElementById("sendBtn")!
	el5.style.display = "none";
  };
  
  const sendscreenShow = () => {
	const el = document.getElementById("sendscreen")!
	el.style.display = "block";
	const el2 = document.getElementById("sendBtn")!
	el2.style.display = "none";
	const el3 = document.getElementById("sendBtnDisable")!
	el3.style.display = "block";
	const el4 = document.getElementById("getBtnDisable")!
	el4.style.display = "block";
	const el5 = document.getElementById("getBtn")!
	el5.style.display = "none";
    const el6 = document.getElementById("sendLoading")!
	el6.style.display = "block";
  };
  
  const noAccount = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "none";
    const el2 = document.getElementById("caution")!
	el2.style.display = "block";
    const el3 = document.getElementById("ftxt")!
	el3.style.display = "block";
	const el4 = document.getElementById("backNoAccount")!
	el4.style.display = "block";
    const el5 = document.getElementById("loading")!
	el5.style.display = "none";
  }
  
  const backNoAccountClick = () => {
    location.reload();
  }
  
  const backNoWalletClick = () => {
    location.reload();;
  }
  
  const noWallet = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "none";
    const el2 = document.getElementById("caution")!
	el2.style.display = "block";
    const el3 = document.getElementById("walletTxt")!
	el3.style.display = "block";
	const el4 = document.getElementById("backNoWallet")!
	el4.style.display = "block";
    const el5 = document.getElementById("loading")!
	el5.style.display = "none";
  }
  
  const getload = () => {
    const el = document.getElementById("getLoading")!
	el.style.display = "block";
	const el2 = document.getElementById("gettext")!
	el2.style.display = "none";
	const el3 = document.getElementById("getnumber")!
	el3.style.display = "none";
  }
  
  const getdone = () => {
    const el = document.getElementById("getLoading")!
	el.style.display = "none";
	const el2 = document.getElementById("gettext")!
	el2.style.display = "block";
	const el3 = document.getElementById("getnumber")!
	el3.style.display = "block";
  }
  // -------------------------------------------------------
 
   // -------------------------------------------------------
  // Send a transaction

  const onSendTransaction = async () => {
    setState({ ...state, creatingTransaction: true });
	send1();
    console.log('sending a transaction...');

    await state.zkappWorkerClient!.fetchAccount({ publicKey: state.publicKey! });

    await state.zkappWorkerClient!.createUpdateTransaction();

    console.log('creating proof...');
	send2();
    await state.zkappWorkerClient!.proveUpdateTransaction();

    console.log('getting Transaction JSON...');
	send3();
    const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON()

    console.log('requesting send transaction...');
	send4();
    const { hash } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: '',
      },
    });

    console.log(
      'See transaction at https://berkeley.minaexplorer.com/transaction/' + hash
    );

	donesend();

    setState({ ...state, creatingTransaction: false });
  }
  
   // -------------------------------------------------------
  // Refresh the current state

  const onRefreshCurrentNum = async () => {
    console.log('getting zkApp state...');
	getload();
    await state.zkappWorkerClient!.fetchAccount({ publicKey: state.zkappPublicKey! })
    const currentNum = await state.zkappWorkerClient!.getNum();
    console.log('current state:', currentNum.toString());
	getdone();

    setState({ ...state, currentNum });
  }
 
  let hasWallet;
  if (state.hasWallet != null && !state.hasWallet) {
    const auroLink = 'https://www.aurowallet.com/';
    hasWallet = <a id="walletLink" style={{display: 'block'}} href={auroLink} target="_blank" rel="noreferrer">
		<h1 className={styles.walletLink}>[[CLICK HERE]]</h1>
	</a>
	status4();
	noWallet();

  }

  let setupText = state.hasBeenSetup ? 'SnarkyJS Ready' : 'Loading...';
  let setup = <div id="setup" style={{display: 'block'}}> { setupText } { hasWallet }</div>
  
  let accountDoesNotExist;
  if (state.hasBeenSetup && !state.accountExists) {
	  const faucetLink = "https://faucet.minaprotocol.com/?address=" + state.publicKey!.toBase58();
	accountDoesNotExist = <a id="flink" style={{display: 'block'}} href={faucetLink} target="_blank" rel="noreferrer">
		<h1 className={styles.faucetHere}>[[CLICK HERE]]</h1>
	</a>
	status5();
	noAccount();
	hasBeenSetup: false;
  }
  
  let mainContent;
  if (state.hasBeenSetup && state.accountExists) {	
    mainContent =
		<div>
			<a id="sendBtn" style={{display: 'block'}} onClick={() => {onSendTransaction(); sendscreenShow(); }}>
					<span className={styles.sendBtn}> </span>
			</a>
			
			<a id="getBtn" style={{display: 'block'}} onClick={() => {onRefreshCurrentNum(); getscreenShow(); }}>
					<span className={styles.getBtn}></span>
			</a>
			
			<span id="getBtnDisable" style={{display: 'none'}} className={styles.getBtnDisable}></span>
			<span id="sendBtnDisable" style={{display: 'none'}} className={styles.sendBtnDisable}></span>
			
			<h1 className={styles.txtAddrs}>{  state.publicKey!.toBase58() } </h1>
			<h1 className={styles.addrs}>Address :</h1>
			
			<div id="getscreen" style={{display: 'none'}} className={styles.getscreen}>
				<span className={styles.getscreenBlack}> </span>
				<span className={styles.getscreenImg}> </span>
				
				<a id="closeGet" style={{display: 'block'}} onClick={() => {closeGetclick(); }}>
					<span className={styles.closeGet}> </span>
				</a>
				
				<span id="getLoading" style={{display: 'none'}} className={styles.getLoading}> </span>
				
				<h1 id="gettext" style={{display: 'none'}} className={styles.txtState}>Current Number in ZkApp :</h1>
				<h1 id="getnumber" style={{display: 'none'}} className={styles.numState}>{ state.currentNum!.toString() } </h1>
			</div>
			
			<div id="sendscreen" style={{display: 'none'}} className={styles.sendscreen}>
				<span className={styles.sendscreenBlack}> </span>
				<span className={styles.sendscreenImg}> </span>
				
				<a id="closeSend" style={{display: 'none'}} onClick={() => {closeSendclick(); }}>
					<span className={styles.closeSend}> </span>
				</a>
				
				<span id="sendLoading" style={{display: 'none'}} className={styles.sendLoading}> </span>
				<span id="sendCheck" style={{display: 'none'}} className={styles.sendCheck}> </span>
				<span id="sendDone" style={{display: 'none'}} className={styles.sendDone}> </span>
				
				<h1 id="send1" style={{display: 'none'}} className={styles.statusSendTxt}>Sending a Transaction...</h1>
				<h1 id="send2" style={{display: 'none'}} className={styles.statusSendTxt}>Creating Proof...</h1>
				<h1 id="send3" style={{display: 'none'}} className={styles.statusSendTxt}>Getting Transaction JSON...</h1>
				<h1 id="send4" style={{display: 'none'}} className={styles.statusSendTxt}>Requesting Send Transaction...</h1>


			</div>

		</div>
	hideloadingBtn();
	status6();
  }
	
  return (
	<div className={styles.container}>	
	  <Head>
        <title>ZKAPP | AGUNG SENJAYA</title>
        <meta name="description" content="ZkApp By mbukhori" />
		<meta name="viewport" content="width=1024"/>
        <link href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAEvklEQVRYhe2XW2wUZRTHf2d2drfb2gu10HZbYzA1kQfLRYyghEcgJNJYQZ+KJMYE30x8MkYSQ3zyyUBM5EVDeRBDwGJMiDFivGAhhCCmmCpUjZRipbW7FHZ3Lt/xYfYysxfw+qQnmezsfOc7//93zv878w38103+yiSdTHehVhqhHzzF2FdAr8qK6bl/jYBe6h/AZwR0CGUlKCjBVb4351EZAzMqD85e/kcI6NTyblxnD/AcEA+AtDioVQTK9y6GtxD2yspfZv8yAf2+bz1GjoL21AeuR6LkA6DXMTwpa379rBGGdRvwpzCcRLUnAKkAGB88T1ETXJ4XPAv7oApGu0A/0rOdO/4UAf02/Sg+B1GSQaBKUOMpWdmEs2wfmXwPmUIap3s/WWszxtcKeIVMEuSQnunY+IcI6NSybiw5imoyGkwxvuK6SnLpMM0925HUGiS1mube7SSXDmNKREOEMQqqCbAO67m7lt45A469B6PdlcnFtHuQlU2YvgMk2tcCkOrbTapvNwB2ywCLPEQ+r1WlKJPpMa79SjVcRIQ60T+AmIugNWr3PHB7D5Dq3lYvk2XLzRxFp56nOeFRFiagARlHbF0hD2emSv52lI7ZiWq8/h7XiOvCN88ixehiLyHV9wzxtkFSvcNk5j5Fbx5CpAxcipPA0RHg1VKcqhKYoQY1rFyliQtjtLvHaXeO07r4DjcndpXH4ks24vlaBI+WRJWhMGKZgE6muzAMVgsvUsuw1dTZhMac4FlIQ6GFrNJTbZ21JfDcfowVDU5jAqZtGxkJfMTuouWeUgYU59oRmiSUsaieBM/0A/NRAn6st7yKep2uikTHqrepMfX47cILpBY/QRLVnTH0a0gDF6IE1FdU6k8oB6owyM28X3axYs0k7l6PZbfSOvAiN86eImEuBVusbhYqgUIZkBkiaavKQqjEAIWLu2hpkpKwyJh76djwFXbLclIrXseZeIKk3eA9EZOrpTiVXeDmrjRoIDU7AIIGYluKbSnxmNKsP1KYGwcg2bkO1wnNM6GYRpVcbLqGgDxyYw5jzkcVS1nJWlxppWSVoGoU1xdiTelgyM8HPaLeIlTPyZbsfG0JANQaA7MqnDaNvl7LrqZjG1kp/pcUyft3EG97AID8tRMkYqWyRZuawFgYsqoTuqMY6yWURA1wVIMsWXuQeuYsfI373cukbOroSR2MHAr7RzqhrM1cRjmg1RowioVSmH6PW9PH8HNBCZ250zhzpwFwMxMsjD+NM76R1ths3Wamhjdlc/6HhgQA8Ny9qF6rFqQlSlv+Q6zJnRTmA9Dc1H5yU/sDAtlJWhY/oCXhImEhVzrgjOUUXquGs6sfyGOLs/pl67AiJ1GS4fRbosQtyP58GHwHzZ5BFW799C6F6WMkJZLu8NbLi6/D8jjXa/BqMlA0/bx9h2JGoXgqCgU1RjEGYkVA3wTkgnRGRYeSF8OIbHWO1MO5/aH0i7Z16ptjlA6lNFxhbdsNbmfE6LBsdccbYTQ8lALIhuy4CIOqui9QcMPmEhEsiqNG3xDXGbwd+B0zEDb9uOk+hBFFhlBd3eB74JwYM0bMHq1W+98mECFzgk5iiT6M9APg6RVizrRsYf4OU/+3GvsdPD5jAu/D1tEAAAAASUVORK5CYII=" rel="icon" type="image/x-icon" />
	  </Head>



	  <main className={styles.main}>
		
        <div id="homepage" className={styles.homepage}>
            <span className={styles.homepageImg}> </span>
            <a id="connectBtn" style={{display: 'block'}} onClick={() => {connectBtnclick(); connectWallet();}}>
                <span className={styles.connectBtn}> </span>
            </a>
            
                <span id="loadingBtn" style={{display: 'none'}} className={styles.loadingBtn}> </span>
                <span id="loading" style={{display: 'none'}} className={styles.loading}> </span>
                
                <h1 id="status1" style={{display: 'none'}} className={styles.statusTxt}>Status : Sync & Checking Wallet ...</h1>
                <h1 id="status2" style={{display: 'none'}} className={styles.statusTxt}>Status : Sync DONE! Connect to Wallet...</h1>
                <h1 id="status3" style={{display: 'none'}} className={styles.statusTxt}>Status : Checking & Validation Address...</h1>
                <h1 id="status4" style={{display: 'none'}} className={styles.statusTxt}>Status : Wallet Extension Not Found!</h1>
                <h1 id="status5" style={{display: 'none'}} className={styles.statusTxt}>Status : Address Not Valid or No Balance!</h1>
                <h1 id="status6" style={{display: 'none'}} className={styles.statusTxt}>Status : READY FOR TRANSACTION!!!</h1>
                
                <span id="caution" style={{display: 'none'}} className={styles.caution}> </span>
                
                <span id="succes" style={{display: 'none'}} className={styles.succes}> </span>

                <h1 id="ftxt" style={{display: 'none'}} className={styles.faucetTxt}>Invalid Account or No Balance!! Please check and fund on this link </h1>
                
                <h1 id="walletTxt" style={{display: 'none'}} className={styles.walletTxt}>Could not find a wallet. Please Install Auro wallet and Re-Connect!! </h1>
                
                <a id="backNoAccount" style={{display: 'none'}} onClick={() => {backNoAccountClick(); }}>
                    <span className={styles.backNoAccount}> </span>
                </a>
                
                <a id="backNoWallet" style={{display: 'none'}} onClick={() => {backNoWalletClick(); }}>
                    <span className={styles.backNoWallet}> </span>
                </a>
                
                <span id="banner" style={{display: 'block'}} className={styles.banner}> </span>
                <span id="banner2" style={{display: 'block'}} className={styles.banner2}> </span>
                
            {mainContent}
            {accountDoesNotExist}
            {hasWallet}
            
        <div id="footer" style={{display: 'block'}} >	
            <span id="footerbg" style={{display: 'block'}} className={styles.footerbg}> </span>
            <a style={{display: 'block'}} href="https://t.me/qoritele" target="_blank" rel="noopener noreferrer" >
                    <span className={styles.teleIcon}> </span>
                </a>
                
            <a style={{display: 'block'}} href="https://discordapp.com/users/427110583079272479" target="_blank" rel="noopener noreferrer" >
                    <span className={styles.dcIcon}> </span>
                </a>
                
            <a style={{display: 'block'}} href="https://github.com/mbukhori" target="_blank" rel="noopener noreferrer" >
                    <span className={styles.gitIcon}> </span>
                </a>
                
            <a style={{display: 'block'}} href="https://web.facebook.com/muhammadbukhori" target="_blank" rel="noopener noreferrer" >
                    <span className={styles.fbIcon}> </span>
                </a>
                
            <span id="blank" style={{visibility: 'hidden'}} className={styles.blank}> </span>
        </div>
                
        </div>
    </main> 
<footer className={styles.footer}>
    </footer>


{/* <main className={styles.main}>

<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mx-auto my-auto">
	 <img className='text-center mx-auto' src="/header.jpg" width="50%" alt="" />
    <div className="p-5 text-center">
    	<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mina Protocol</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
		<div className='text-center'>
			{!hasWallet ?
			<div className='text-center mx-auto'>
				<Button className='text-center mx-auto' gradientMonochrome="purple" onClick={() => setOpenModal('default')}>Connect Wallet</Button>
			</div>
			: ''
			}
          <Modal size="sm" show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
	            <Modal.Header>Connect Wallet</Modal.Header>
            <Modal.Body>
			<div>
                <ul className="my-4 space-y-3">
                    <li>
                        <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100" fill="none">
<path d="M0 20C0 10.5719 0 5.85786 2.92893 2.92893C5.85786 0 10.5719 0 20 0H80C89.4281 0 94.1421 0 97.0711 2.92893C100 5.85786 100 10.5719 100 20V80C100 89.4281 100 94.1421 97.0711 97.0711C94.1421 100 89.4281 100 80 100H20C10.5719 100 5.85786 100 2.92893 97.0711C0 94.1421 0 89.4281 0 80V20Z" fill="url(#paint0_linear_3510_7137)"></path>
<mask id="mask0_3510_7137" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
<path d="M0 20C0 10.5719 0 5.85786 2.92893 2.92893C5.85786 0 10.5719 0 20 0H80C89.4281 0 94.1421 0 97.0711 2.92893C100 5.85786 100 10.5719 100 20V80C100 89.4281 100 94.1421 97.0711 97.0711C94.1421 100 89.4281 100 80 100H20C10.5719 100 5.85786 100 2.92893 97.0711C0 94.1421 0 89.4281 0 80V20Z" fill="#87B9F8"></path>
</mask>
<g mask="url(#mask0_3510_7137)">
<g filter="url(#filter0_f_3510_7137)">
<circle cx="99.5" cy="11.5" r="38.5" fill="#D65A5A"></circle>
</g>
<path d="M-34 84.4426L30 25L73.52 31.0656L78 82.0164L24.24 136L-13.52 121.443L-34 84.4426Z" fill="url(#paint1_linear_3510_7137)" fill-opacity="0.8"></path>
<path d="M49.91 18.1C55.55 18.1 60.47 19.21 64.67 21.43C68.87 23.65 72.11 26.95 74.39 31.33C76.73 35.65 77.9 40.9 77.9 47.08V82H66.2V65.8H33.44V82H21.92V47.08C21.92 40.9 23.06 35.65 25.34 31.33C27.68 26.95 30.95 23.65 35.15 21.43C39.35 19.21 44.27 18.1 49.91 18.1ZM66.2 55.99V46C66.2 40.18 64.76 35.8 61.88 32.86C59 29.86 54.98 28.36 49.82 28.36C44.66 28.36 40.64 29.86 37.76 32.86C34.88 35.8 33.44 40.18 33.44 46V55.99H66.2Z" fill="black" fill-opacity="0.1"></path>
<path d="M49.91 18.1C55.55 18.1 60.47 19.21 64.67 21.43C68.87 23.65 72.11 26.95 74.39 31.33C76.73 35.65 77.9 40.9 77.9 47.08V82H66.2V65.8H33.44V82H21.92V47.08C21.92 40.9 23.06 35.65 25.34 31.33C27.68 26.95 30.95 23.65 35.15 21.43C39.35 19.21 44.27 18.1 49.91 18.1ZM66.2 55.99V46C66.2 40.18 64.76 35.8 61.88 32.86C59 29.86 54.98 28.36 49.82 28.36C44.66 28.36 40.64 29.86 37.76 32.86C34.88 35.8 33.44 40.18 33.44 46V55.99H66.2Z" fill="white"></path>
</g>
<defs>
<filter id="filter0_f_3510_7137" x="11" y="-77" width="177" height="177" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
<feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_3510_7137"></feGaussianBlur>
</filter>
<linearGradient id="paint0_linear_3510_7137" x1="74" y1="-45" x2="78.8354" y2="120.707" gradientUnits="userSpaceOnUse">
<stop stop-color="#CA5C89"></stop>
<stop offset="0.463031" stop-color="#4F55EC"></stop>
<stop offset="1" stop-color="#3531FF"></stop>
</linearGradient>
<linearGradient id="paint1_linear_3510_7137" x1="63.28" y1="43.1967" x2="-7.99709" y2="110.69" gradientUnits="userSpaceOnUse">
<stop stop-color="#2821A7" stop-opacity="0.63"></stop>
<stop offset="1" stop-color="#2821A7" stop-opacity="0"></stop>
</linearGradient>
</defs>
</svg>

                            <span className="flex-1 ml-3 whitespace-nowrap">Auro Wallet</span>
                            <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
                        </a>
                    </li>
                </ul>
                <div>
                    <a href="#" className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                        <svg aria-hidden="true" className="w-3 h-3 mr-2" focusable="false" data-prefix="far" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path></svg>
                        Why do I need to connect with my wallet?</a>
                </div>
            </div>
            </Modal.Body>
          </Modal>

		</div>
    </div>
</div>
</main> */}




	</div>
  );
}
