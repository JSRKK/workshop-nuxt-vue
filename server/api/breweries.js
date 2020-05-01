import axios from 'axios'

const api = {}

api.searchBreweries = async function(query) {
  return await axios.get(
    'https://api.openbrewerydb.org/breweries/autocomplete',
    {
      params: {
        query
      }
    }
  )
}

api.fetchBreweries = async function({ page }) {
  return await axios.get('https://api.openbrewerydb.org/breweries', {
    params: { page, per_page: 20 }
  })
}

api.getBreweries = async function(id) {
  return await axios.get(`https://api.openbrewerydb.org/breweries/${id}`)
}

export default api
