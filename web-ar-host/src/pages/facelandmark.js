import { FaceLandmarker, FilesetResolver, DrawingUtils  } from '@mediapipe/tasks-vision';
import React, {useEffect, useState} from 'react';
import './facelandmark.css'

let faceLandmarker
let runningMode = 'VIDEO'
let webcamRunning = false

let video
let canvasElement
let drawingUtils
let canvasCtx

function FaceLandmark() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {

    (async ()=>{
        await createFaceLandmarker()
        setTimeout(initWebCam, 4000)
    })()
        // eslint-disable-next-line no-use-before-define
        video = document.getElementById('webcam')
        canvasElement = document.getElementById('output_canvas')
        canvasCtx = canvasElement.getContext('2d')
        drawingUtils = new DrawingUtils(canvasCtx)
        
        // setIsVisible(true)
        // eslint-disable-next-line no-use-before-define

    return () => {
      console.log('unmount happend')
      webcamRunning = false
    }
  }, [])

  const initWebCam = () => {
    // eslint-disable-next-line no-use-before-define
    enableCam()
  }
  async function createFaceLandmarker() {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
    )
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
        delegate: 'GPU',
      },
      outputFaceBlendshapes: true,
      runningMode,
      numFaces: 9,
    })

    console.log('face landmarker')
    console.log(faceLandmarker)
  }

  // Check if webcam access is supported.
  const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia

  // If webcam supported, add event listener to button for when user
  // wants to activate it.
  if (hasGetUserMedia()) {
    // enableWebcamButton = document.getElementById(
    //   'webcamButton'
    // )
  } else {
    console.warn('getUserMedia() is not supported by your browser')
  }

  // Enable the live webcam view and start detection.
  async function enableCam(event) {
    if (!faceLandmarker) {
      alert('Wait! faceLandmarker not loaded yet.')
      setTimeout(enableCam, 3000)
      return
    }
    setIsVisible(true)
    // if (webcamRunning === true) {
    //   webcamRunning = false
    //   //   enableWebcamButton.innerText = 'ENABLE PREDICTIONS'
    // } else {
    //   webcamRunning = true
    // //  enableWebcamButton.innerText = 'DISABLE PREDICTIONS'
    // }
      webcamRunning = true

    // getUsermedia parameters.
    const constraints = {
      video: {
        facingMode: 'user',
        width: window.innerHeight,
        height: window.innerWidth,
      },
    }

    // Activate the webcam stream.
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream

        // eslint-disable-next-line no-use-before-define
        video.addEventListener('loadeddata', predictWebcam)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  let lastVideoTime = -1
  let results

  async function predictWebcam() {
    const radio = video.videoHeight / video.videoWidth
    // console.log(video.videoHeight)
    video.style.width = '100%'
    video.style.height = '100%'
    canvasElement.style.width = '100%'
    canvasElement.style.height = '100%'
    canvasElement.width = video.videoWidth
    canvasElement.height = video.videoHeight
    // Now let's start detecting the stream.
    if (runningMode === 'IMAGE') {
      runningMode = 'VIDEO'
      await faceLandmarker.setOptions({runningMode: 'VIDEO'})
    }
    const startTimeMs = performance.now()
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime
      results = faceLandmarker.detectForVideo(video, startTimeMs)
      console.log(`currentTime${lastVideoTime}`)
      console.log(results)
    }
    if (results.faceLandmarks) {
    /* eslint-disable no-console */
    /* eslint-disable no-restricted-syntax */
      for (const landmarks of results.faceLandmarks) {
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_TESSELATION,
          {color: '#C0C0C070', lineWidth: 1}
        )
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
          {color: '#FF3030'}
        )
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
          {color: '#FF3030'}
        )
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
          {color: '#30FF30'}
        )
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
          {color: '#30FF30'}
        )
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
          {color: '#E0E0E0'}
        )
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LIPS,
          {color: '#E0E0E0'}
        )
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
          {color: '#FF3030'}
        )
        drawingUtils.drawConnectors(
          landmarks,
          FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
          {color: '#30FF30'}
        )
      }
    }
    // eslint-disable-next-line no-use-before-define
    //   drawBlendShapes(videoBlendShapes, results.faceBlendshapes)

    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning === true) {
      window.requestAnimationFrame(predictWebcam)
    }
  }
  return (
    <React.Fragment>
              <div id='liveView' className='videoViewFacelandmark'>
                  <div style={{ position: 'relative' }}>
                      <video id='webcam' className='videoInsert' muted autoPlay playsInline ></video>
                      <canvas
                          className='output_canvas'
                          id='output_canvas'
                          style={{ position: 'absolute', left: 0, top: 0 }}
                      />
                  </div>
              </div>
    </React.Fragment>
  )
}

export default FaceLandmark