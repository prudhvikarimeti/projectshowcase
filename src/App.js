import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProjectShowCase from './components/ProjectShowCase'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
}

class App extends Component {
  state = {sel: 'ALL', data: [], ap: apiStatus.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({ap: apiStatus.loading})
    const {sel} = this.state

    const url = ` https://apis.ccbp.in/ps/projects?category=${sel}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.projects.map(i => ({
        id: i.id,
        imageUrl: i.image_url,
        name: i.name,
      }))
      this.setState({data: updateData, ap: apiStatus.success})
    } else {
      this.setState({ap: apiStatus.fail})
    }
  }

  one = event => {
    this.setState({sel: event.target.value}, this.getData)
  }

  loadingView = () => (
    <div data-testid="loader" className="load">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {data} = this.state
    return (
      <div className="q-con">
        <ul className="app-con">
          {data.map(j => (
            <ProjectShowCase details={j} key={j.id} />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => (
    <div className="fail-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        className="ima"
        alt="failure view"
      />
      <h1 className="header">Oops! Something Went Wrong</h1>
      <p className="para">
        We cannot seem to find the page you are looking for
      </p>
      <button className="but" type="button" onClick={this.getData}>
        Retry
      </button>
    </div>
  )

  finalRender = () => {
    const {ap} = this.state
    switch (ap) {
      case apiStatus.loading:
        return this.loadingView()
      case apiStatus.success:
        return this.successView()
      case apiStatus.fail:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {sel} = this.state
    return (
      <div>
        <nav className="nav-el">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            className="web"
            alt="website logo"
          />
        </nav>
        <div className="main-container">
          <ul className="select-container">
            <select className="sel" value={sel} onChange={this.one}>
              {categoriesList.map(each => (
                <option key={each.id} value={each.id}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </ul>
          {this.finalRender()}
        </div>
      </div>
    )
  }
}

export default App
