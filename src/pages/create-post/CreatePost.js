import React from 'react'
import { defaultImgs } from '../../defaultimgs'
import { TextArea, Icon } from 'web3uikit'
import { useState, useRef } from 'react'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import { Card } from '@material-ui/core'

const CreatePost = () => {
  const { Moralis } = useMoralis()
  const user = Moralis.User.current()
  const contractProcessor = useWeb3ExecuteFunction()
  const inputFile = useRef(null)
  const [selectedFile, setSelectedFile] = useState()
  const [theFile, setTheFile] = useState()
  const [tweet, setTweet] = useState()

  async function maticTweet() {
    if (!tweet) return

    let img
    if (theFile) {
      const data = theFile
      const file = new Moralis.File(data.name, data)
      await file.saveIPFS()
      img = file.ipfs()
    } else {
      img = 'No Img'
    }

    let options = {
      contractAddress: '0x8E452D8573e2B1e8341D3f4aCC07939247cf99c6',
      functionName: 'addTweet',
      abi: [
        {
          inputs: [
            {
              internalType: 'string',
              name: 'tweetTxt',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'tweetImg',
              type: 'string',
            },
          ],
          name: 'addTweet',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
      ],
      params: {
        tweetTxt: tweet,
        tweetImg: img,
      },
      msgValue: Moralis.Units.ETH(1),
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        saveTweet()
      },
      onError: (error) => {
        console.log(error.data.message)
      },
    })
  }

  async function saveTweet() {
    if (!tweet) return
    const Tweets = Moralis.Object.extend('Posts')
    const newTweet = new Tweets()
    newTweet.set('tweetTxt', tweet)
    newTweet.set('tweeterPfp', user.attributes.pfp)
    newTweet.set('tweeterAcc', user.attributes.ethAddress)
    newTweet.set('tweeterUserName', user.attributes.username)

    if (theFile) {
      const data = theFile
      const file = new Moralis.File(data.name, data)
      await file.saveIPFS()
      newTweet.set('tweetImg', file.ipfs())
    }

    await newTweet.save()
    window.location.reload()
  }
  async function saveComment() {
    if (!tweet) return
    const Tweets = Moralis.Object.extend('Tweets')
    const newTweet = new Tweets()
    newTweet.set('tweetTxt', tweet)
    newTweet.set('tweeterPfp', user.attributes.pfp)
    newTweet.set('tweeterAcc', user.attributes.ethAddress)
    newTweet.set('tweeterUserName', user.attributes.username)

    if (theFile) {
      const data = theFile
      const file = new Moralis.File(data.name, data)
      await file.saveIPFS()
      newTweet.set('tweetImg', file.ipfs())
    }

    await newTweet.save()
    window.location.reload()
  }

  const onImageClick = () => {
    inputFile.current.click()
  }

  const changeHandler = (event) => {
    const img = event.target.files[0]
    setTheFile(img)
    setSelectedFile(URL.createObjectURL(img))
  }

  return (
    <>
      <Card sx={{ minWidth: 245 }}>
        <div className="pageIdentify">
          Find your next treasure or share yours with others
        </div>
        <div className="mainContent">
          <div className="profileTweet">
            <img
              src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]}
              className="profilePic"
              alt="img"
            ></img>
            <div className="tweetBox">
              <TextArea
                label=""
                name="tweetTxtArea"
                value="Free computer desk..."
                type="text"
                id="input-tweet"
                onChange={(e) => setTweet(e.target.value)}
                width="95%"
              ></TextArea>
              {selectedFile && (
                <img
                  src={selectedFile}
                  className="tweetImg-comment"
                  alt="img"
                ></img>
              )}
              <div className="imgOrTweet">
                <div className="imgDiv" onClick={onImageClick}>
                  <input
                    type="file"
                    name="file"
                    ref={inputFile}
                    onChange={changeHandler}
                    style={{ display: 'none' }}
                  />
                  <Icon fill="#1DA1F2" size={25} svg="image"></Icon>
                </div>
                <div className="tweetOptions">
                  <div className="tweet" onClick={saveTweet}>
                    Save
                  </div>
                  <div
                    className="tweet"
                    onClick={maticTweet}
                    style={{ backgroundColor: '#8247e5' }}
                  >
                    <Icon fill="#ffffff" size={20} svg="matic" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}

export default CreatePost
