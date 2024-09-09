import React, {useEffect, useState} from "react"
import {GestureRecognizer, FilesetResolver, DrawingUtils  } from '@mediapipe/tasks-vision';
import './handgesture.css'

let gestureRecognizer
let runningMode = 'VIDEO'
let enableWebcamButton
let webcamRunning = false
const videoHeight = '360px'
const videoWidth = '480px'
let video
let canvasElement
let canvasCtx
let gestureOutput

function HandGesture() {

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      video = document.getElementById('webcam')
      canvasElement = document.getElementById('output_canvas')
      canvasCtx = canvasElement.getContext('2d')
      gestureOutput = document.getElementById('gesture_output')
  
      createGestureRecognizer()
  
      setIsVisible(true)
      // eslint-disable-next-line no-use-before-define
      setTimeout(initWebCam, 6000)
    }, [])
  
    const initWebCam = () => {
      // eslint-disable-next-line no-use-before-define
      enableCam()
    }
  
    // Before we can use HandLandmarker class we must wait for it to finish
    // loading. Machine Learning models can be large and take a moment to
    // get everything needed to run.
    const createGestureRecognizer = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
      )
      gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
          delegate: 'GPU',
        },
        runningMode,
        numHands: 18,
      })
    }
  
    // Check if webcam access is supported.
    function hasGetUserMedia() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    }
  
    // If webcam supported, add event listener to button for when user
    // wants to activate it.
    if (hasGetUserMedia()) {
      enableWebcamButton = document.getElementById('webcamButton')
      // enableWebcamButton.addEventListener("click", enableCam);
    } else {
      console.warn('getUserMedia() is not supported by your browser')
    }
  
    // Enable the live webcam view and start detection.
    function enableCam(event) {
      if (!gestureRecognizer) {
        alert('Please wait for gestureRecognizer to load')
        setTimeout(enableCam, 3000)
        return
      }
      setIsVisible(false)
  
    //   if (webcamRunning === true) {
    //     webcamRunning = false
    //     // enableWebcamButton.innerText = "ENABLE PREDICTIONS";
    //   } else {
        webcamRunning = true
    //     // enableWebcamButton.innerText = "DISABLE PREDICTIONS";
    //   }
  
      // getUsermedia parameters.
      const constraints = {
        video: {
          facingMode: 'user',
          width: window.innerHeight,
          height: window.innerWidth,
        },
      }
  
      // Activate the webcam stream.
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream
        video.addEventListener('loadeddata', predictWebcam)
      })
    }
  
    let lastVideoTime = -1
    let results
    async function predictWebcam() {
      video.style.width = '100%'
      video.style.height = '100%'
      canvasElement.style.width = '100%'
      canvasElement.style.height = '100%'
      canvasElement.width = video.videoWidth
      canvasElement.height = video.videoHeight
      const webcamElement = document.getElementById('webcam')
      // Now let's start detecting the stream.
      if (runningMode === 'IMAGE') {
        runningMode = 'VIDEO'
        await gestureRecognizer.setOptions({runningMode: 'VIDEO', numHands: 18})
      }
      const nowInMs = Date.now()
      if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime
        results = gestureRecognizer.recognizeForVideo(video, nowInMs)
      }
  
      canvasCtx.save()
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
      const drawingUtils = new DrawingUtils(canvasCtx)

      console.log("result", results)
      if (results.landmarks) {
        for (const landmarks of results.landmarks) {
          drawingUtils.drawConnectors(
            landmarks,
            GestureRecognizer.HAND_CONNECTIONS,
            {
              color: '#FFF',
              lineWidth: 5,
            }
          )
          drawingUtils.drawLandmarks(landmarks, {
            color: '#0aadd1',
            lineWidth: 2,
          })
        }
      }
      canvasCtx.restore()
      if (results.gestures.length > 0) {
        gestureOutput.style.display = 'block'
        gestureOutput.style.width = videoWidth
        const {categoryName} = results.gestures[0][0]
        const categoryScore = parseFloat(
          results.gestures[0][0].score * 100
        ).toFixed(2)
        const handedness = results.handednesses[0][0].displayName
        gestureOutput.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %\n Handedness: ${handedness}`
      } else {
        gestureOutput.style.display = 'none'
      }
      // Call this function again to keep predicting when the browser is ready.
      if (webcamRunning === true) {
        window.requestAnimationFrame(predictWebcam)
      }
    }
    return (
      <React.Fragment>

        <div id='liveView' className='videoViewHandGesture'>
          <div style={{position: 'relative'}}>
            <video id='webcam' autoPlay playsInline />
            <canvas
              className='output_canvasHandGesture'
              id='output_canvas'
              width={1280}
              height={720}
              style={{position: 'absolute', left: 0, top: 0}}
            />
            <p id='gesture_output' class='outputHandGesture'></p>
          </div>
        </div>
  
      </React.Fragment>
  
    )
  }
    
    export default HandGesture