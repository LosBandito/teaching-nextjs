type Props = {
  onClick: any
  children: any
  title: string
}

export function MyButton(props: Props) {
  return (
    <button onClick={props.onClick} className="btn btn-outline btn-secondary">
      {props.title}
    </button>
  )
}
