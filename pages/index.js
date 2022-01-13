import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useMetamask } from "use-metamask";
import { FaDna, FaRobot, FaInfinity } from "react-icons/fa";
import Web3 from "web3";
import styles from "../styles/Home.module.css";
import MintToVoteContract from '../contracts/MintToVote';

export default function Home() {
  const { connect, metaState } = useMetamask();
  const [balance, setBalance] = useState();
  const [onh, setOnh] = useState(false);
  const [onnet, setOnnet] = useState("Harmony Testnet");
  useEffect(() => {
    if (!metaState.isConnected) {
      async function loadContract() {
        return await new window.web3.eth.Contract([MintToVoteContract, "one1s7qmn0safezuajxyxqnvxqjxp9yz2wekhdnt8n"])
      }
      async function getCurrentAccount() {
        const accounts = await window.web3.eth.getAccounts();
        return accounts[0];r
      }
      async function createNewProposal() {
        //AAA
      }
      async function load() {
        await loadWeb3();
        window.contract = await loadContract();
        updateStatus('Ready!');
      }
      (async () => {
        try {
          await connect(Web3);
          await window.ethereum.enable();
          load()
        } catch (error) {
          console.log(error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { account, isConnected, web3 } = metaState;
    if (account.length && isConnected && web3) {
      (async () => {
        let _balance;
        let _onh;
        let _onnet;
        if (web3?.eth) {
          _balance = await metaState.web3.eth.getBalance(metaState.account[0]);
        } else {
          _balance = await metaState.web3.getBalance(metaState.account[0]);
        }
        const harmonyShards = [1666600000, 1666600001, 1666600002, 1666600003, 1666700000, 1666700001, 1666700002, 1666700003]
        const mainnetShards = [1666600000, 1666600001, 1666600002, 1666600003]
        if (harmonyShards.indexOf(parseInt(metaState.chain.id)) != -1) {
          _onh = true;
          setOnh(true);
          console.log(_onh);
          if (mainnetShards.indexOf(parseInt(metaState.chain.id)) != -1) {
            _onnet = "Harmony Mainnet";
            setOnnet("Harmony Mainnet");
          }
          else {
            _onnet = "Harmony Testnet";
            setOnnet("Harmony Testnet");
          }
        }
        else {
          _onh = false;
          setOnh(false)
        }
        setBalance(parseFloat(_balance / 10 ** 18).toFixed(3));
      })();
    }
  }, [metaState]);


  return (
    <div className={styles.container}>
      <Head>
        <title>Mint to Vote</title>
        <meta name="description" content="Voting should be easy, transparent, trustless and effecient. With a unique Blockchain based Mint to Vote system...we’re here to do just that." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Mint To Vote
        </h1>

        <p className={styles.description}>
          Voting should be easy, transparent, trustless and effecient. With a unique Blockchain based Mint to Vote system...<br /><b>We’re here to do just that.</b></p>

        {onh ? (
          <p className={styles.description}>
            Đapp connected to the {" "}
            <code className={styles.code}>
              {onnet}
            </code> on the wallet{""}
            <code className={styles.code}>{metaState.account[0]}</code>
          </p>
        ) : (
          <p className={styles.description}>
            <b>Not connected to HarmonyOne&apos;s<br/>mainnet via MetaMask.</b><br />Let&apos;s fix that!<br />
            <ol>
              <li><p>Make sure <a href="https://metamask.io/download">MetaMask</a> is installed</p></li>
              <li><p><a href="/metamask-harmony">Add HarmonyOne&apos;s mainnet <Image src="/harmonyone.svg" alt="GitHub Logo" width={32} height={16} /></a></p></li>
              <li><p>Click the MetaMask extension
                <Image src="/metamask.svg" alt="GitHub Logo" width={32} height={16} />
              </p></li>
            </ol>
          </p>
        )}
        {onh ? (
          <div className={`${styles.grid} ${styles.gridCandidates}`}>
            <a href="" className={styles.card}>
              <h2>Candidate 1 &rarr;</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum congue libero, ac euismod eros tempus hendrerit.</p>
            </a>

            <a href="" className={styles.card}>
              <h2>Candidate 2 &rarr;</h2>
              <p>Nam condimentum, mauris sed ullamcorper vestibulum, sem massa porttitor nisi, vel dictum metus turpis a ligula.</p>
            </a>
          </div>) : (<br />)}

        <h1 className={styles.title}>
          The Advantages
        </h1>
        <div className={styles.grid}>
          <div className={styles.advantages}>
            <h2><FaDna size={20} color={'#02E4C0'} /> A single source of truth</h2>
            <p>To combat duplicate accounts or bots from overriding votes, we have implemented a seamless KYC process.</p>
          </div>
          <div className={styles.advantages}>
            <h2><FaRobot size={20} color={'#02E4C0'} /> KYC Proteted</h2>
            <p>Utilizing Harmony&apos;s Blockchain, voting can be done in a truly trustless enviroment ensuring the extinction of fradulent votes or miscounts.</p>
          </div>
          <div className={styles.advantages}>
            <h2><FaInfinity size={20} color={'#02E4C0'} /> Possibilities</h2>
            <p>With transaction feels amounting to ~$0.00001 per txn, and finality times in ~2 seconds this system is infintely scalable, fast and will cost signifigantly less than major campaigns.</p>
          </div>
        </div>

        <h1 className={styles.title}>
          Past Elections
        </h1>
        <p className={styles.description}>View the results of past elections, who the candidates were, why the ran, explore on chain data of votes, and the complete history of the election.</p>
        <div className={styles.examplesGrid}>
          <div className={styles.pastVoteImageHolder}>
          <Image className={styles.pastVoteImage} alt="Example past vote" src="/ex1.png" width={400} height={400}/>
          </div>
          <div className={styles.pastVoteImageHolder}>
          <Image className={styles.pastVoteImage} alt="Example past vote" src="/ex2.png" width={400} height={400}/>
          </div>
        </div>
        <a className={styles.fancy}>
          <span className={styles.topkey}></span>
          <span className={styles.buttontext}>Coming Soon</span>
          <span className={styles.bottomkey1}></span>
          <span className={styles.bottomkey2}></span>
        </a>
      </main>

      <footer className={styles.footer}>
        <span>
          <a
            href="https://github.com/blockchainuci/hackathon-2022-mint-to-vote-website"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/github.svg" alt="GitHub Logo" width={32} height={16} /></a>
        </span>
        Powered by{" "}
        <span className={styles.logo}>
          <a
            href="https://harmony.one"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/harmony.svg" alt="Harmony Logo" width={72} height={16} /></a>
        </span>. Made by Kainoa Kanter, Anish Lathker, Ethan Nguyen, and Daniel Lee.
      </footer>
    </div>
  );
}
