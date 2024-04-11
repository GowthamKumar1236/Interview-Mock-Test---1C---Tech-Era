import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {courseItemDetails} = props
  const {id, name, logoUrl} = courseItemDetails

  return (
    <Link to={`courses/${id}`} className="underline">
      <li className="list-items">
        <img src={logoUrl} alt={name} className="logos" />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
