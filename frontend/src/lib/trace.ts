import Web3 from "web3";

import log from "../api/log";

async function getAccountAddress() {
  try {
    let web3Raw = null;
    await window.ethereum.enable();
    web3Raw = new Web3(window.ethereum);
    const accounts = await web3Raw.eth.getAccounts();
    return accounts;
  } catch (error) {
    return undefined;
  }
}

export async function PageViewTrace(path: string) {
  const account = await getAccountAddress();
  console.log(`View ${path}`);
  window.gtag("event", `View ${upperFirst(path)}`, {
    event_category: "general",
    event_label: path,
    value: new Date().toLocaleTimeString(),
  });
  log(`View ${upperFirst(path)}`, account ? account[0] : "");
}

export async function PageScrollTrace(path: string) {
  const account = await getAccountAddress();
  console.log(`Scroll ${path}`);
  window.gtag("event", `Scroll ${upperFirst(path)}`, {
    event_category: "general",
    event_label: path,
    value: new Date().toLocaleTimeString(),
  });
  log(`Scroll ${upperFirst(path)}`, account ? account[0] : "");
}

export async function ButtonClickTrace(name: string) {
  const account = await getAccountAddress();
  console.log(`Click ${name}`);
  window.gtag("event", `Click ${upperFirst(name)}`, {
    event_category: "general",
    event_label: name,
    value: new Date().toLocaleTimeString(),
  });
  log(`Click ${upperFirst(name)}`, account ? account[0] : "");
}

export async function ButtonSelectTrace(name: string, value: any) {
  const account = await getAccountAddress();
  console.log(`Click ${name}`);
  window.gtag("event", `Select ${upperFirst(name)}`, {
    event_category: "general",
    event_label: name,
    value,
  });
  log(`Select ${upperFirst(name)}`, account ? account[0] : "", value);
}

function upperFirst(str: string) {
  str = str.toLowerCase();
  return str.replace(/\b\w|\s\w/g, (fw) => {
    return fw.toUpperCase();
  });
}
