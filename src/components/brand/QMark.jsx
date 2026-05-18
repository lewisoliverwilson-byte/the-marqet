export default function QMark({ size = 32, className = '', ariaHidden = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      className={className}
    >
      <path
        d="M27,44 A17,17 0 1,1 39,39 L53,55"
        stroke="#3B82F6"
        strokeWidth="8.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
