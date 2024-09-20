import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
  const modelUrl1 = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/Cars.glb?sp=r&st=2024-09-20T04:27:26Z&se=2025-01-01T12:27:26Z&spr=https&sv=2022-11-02&sr=b&sig=UMxJjGtko%2BewuoYj9KvDodqQwdsRWlVVw0BdKnMXI3k%3D'
  
  //3D model house 1.4 MB
  const modelUrl2 = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/house_1_4MB.glb?sp=r&st=2024-09-20T04:28:38Z&se=2025-01-01T12:28:38Z&spr=https&sv=2022-11-02&sr=b&sig=y2aPxfUhFAPBpGtceAeNm7BSCxkXS76PALNUe2Et4Ys%3D'
  
  // 3D model Bucket - 2.2MB
  const modelUrl3 = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/old_bucket_2mb.glb?sp=r&st=2024-09-20T04:30:33Z&se=2025-01-01T12:30:33Z&spr=https&sv=2022-11-02&sr=b&sig=sTjBskH4f63T4TwwjB6En8Gy3uzm3ymmM%2BRZzhScu3U%3D'
  
  // 3d model 4mb
  const modelUrl4 = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/4_mb.glb?sp=r&st=2024-09-20T04:24:57Z&se=2025-01-01T12:24:57Z&spr=https&sv=2022-11-02&sr=b&sig=%2FiK55d2Okhhdo2feyaYvj0RCGNtP0KuGR3SPpkgl5o4%3D'

  //3d model 6mb
  const modelUrl5 = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/6_mb.glb?sp=r&st=2024-09-20T04:44:13Z&se=2025-01-01T12:44:13Z&spr=https&sv=2022-11-02&sr=b&sig=YyH9WYhxX%2BAe6DWjYnCWqKCl55MKuYhtuDB4PQ2NYhY%3D'

  // bottle glb 8.5 Mb
  const modelUrl6 = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/bottle.glb?sp=r&st=2024-09-20T04:33:12Z&se=2025-01-01T12:33:12Z&spr=https&sv=2022-11-02&sr=b&sig=G6nMuxp3Cs2KTmhD5HQ77q7CcmPDnKkVkTXhvQtI%2FTQ%3D'
  
  // image 89Kb
  // const modelUrl = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/pic.jpeg?sp=r&st=2024-09-19T05:55:32Z&se=2024-11-01T13:55:32Z&spr=https&sv=2022-11-02&sr=b&sig=LRVsoG%2FWIDzNhKQ8jMs4pG6GDhMUYOILtGJ0cnkf6s0%3D'

  useEffect(()=>{
    loadModel(modelUrl1)
    loadModel(modelUrl2)
    loadModel(modelUrl3)
    loadModel(modelUrl4)
    loadModel(modelUrl5)
    loadModel(modelUrl6)
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
