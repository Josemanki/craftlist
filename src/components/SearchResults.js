import React from 'react'

function SearchResults({ searchResults, setItemList, setSearchQuery, setSearchResults }) {

  const filteredSearchResults = searchResults.filter(item => item.type !== 'Pet' && item.type !== 'Petsmount')

  const handleStateChange = (e) => {
    if (e.target.innerText) {
      const stateItem = searchResults.filter(item => item.name === e.target.innerText)[0]
      setItemList(prevState => [...prevState, stateItem])
      setSearchQuery('')
      setSearchResults([])
    } else if (e.target.parentElement.innerText) {
      const stateItem = searchResults.filter(item => item.name === e.target.parentElement.innerText)[0]
      setItemList(prevState => [...prevState, stateItem])
      setSearchQuery('')
      setSearchResults([])
    }
  }

  const options = filteredSearchResults.map(result => {
    return(
    <li onClick={handleStateChange} key={result.ankama_id}>
      {result.name}
      <img 
        width={50} 
        src={result.image_url_local}
        alt={result.name} 
      />
    </li>
    )
  })

  return (
    <div className="autocom-box">
      <ul>
        {options}
      </ul>
    </div>
  )
}

export default SearchResults
