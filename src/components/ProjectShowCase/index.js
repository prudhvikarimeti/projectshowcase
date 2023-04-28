import './index.css'

const ProjectShowCase = props => {
  const {details} = props
  const {name, imageUrl} = details
  return (
    <li className="app-li">
      <img src={imageUrl} alt={name} className="pic" />
      <p className="name">{name}</p>
    </li>
  )
}
export default ProjectShowCase
