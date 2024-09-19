import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function CurrencyConverter() {
  const exchangeRate = {
    "0" : {"currency" : "usd", "rate" : 80}, "1": {"currency" : "dnr", "rate" : 12}, "2": {"currency" : "eur", "rate" : 120}
  }
  const [input, setInput] = useState(0);
  const [currency, setCurrency] = useState("usd");
  const [exchangedRate, setExchangedRate] = useState(0);
  //use to navigate
  const navigate = useNavigate();

  //20mb glb
  // const modelUrl = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/AntiqueCamera.glb?sp=r&st=2024-09-10T10:45:34Z&se=2024-12-31T18:45:34Z&spr=https&sv=2022-11-02&sr=b&sig=5m9z%2F17qg4BSeAmOV1pZiqDg%2F0sKN3aSoCXxIjz3HjE%3D'
  
  // 300 kb glb
  // const modelUrl = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/CatEyeGlasses.glb?sp=r&st=2024-09-19T07:10:19Z&se=2024-09-19T15:10:19Z&spr=https&sv=2022-11-02&sr=b&sig=shx4VCiQEog0f6KyBvw%2Beb07gHJ9lHowrlKiwTvpirw%3D'
  
  // 3d model 770KB
  // const modelUrl = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/HeartGlass_770.glb?sp=r&st=2024-09-19T07:39:16Z&se=2024-09-19T15:39:16Z&spr=https&sv=2022-11-02&sr=b&sig=TZeeVsfsDg%2BnSuO62tbYP74RZiVZtuGae7UKe31lqrQ%3D'

  // 3d model Cars 1.09MB
  const modelUrl1 = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/Cars.glb?sp=r&st=2024-09-19T08:43:59Z&se=2024-09-19T16:43:59Z&spr=https&sv=2022-11-02&sr=b&sig=dZWRQ%2F8SgQ4OD%2B3NJBB1pJD7IaN5uX%2FU8l2ll2WzDS4%3D'
  
  //3D model house 1.4 MB
  const modelUrl2 = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/house_1_4MB.glb?sp=r&st=2024-09-19T08:51:21Z&se=2024-09-19T16:51:21Z&spr=https&sv=2022-11-02&sr=b&sig=V1ugdfoRByeqm8BCoBxzFp7kQlxBAafi7t%2BwlRDkh4U%3D'
  
  // 3D model Bucket - 2.2MB
  const modelUrl3 = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/old_bucket_2mb.glb?sp=r&st=2024-09-19T09:06:36Z&se=2024-09-19T17:06:36Z&spr=https&sv=2022-11-02&sr=b&sig=b%2BljSKDgO2sH2ts1L3VlS2MxlbcLz485Wg21oo4dR74%3D'

  // bottle glb 8.5 Mb
  // const modelUrl = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/bottle.glb?sp=r&st=2024-09-19T07:14:37Z&se=2024-09-19T15:14:37Z&spr=https&sv=2022-11-02&sr=b&sig=22h0hv%2FbwdN3AA%2FUYWJksaxtnY7F%2FvPcPG%2FeK6el0dU%3D'
  
  // image 89Kb
  // const modelUrl = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/pic.jpeg?sp=r&st=2024-09-19T05:55:32Z&se=2024-11-01T13:55:32Z&spr=https&sv=2022-11-02&sr=b&sig=LRVsoG%2FWIDzNhKQ8jMs4pG6GDhMUYOILtGJ0cnkf6s0%3D'

  useEffect(()=>{
    loadModel(modelUrl1)
    loadModel(modelUrl2)
    loadModel(modelUrl3)
  },[])

   function loadModel(file) {
    return new Promise((res, rej) => {
      const loader = new GLTFLoader()
      loader.load(file, (gltf) => {
        res(gltf.scene)
      }, undefined, (error) => {
        rej(error)
      })
    })
  }

  // function loadModel(file){
  //   fetch(file, {
  //     mode : 'no-cors',
  //   })
  //     .then(response => response.blob())
  // }

  const onInput = (e) => {
    setInput(e.target.value)
    const _currency = Object.values(exchangeRate).find(obj => obj.currency === currency);
    setExchangedRate(e.target.value*_currency.rate)
  }

  const onChnageCurrency = (e) => {
    setCurrency(e.target.value)
    const usdRateObject = Object.values(exchangeRate).find(obj => obj.currency === e.target.value);
    setExchangedRate(input*usdRateObject.rate)
  }

  return (
    <div className="">
      <input onChange={(e) => onInput(e)} />

      <select name="dollar" id="usd" onChange={(e) => onChnageCurrency(e)}>
        <option value="usd" >USD</option>
        <option value="dnr">Dinar</option>
        <option value="eur">EUR</option>
      </select>
      {exchangedRate}
      <button type="button" onClick={() => navigate('/')}>Home</button>
    </div>
  );
}

export default CurrencyConverter;
