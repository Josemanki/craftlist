import React from 'react'
import { Link } from 'react-router-dom'

export default function initialPage() {
  return (
    <div className="homepage">
      <h1 className="homepage__title">What do you want to craft today?</h1>
      <div className="homepage__cards">
        <Link className="link" to="/equipment">
          <div className="homepage__card">
            <img src="./assets/equipment.png" alt="" />
            <span className="homepage__card-title">Equipment</span>
          </div>
        </Link>
        <Link className="link" to="/consumables">
          <div className="homepage__card">
            <img src="./assets/consumables.png" alt="" />
            <span className="homepage__card-title">Consumables</span>
          </div>
        </Link>
        <Link className="link" to="/dofuslab">
          <div className="homepage__card">
            <img src="./assets/dofuslab.svg" width="120" style={{ margin: '30px'}} alt="" />
            <span className="homepage__card-title">Dofuslab Set</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
