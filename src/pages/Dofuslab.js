import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function Dofuslab({setItemList}) {
  const [dofusLabError, setDofusLabError] = useState('')
  const [labLink, setLabLink] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  let history = useHistory()

  const getDofuslab = async (link) => {
    setDofusLabError('')
    setIsLoading(true)
    const data = await axios.get(`https://craftlist-api.herokuapp.com/scrape/${link}`)
    const itemItemList = []
    const finalScrapeData = []
    if (!data.data.hasOwnProperty('error')) {
      await Promise.all(data.data.map(async (item, index) => {
        const res = await axios.get(`https://enc.dofusdu.de/dofus/en/equipment?page%5Bnumber%5D=1&page%5Bsize%5D=96&search%5Bname%5D=${item.substring(0, item.length - 1)}`)
        const filteredRes = res.data.items.filter(itemTwo => itemTwo.name.toLowerCase() === item.toLowerCase())
        itemItemList.push(...filteredRes)
      }))
      await Promise.all(itemItemList.map(async (item, index) => {
        const res = await axios.get(item.item_url)
        if (res.data.hasOwnProperty('recipe')) {
          finalScrapeData.push({...res.data, quantity: 1})
        }
      }))
      setItemList(finalScrapeData)
      setIsLoading(false)
      history.push('/equipment')
    } else if (data.data.hasOwnProperty('error')) {
      setDofusLabError(data.data.error)
      setIsLoading(false)
    }
  }
  const handleInput = (e) => {
    setLabLink(e.target.value)
  }
  const handleButton = async (e) => {
    e.preventDefault()
    await getDofuslab(labLink)
  } 
  return (
    <>
      <div className="dofuslab__instructions">
        <span className="bold">So you want to craft a new set?</span> <br />
        <p className="dofuslab__instructions-text">
        We make it easy for you to get the materials from a Dofuslab set! <br /> 
        <span className="bold">In order to use the application you just have to paste
        the Share link from any Dofuslab you want</span>, and the app is gonna give you a crafting list (that you can of course edit 😉) so your process is quicker and easier!</p>
      </div>
      <form className="dofuslab-form" onSubmit={handleButton}>
        {dofusLabError && <div className="dofuslab__error"><span >{dofusLabError}</span></div>}
        <div className="d-flex">
          <input className="dofuslab__input" onChange={handleInput} type="text" />
          <button className="dofuslab__button">Submit!</button>
        </div>
      </form>
      {isLoading && <div className="dofuslab__loading"><span>Loading your items, it'll be just a second!</span></div>}
    </>
  )
}
