const variants = {
  primary: 'bg-accent text-white hover:bg-blue-600',
  secondary: 'bg-primary text-white hover:bg-gray-800',
  outline: 'bg-white text-primary border border-border hover:border-accent hover:text-accent',
  ghost: 'bg-transparent text-primary hover:text-accent',
  'outline-white': 'bg-transparent text-white border border-white/20 hover:bg-white/10',
  white: 'bg-white text-primary hover:bg-accent hover:text-white',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  href,
  children,
  disabled,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-[0.02em] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed'

  const classes = [base, variants[variant] ?? variants.primary, sizeClasses[size] ?? sizeClasses.md, className]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Tag type={Tag === 'button' ? type : undefined} disabled={disabled} onClick={onClick} className={classes} {...props}>
      {children}
    </Tag>
  )
}
