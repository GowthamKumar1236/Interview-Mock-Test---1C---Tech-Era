import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class CoursesDetailsRoute extends Component {
  state = {coursesDetailsList: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCoursesDetails()
  }

  getCoursesDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const courseDetailsApiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(courseDetailsApiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        coursesDetailsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCoursesDetails = () => {
    const {coursesDetailsList} = this.state
    const {name, imageUrl, description} = coursesDetailsList

    return (
      <div className="courses-details-container">
        <img src={imageUrl} alt={name} className="courses-img" />
        <div className="details-container">
          <h1 className="course-heading">{name}</h1>
          <p className="course-description">{description}</p>
        </div>
      </div>
    )
  }

  renderLoading = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#4656A1" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    this.getCoursesDetails()
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="retry-btn" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderCourseDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCoursesDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="courses-details-bg-container">
          {this.renderCourseDetailsView()}
        </div>
      </>
    )
  }
}

export default CoursesDetailsRoute
