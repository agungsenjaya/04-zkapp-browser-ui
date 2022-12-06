import '../styles/globals.css'
import { useEffect, useState } from "react";
import './reactCOIServiceWorker';
import {Modal, Spinner, Button} from 'flowbite-react';
import styles from '../styles/Home.module.css';
import ZkappWorkerClient from './zkappWorkerClient';

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

  // -------------------------------------------------------
  // Do Setup

  
  useEffect(() => {
    (async () => {
      if (!state.hasBeenSetup) {
        const zkappWorkerClient = new ZkappWorkerClient();
        
        console.log('Loading SnarkyJS...');
        await zkappWorkerClient.loadSnarkyJS();
        console.log('done');

        await zkappWorkerClient.setActiveInstanceToBerkeley();

        const mina = (window as any).mina;

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
    })();
  }, []);

  // -------------------------------------------------------
  // Wait for account to exist, if it didn't

  useEffect(() => {
    (async () => {
      if (state.hasBeenSetup && !state.accountExists) {
        for (;;) {
          console.log('checking if account exists...');
          const res = await state.zkappWorkerClient!.fetchAccount({ publicKey: state.publicKey! })
          const accountExists = res.error == null;
          if (accountExists) {
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
        setState({ ...state, accountExists: true });
      }
    })();
  }, [state.hasBeenSetup]);

  // -------------------------------------------------------
  // Send a transaction

  const onSendTransaction = async () => {
    setState({ ...state, creatingTransaction: true });
    console.log('sending a transaction...');

    await state.zkappWorkerClient!.fetchAccount({ publicKey: state.publicKey! });

    await state.zkappWorkerClient!.createUpdateTransaction();

    console.log('creating proof...');
    await state.zkappWorkerClient!.proveUpdateTransaction();

    console.log('getting Transaction JSON...');
    const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON()

    console.log('requesting send transaction...');
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

    setState({ ...state, creatingTransaction: false });
  }

  // -------------------------------------------------------
  // Refresh the current state

  const onRefreshCurrentNum = async () => {
    console.log('getting zkApp state...');
    await state.zkappWorkerClient!.fetchAccount({ publicKey: state.zkappPublicKey! })
    const currentNum = await state.zkappWorkerClient!.getNum();
    console.log('current state:', currentNum.toString());

    setState({ ...state, currentNum });
  }

  // -------------------------------------------------------
  // Create UI elements

  let hasWallet;
  if (state.hasWallet != null && !state.hasWallet) {
    const auroLink = 'https://www.aurowallet.com/';
    const auroLinkElem = <a href={auroLink} target="_blank" rel="noreferrer"> [Link] </a>
    hasWallet = <div> Could not find a wallet. Install Auro wallet here: { auroLinkElem }</div> 
  }

  let setupText = state.hasBeenSetup ? '' : <Spinner color="purple" size="xl" aria-label="Default status example" />;
  let setup = <div> { setupText } { hasWallet }</div>

  let accountDoesNotExist;
  if (state.hasBeenSetup && !state.accountExists) {
    const faucetLink = "https://faucet.minaprotocol.com/?address=" + state.publicKey!.toBase58();
    accountDoesNotExist = <div>
      Account does not exist. Please visit the faucet to fund this account
      <a href={faucetLink} target="_blank" rel="noreferrer"> [Link] </a>
    </div>
  }

  let mainContent;
  if (state.hasBeenSetup && state.accountExists) {
    mainContent = <div>
      <div> Current Number in zkApp: { state.currentNum!.toString() } </div>
      <div className='grid grid-cols-2 gap-4 mb-3'>
      <Button gradientMonochrome="purple" onClick={onSendTransaction} disabled={state.creatingTransaction}>Send</Button>
      <Button gradientMonochrome="purple" onClick={onRefreshCurrentNum}>Get State</Button>
      </div>
    </div>
  }

  return <div>
   {/* { setup } */}
   {/* { accountDoesNotExist }
   { mainContent } */}


   <main className={styles.main}>

<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mx-auto my-auto">
	 <img className='text-center mx-auto' src="/04-zkapp-browser-ui/header.jpg" width="50%" alt="" />
    <div className="p-5 text-center">
    	<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mina Protocol</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions blockchain protocol.</p>
        {/*  */}
		<div className='text-center'>
			{!state.hasBeenSetup && !state.accountExists ? 
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
							{/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100" fill="none">
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
</svg> */}
  <img className='' src="/04-zkapp-browser-ui/auro.svg" width="20" alt="" />

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

		{ setup }
		{ accountDoesNotExist }
		{ mainContent }

    </div>
</div>
</main>

  </div>
}